'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Card className="group overflow-hidden">
      <div className="aspect-square overflow-hidden relative">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.title}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </Link>
        {product.is_premium && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            PREMIUM
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {product.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <span className="text-2xl font-bold">
            €{product.price.toFixed(2)}
          </span>
          <div className="flex gap-2">
            <Button
              variant={inWishlist ? "default" : "outline"}
              size="sm"
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
            </Button>
            <Button size="sm" onClick={() => addToCart(product)}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
