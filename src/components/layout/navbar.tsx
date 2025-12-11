'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/auth'
import type { User as UserType } from '@/lib/types'

export function Navbar() {
  const pathname = usePathname()
  const [user, setUser] = useState<UserType | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/produtos', label: 'Produtos' },
    { href: '/premium', label: 'Premium' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contacto', label: 'Contacto' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600" />
            <span className="text-xl font-bold">InfinityDigital</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/pesquisa">
                <Search className="h-5 w-5" />
              </Link>
            </Button>

            {user ? (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/favoritos">
                    <Heart className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/carrinho">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/perfil">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="hidden md:inline-flex">
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button asChild className="hidden md:inline-flex">
                  <Link href="/register">Criar Conta</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button asChild variant="ghost">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    Entrar
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    Criar Conta
                  </Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
