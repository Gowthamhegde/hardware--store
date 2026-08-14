import { NextResponse } from 'next/server';
import { supabase, adminSupabase } from '@/lib/supabase';
import { getMockProducts, updateMockProduct, deleteMockProduct } from '@/lib/mock-store';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!supabase) {
    const products = getMockProducts();
    const product = products.find((p) => p.slug === slug);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const body = await request.json();
    
    const client = adminSupabase || supabase;
    if (!client) {
      const updated = updateMockProduct(slug, body);
      if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(updated);
    }

    const { data, error } = await client
      .from('products')
      .update(body)
      .eq('slug', slug)
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    
    const client = adminSupabase || supabase;
    if (!client) {
      const deleted = deleteMockProduct(slug);
      if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json({ success: true });
    }

    const { error } = await client
      .from('products')
      .delete()
      .eq('slug', slug);

    if (error) throw error;
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
