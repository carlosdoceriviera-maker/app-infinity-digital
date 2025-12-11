'use client';

import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

// Produtos de exemplo para quando Supabase não estiver configurado
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'E-book: Guia Completo de Marketing Digital',
    description: 'Aprenda as melhores estratégias de marketing digital',
    price: 49.90,
    category: 'E-books',
    images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop']
  },
  {
    id: '2',
    title: 'Curso: Desenvolvimento Web Moderno',
    description: 'Do básico ao avançado em desenvolvimento web',
    price: 199.90,
    category: 'Cursos',
    images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop']
  },
  {
    id: '3',
    title: 'Templates Premium para Landing Pages',
    description: 'Pack com 10 templates profissionais',
    price: 79.90,
    category: 'Templates',
    images: ['https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=400&fit=crop']
  },
  {
    id: '4',
    title: 'Pack de Imagens IA - 500 Assets',
    description: 'Imagens geradas por IA para seus projetos',
    price: 39.90,
    category: 'Imagens IA',
    images: ['https://images.unsplash.com/photo-1547954575-855750c57bd3?w=400&h=400&fit=crop']
  },
  {
    id: '5',
    title: 'E-book: Finanças Pessoais',
    description: 'Organize suas finanças e invista melhor',
    price: 29.90,
    category: 'E-books',
    images: ['https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=400&fit=crop']
  },
  {
    id: '6',
    title: 'Curso: Design Gráfico Profissional',
    description: 'Domine as ferramentas de design',
    price: 149.90,
    category: 'Cursos',
    images: ['https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=400&fit=crop']
  }
];

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      // Se Supabase não estiver configurado, usar produtos mock imediatamente
      if (!isSupabaseConfigured || !supabase) {
        setProducts(mockProducts);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .limit(6);

        if (error) {
          setProducts(mockProducts);
        } else {
          setProducts(data || mockProducts);
        }
      } catch {
        // Em caso de erro de rede, usar produtos mock silenciosamente
        setProducts(mockProducts);
      }
      
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Produtos em Destaque
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Produtos em Destaque
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Descubra nossa seleção premium de produtos digitais
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link href="/products">
              Ver Todos os Produtos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
