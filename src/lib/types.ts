// Tipos TypeScript para toda a aplicação InfinityDigital

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  is_premium: boolean
  premium_expires_at?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: 'ebook' | 'curso' | 'template' | 'imagem-ia'
  image_url: string
  file_url?: string
  is_premium: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  total: number
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  payment_method: 'stripe' | 'paypal'
  payment_id?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  price: number
  created_at: string
}

export interface Download {
  id: string
  user_id: string
  product_id: string
  order_id: string
  downloaded_at: string
}

export interface Wishlist {
  id: string
  user_id: string
  product_id: string
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan: 'monthly' | 'annual'
  status: 'active' | 'cancelled' | 'expired'
  stripe_subscription_id?: string
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}
