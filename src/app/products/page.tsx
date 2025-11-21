'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product, Category } from '@/lib/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Produtos mock para quando Supabase não estiver configurado
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'E-book: Guia Completo de Marketing Digital',
    description: 'Aprenda as melhores estratégias de marketing digital para impulsionar seu negócio',
    price: 49.90,
    category: 'E-books',
    images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop']
  },
  {
    id: '2',
    title: 'Curso: Desenvolvimento Web Moderno',
    description: 'Do básico ao avançado em desenvolvimento web com React, Next.js e TypeScript',
    price: 199.90,
    category: 'Cursos',
    images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop']
  },
  {
    id: '3',
    title: 'Templates Premium para Landing Pages',
    description: 'Pack com 10 templates profissionais prontos para usar',
    price: 79.90,
    category: 'Templates',
    images: ['https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=400&fit=crop']
  },
  {
    id: '4',
    title: 'Pack de Imagens IA - 500 Assets',
    description: 'Imagens geradas por IA de alta qualidade para seus projetos',
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
    description: 'Domine as ferramentas de design mais usadas no mercado',
    price: 149.90,
    category: 'Cursos',
    images: ['https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=400&fit=crop']
  },
  {
    id: '7',
    title: 'Templates de Email Marketing',
    description: 'Pack com 20 templates responsivos para campanhas',
    price: 59.90,
    category: 'Templates',
    images: ['https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=400&h=400&fit=crop']
  },
  {
    id: '8',
    title: 'Pack Premium de Imagens IA - 1000 Assets',
    description: 'Coleção completa de imagens geradas por IA',
    price: 69.90,
    category: 'Imagens IA',
    images: ['https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop']
  },
];

const categories: Category[] = ['E-books', 'Cursos', 'Templates', 'Imagens IA'];

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    async function fetchProducts() {
      if (!isSupabaseConfigured || !supabase) {
        setProducts(mockProducts);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true);

        if (error) {
          console.error('Error fetching products:', error);
          setProducts(mockProducts);
        } else {
          setProducts(data || mockProducts);
        }
      } catch (err) {
        console.error('Error:', err);
        setProducts(mockProducts);
      }

      setLoading(false);
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filtrar por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filtrar por busca
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Ordenar
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // newest - manter ordem original
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
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
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Todos os Produtos</h1>

          {/* Filtros e Busca */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mais Recentes</SelectItem>
                  <SelectItem value="price-asc">Menor Preço</SelectItem>
                  <SelectItem value="price-desc">Maior Preço</SelectItem>
                  <SelectItem value="name">Nome A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Resultados */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                Nenhum produto encontrado
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}>
                Limpar Filtros
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
