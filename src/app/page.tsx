import { Suspense } from 'react';
import { Hero } from '@/components/hero';
import { FeaturedProducts } from '@/components/featured-products';
import { Categories } from '@/components/categories';
import { Newsletter } from '@/components/newsletter';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedProducts />
      </Suspense>
      <Categories />
      <Newsletter />
      <Footer />
    </div>
  );
}