'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/wishlist-context';
import { useCart } from '@/contexts/cart-context';
import { Heart, ShoppingCart } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import Link from 'next/link';

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    items.forEach((product) => {
      addToCart(product);
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold mb-4">Sua lista de favoritos está vazia</h1>
            <p className="text-muted-foreground mb-8">
              Adicione produtos aos favoritos para salvá-los para mais tarde
            </p>
            <Button asChild size="lg">
              <Link href="/products">
                Explorar Produtos
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Meus Favoritos</h1>
              <p className="text-muted-foreground mt-2">
                {items.length} {items.length === 1 ? 'produto' : 'produtos'} salvos
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddAllToCart}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Adicionar Todos ao Carrinho
              </Button>
              <Button variant="outline" onClick={clearWishlist}>
                Limpar Lista
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
