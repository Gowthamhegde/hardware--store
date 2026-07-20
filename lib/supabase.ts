import { createClient } from '@supabase/supabase-js';
import { SAMPLE_PRODUCTS } from '@/lib/sample-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Helper functions
export async function getProducts(filters?: {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}) {
  if (!supabase) {
    let products = [...SAMPLE_PRODUCTS];

    if (filters?.category) {
      products = products.filter((product) => product.category === filters.category);
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      products = products.filter((product) => product.name.toLowerCase().includes(search));
    }
    if (filters?.minPrice !== undefined) {
      const minPrice = filters.minPrice;
      products = products.filter((product) => product.price >= minPrice);
    }
    if (filters?.maxPrice !== undefined) {
      const maxPrice = filters.maxPrice;
      products = products.filter((product) => product.price <= maxPrice);
    }
    if (filters?.inStock) {
      products = products.filter((product) => product.stock > 0);
    }

    return products.sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  let query = supabase.from('products').select('*');

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }
  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }
  if (filters?.inStock) {
    query = query.gt('stock', 0);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getProductBySlug(slug: string) {
  if (!supabase) {
    const product = SAMPLE_PRODUCTS.find((item) => item.slug === slug);
    if (!product) throw new Error(`Product not found: ${slug}`);
    return product;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createOrder(orderData: any) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable order creation.');
  }

  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getOrders(userId?: string) {
  if (!supabase) {
    return [];
  }

  let query = supabase.from('orders').select('*');
  
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function insertProduct(productData: any) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable product creation.');
  }

  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (error) throw error;
  return data;
}
