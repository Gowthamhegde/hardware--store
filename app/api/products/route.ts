import { NextResponse } from 'next/server';
import { supabase, adminSupabase } from '@/lib/supabase';
import { getMockProducts, addMockProduct } from '@/lib/mock-store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const inStock = searchParams.get('inStock');

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
    
    return NextResponse.json(products);
  }

  let query = supabase.from('products').select('*');

  if (category) query = query.eq('category', category);
  if (search) query = query.ilike('name', `%${search}%`);
  if (minPrice) query = query.gte('price', parseFloat(minPrice));
  if (maxPrice) query = query.lte('price', parseFloat(maxPrice));
  if (inStock === 'true') query = query.gt('stock', 0);

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // We use adminSupabase to bypass RLS since we have no auth implemented.
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
