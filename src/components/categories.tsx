import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Video, Palette, Code, FileText, Zap } from 'lucide-react';

const categories = [
  {
    name: 'Ebooks',
    description: 'Guias e livros digitais completos',
    icon: BookOpen,
    href: '/categories/ebooks',
    count: '50+ produtos'
  },
  {
    name: 'Cursos',
    description: 'Cursos online e tutoriais',
    icon: Video,
    href: '/categories/cursos',
    count: '30+ produtos'
  },
  {
    name: 'Templates',
    description: 'Templates para design e desenvolvimento',
    icon: Palette,
    href: '/categories/templates',
    count: '100+ produtos'
  },
  {
    name: 'Imagens IA',
    description: 'Imagens geradas por inteligência artificial',
    icon: FileText,
    href: '/categories/imagens-ia',
    count: '200+ produtos'
  },
  {
    name: 'Ferramentas',
    description: 'Scripts e ferramentas digitais',
    icon: Code,
    href: '/categories/ferramentas',
    count: '25+ produtos'
  },
  {
    name: 'Premium',
    description: 'Conteúdo exclusivo para membros',
    icon: Zap,
    href: '/premium',
    count: 'Acesso VIP'
  }
];

export function Categories() {
  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Categorias
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Explore nossa ampla gama de produtos digitais
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.name} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Link href={category.href} className="block">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <category.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {category.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {category.count}
                      </p>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}