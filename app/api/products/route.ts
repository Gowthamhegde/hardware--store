import { NextResponse } from 'next/server';
import { supabase, adminSupabase } from '@/lib/supabase';
import { getMockProducts, addMockProduct } from '@/lib/mock-store';
import { checkRateLimit, RateLimits } from '@/lib/security/rate-limit';
import { getClientIP, isAdminRequest, unauthorizedResponse, rateLimitResponse } from '@/lib/security/auth-helpers';
import { validateQueryParams, validateRequestBody, productSchema, searchQuerySchema } from '@/lib/security/input-validation';
import { logRateLimitExceeded, logUnauthorizedAccess } from '@/lib/security/logger';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ip = getClientIP(request);

  // Rate limiting - 100 req/min for GET
  const rateLimitResult = await checkRateLimit(ip, RateLimits.lenient.limit, RateLimits.lenient.window);
  if (!rateLimitResult.success) {
    logRateLimitExceeded(ip, 'GET /api/products');
    return rateLimitResponse(rateLimitResult.reset);
  }

  // Validate query parameters
  const validation = validateQueryParams(searchParams, searchQuerySchema);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { category, search, minPrice, maxPrice, inStock, limit } = validation.data;

  if (!supabase) {
    let products = getMockProducts();
    if (category) products = products.filter(p => p.category === category);
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p => p.name.toLowerCase().includes(q));
    }
    if (minPrice) products = products.filter(p => p.price >= parseFloat(minPrice));
    if (maxPrice) products = products.filter(p => p.price <= parseFloat(maxPrice));
    if (inStock === 'true') products = products.filter(p => p.stock > 0);
    if (limit) products = products.slice(0, limit);

    return NextResponse.json(products);
  }

  let query = supabase.from('products').select('*');

  if (category) query = query.eq('category', category);
  if (search) query = query.ilike('name', `%${search}%`);
  if (minPrice) query = query.gte('price', parseFloat(minPrice));
  if (maxPrice) query = query.lte('price', parseFloat(maxPrice));
  if (inStock === 'true') query = query.gt('stock', 0);

  let orderedQuery = query.order('created_at', { ascending: false });
  if (limit) orderedQuery = orderedQuery.limit(limit);

  const { data, error } = await orderedQuery;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const databaseProducts = data ?? [];
  const databaseSlugs = new Set(databaseProducts.map((product) => product.slug));
  let fallbackProducts = getMockProducts().filter((product) => !databaseSlugs.has(product.slug));

  if (category) fallbackProducts = fallbackProducts.filter((product) => product.category === category);
  if (search) {
    const q = search.toLowerCase();
    fallbackProducts = fallbackProducts.filter((product) => product.name.toLowerCase().includes(q));
  }
  if (minPrice) fallbackProducts = fallbackProducts.filter((product) => product.price >= parseFloat(minPrice));
  if (maxPrice) fallbackProducts = fallbackProducts.filter((product) => product.price <= parseFloat(maxPrice));
  if (inStock === 'true') fallbackProducts = fallbackProducts.filter((product) => product.stock > 0);

  return NextResponse.json(limit ? [...databaseProducts, ...fallbackProducts].slice(0, limit) : [...databaseProducts, ...fallbackProducts]);
}

export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);

    // Rate limiting - 20 req/min for POST
    const rateLimitResult = await checkRateLimit(ip, RateLimits.moderate.limit, RateLimits.moderate.window);
    if (!rateLimitResult.success) {
      logRateLimitExceeded(ip, 'POST /api/products');
      return rateLimitResponse(rateLimitResult.reset);
    }

    // Admin authentication required
    if (!isAdminRequest(request)) {
      logUnauthorizedAccess(ip, 'POST /api/products', 'Not an admin');
      return unauthorizedResponse('Admin authentication required to create products');
    }

    // Validate request body
    const validation = await validateRequestBody(request, productSchema);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const body = validation.data;
    
    const client = adminSupabase || supabase;
    if (!client) {
      // Use mock store
      const newProduct = {
        ...body,
        id: `mock-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      addMockProduct(newProduct);
      return NextResponse.json(newProduct);
    }

    const { data, error } = await client
      .from('products')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
