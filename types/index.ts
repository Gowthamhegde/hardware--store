export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  long_description?: string;
  price: number;
  category: string;
  subcategory?: string;
  brand?: string;
  image_url: string;
  images?: string[];
  stock: number;
  specifications?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image_url?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: Address;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed';
  stripe_payment_intent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  role: 'customer' | 'admin';
  created_at: string;
}

export interface BentoTile {
  category: {
    name: string;
    slug: string;
    icon: string;
    description: string;
    specs: string;
  };
  gridSize: 'large' | 'medium' | 'small';
  subcategories?: string[];
}
