import { NextResponse } from 'next/server';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { SAMPLE_PRODUCTS } from '@/lib/sample-data';
import { CATEGORIES } from '@/lib/constants';
import { isAdminRequest, unauthorizedResponse } from '@/lib/security/auth-helpers';
import { logUnauthorizedAccess } from '@/lib/security/logger';

/**
 * Database Seeding Endpoint
 * 
 * SECURITY: This endpoint is DISABLED in production and requires admin authentication.
 * Use only for development/testing purposes.
 */
export async function GET(request: Request) {
  // Completely disable in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      {
        success: false,
        error: 'Seed endpoint is disabled in production',
      },
      { status: 403 }
    );
  }

  // Require admin authentication even in development
  if (!isAdminRequest(request)) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    logUnauthorizedAccess(ip, 'GET /api/seed', 'Not an admin');
    return unauthorizedResponse('Admin authentication required to seed database');
  }

  try {
    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json(
        {
          success: false,
          error: 'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable seeding.',
        },
        { status: 503 }
      );
    }

    // Insert categories
    const categoriesData = CATEGORIES.map(cat => ({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      icon: cat.icon,
    }));

    const { error: categoriesError } = await supabase
      .from('categories')
      .upsert(categoriesData, { onConflict: 'slug' });

    if (categoriesError) throw categoriesError;

    // Insert products
    const { error: productsError } = await supabase
      .from('products')
      .upsert(SAMPLE_PRODUCTS, { onConflict: 'slug' });

    if (productsError) throw productsError;

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      products: SAMPLE_PRODUCTS.length,
      categories: CATEGORIES.length,
      warning: 'This endpoint is only available in development mode',
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
