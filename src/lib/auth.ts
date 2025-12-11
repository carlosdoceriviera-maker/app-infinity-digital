import { supabase } from './supabase'
import type { User } from './types'

export async function signUp(email: string, password: string, fullName: string) {
  if (!supabase) {
    throw new Error('Supabase não está configurado')
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  if (!supabase) {
    throw new Error('Supabase não está configurado')
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  if (!supabase) {
    throw new Error('Supabase não está configurado')
  }

  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser(): Promise<User | null> {
  if (!supabase) return null

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  // Buscar dados adicionais do usuário na tabela users
  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!userData) return null

  return userData as User
}

export async function resetPassword(email: string) {
  if (!supabase) {
    throw new Error('Supabase não está configurado')
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) throw error
}

export async function updatePassword(newPassword: string) {
  if (!supabase) {
    throw new Error('Supabase não está configurado')
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) throw error
}
