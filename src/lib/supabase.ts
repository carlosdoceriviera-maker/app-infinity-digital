import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validar se as variáveis existem e são URLs válidas
const isValidUrl = (url: string): boolean => {
  if (!url || url.trim() === '') return false
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

const isValidKey = (key: string): boolean => {
  return Boolean(key && key.trim() !== '' && key.length > 10)
}

// Verificar se está configurado
export const isSupabaseConfigured = isValidUrl(supabaseUrl) && isValidKey(supabaseAnonKey)

// Criar cliente apenas se as variáveis estiverem configuradas corretamente
// NUNCA chamar createClient com valores inválidos
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
