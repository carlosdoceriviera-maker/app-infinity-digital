'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/types';
import { toast } from 'sonner';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  // Carregar wishlist do localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    }
  }, []);

  // Salvar wishlist no localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addToWishlist = (product: Product) => {
    setItems((currentItems) => {
      const exists = currentItems.find((item) => item.id === product.id);
      
      if (exists) {
        toast.info('Produto já está nos favoritos');
        return currentItems;
      }

      toast.success('Produto adicionado aos favoritos');
      return [...currentItems, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems((currentItems) => {
      const newItems = currentItems.filter((item) => item.id !== productId);
      toast.success('Produto removido dos favoritos');
      return newItems;
    });
  };

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    toast.success('Favoritos limpos');
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
