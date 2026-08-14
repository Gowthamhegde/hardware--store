import { NextResponse } from 'next/server';
import { supabase, adminSupabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!supabase) {
    return NextResponse.json([]);
  }

  // Admin view or User view
  const client = adminSupabase || supabase;
  let query = client.from('orders').select('*');

  if (userId) {
    query = query.eq('user_id', userId);
  }

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
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }

    const { data, error } = await client
      .from('orders')
      .insert([body])
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
