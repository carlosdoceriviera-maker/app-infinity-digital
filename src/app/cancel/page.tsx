'use client';

import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, ArrowLeft, ShoppingCart } from 'lucide-react';

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-orange-200 dark:border-orange-800">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-full">
                  <XCircle className="h-16 w-16 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                Pagamento Cancelado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-lg text-muted-foreground">
                  O seu pagamento foi cancelado. Nenhuma cobrança foi efetuada.
                </p>
                <p className="text-sm text-muted-foreground">
                  Os produtos no seu carrinho foram mantidos caso queira tentar novamente.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Precisa de ajuda?
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                  Se encontrou algum problema durante o processo de pagamento, estamos aqui para ajudar.
                </p>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Verifique se os dados do cartão estão corretos</li>
                  <li>• Certifique-se de que tem saldo suficiente</li>
                  <li>• Tente um método de pagamento diferente</li>
                </ul>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  onClick={() => router.push('/cart')}
                  className="w-full"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Voltar ao Carrinho
                </Button>
                <Button
                  onClick={() => router.push('/products')}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continuar a Comprar
                </Button>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Precisa de ajuda? Entre em contacto connosco através do email{' '}
                  <a href="mailto:suporte@infinitydigital.com" className="text-primary hover:underline">
                    suporte@infinitydigital.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
