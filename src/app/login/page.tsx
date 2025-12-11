import { AuthForm } from '@/components/auth/auth-form'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - InfinityDigital',
  description: 'Faça login na sua conta InfinityDigital',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
            <span className="text-2xl font-bold">InfinityDigital</span>
          </Link>
          <h1 className="text-3xl font-bold mt-6">Bem-vindo de volta</h1>
          <p className="text-muted-foreground mt-2">
            Entre na sua conta para continuar
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
          <AuthForm mode="login" />
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Não tem uma conta? </span>
            <Link href="/register" className="text-primary hover:underline font-medium">
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
