import { NextResponse } from 'next/server';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { SAMPLE_PRODUCTS } from '@/lib/sample-data';
import { CATEGORIES } from '@/lib/constants';

export async function GET() {
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
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
