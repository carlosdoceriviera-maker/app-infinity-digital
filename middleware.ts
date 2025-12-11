import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Rotas protegidas que requerem autenticação
  const protectedRoutes = ['/perfil', '/carrinho', '/checkout', '/favoritos', '/admin']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  // Verificar se tem token de autenticação (Supabase usa cookies)
  const supabaseAuth = request.cookies.get('sb-access-token')

  if (isProtectedRoute && !supabaseAuth) {
    // Redirecionar para login se tentar acessar rota protegida sem autenticação
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
