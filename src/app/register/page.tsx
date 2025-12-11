import { AuthForm } from '@/components/auth/auth-form'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Criar Conta - InfinityDigital',
  description: 'Crie sua conta InfinityDigital e comece a explorar',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
            <span className="text-2xl font-bold">InfinityDigital</span>
          </Link>
          <h1 className="text-3xl font-bold mt-6">Criar sua conta</h1>
          <p className="text-muted-foreground mt-2">
            Junte-se a milhares de usuários satisfeitos
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
          <AuthForm mode="register" />
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Já tem uma conta? </span>
            <Link href="/login" className="text-primary hover:underline font-medium">
              Fazer login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
