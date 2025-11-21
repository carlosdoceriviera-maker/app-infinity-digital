// Types e interfaces centralizadas da aplicação

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  is_active?: boolean;
  is_premium?: boolean;
  file_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  is_premium?: boolean;
  subscription_status?: 'active' | 'cancelled' | 'expired' | null;
  subscription_plan?: 'monthly' | 'annual' | null;
  subscription_end_date?: string;
  created_at?: string;
}

export interface Order {
  id: string;
  user_id: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  payment_method: string;
  created_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product: Product;
  price: number;
  quantity: number;
}

export interface Download {
  id: string;
  user_id: string;
  product_id: string;
  product: Product;
  downloaded_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'monthly' | 'annual';
  status: 'active' | 'cancelled' | 'expired';
  start_date: string;
  end_date: string;
  auto_renew: boolean;
  stripe_subscription_id?: string;
}

export type Category = 'E-books' | 'Cursos' | 'Templates' | 'Imagens IA';
