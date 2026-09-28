import { NextResponse } from 'next/server';
import { supabase, adminSupabase } from '@/lib/supabase';
import { checkRateLimit, RateLimits } from '@/lib/security/rate-limit';
import { getClientIP, isAdminRequest, isAuthenticatedRequest, unauthorizedResponse, rateLimitResponse } from '@/lib/security/auth-helpers';
import { validateRequestBody, orderSchema } from '@/lib/security/input-validation';
import { logRateLimitExceeded, logUnauthorizedAccess } from '@/lib/security/logger';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const ip = getClientIP(request);

  // Rate limiting
  const rateLimitResult = await checkRateLimit(ip, RateLimits.moderate.limit, RateLimits.moderate.window);
  if (!rateLimitResult.success) {
    logRateLimitExceeded(ip, 'GET /api/orders');
    return rateLimitResponse(rateLimitResult.reset);
  }

  // Authentication required to view orders
  const isAdmin = isAdminRequest(request);
  const isAuth = isAuthenticatedRequest(request);

  if (!isAdmin && !isAuth) {
    logUnauthorizedAccess(ip, 'GET /api/orders', 'Not authenticated');
    return unauthorizedResponse('Authentication required to view orders');
  }

  if (!supabase) {
    return NextResponse.json([]);
  }

  // Non-admin users can only see their own orders
  // For now, since we don't have full JWT auth, admins can see all
  const client = isAdmin ? (adminSupabase || supabase) : supabase;
  let query = client.from('orders').select('*');

  if (userId && !isAdmin) {
    // Non-admin users must provide userId and it should match their token
    // TODO: Validate userId matches JWT token when auth is implemented
    query = query.eq('user_id', userId);
  } else if (userId && isAdmin) {
    // Admin can filter by userId
    query = query.eq('user_id', userId);
  } else if (!isAdmin) {
    // Non-admin without userId - deny access
    return unauthorizedResponse('User ID required');
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);

    // Rate limiting - stricter for order creation
    const rateLimitResult = await checkRateLimit(ip, 10, 60 * 1000); // 10 orders per minute
    if (!rateLimitResult.success) {
      logRateLimitExceeded(ip, 'POST /api/orders');
      return rateLimitResponse(rateLimitResult.reset);
    }

    // Validate request body
    const validation = await validateRequestBody(request, orderSchema);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const body = validation.data;
    
    const client = adminSupabase || supabase;
    if (!client) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    // Add server-side fields
    const orderData = {
      ...body,
      status: 'pending',
      payment_status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await client
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
