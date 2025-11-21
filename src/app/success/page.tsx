'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Download, Mail, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('session_id');
    if (id) {
      setSessionId(id);
      // Limpar carrinho após compra bem-sucedida
      clearCart();
    }
  }, [searchParams, clearCart]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full">
                  <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-green-600 dark:text-green-400">
                Pagamento Confirmado!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-lg text-muted-foreground">
                  Obrigado pela sua compra! O seu pagamento foi processado com sucesso.
                </p>
                {sessionId && (
                  <p className="text-sm text-muted-foreground">
                    ID da Sessão: <span className="font-mono">{sessionId}</span>
                  </p>
                )}
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Verifique o seu email
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Enviámos um email de confirmação com o recibo e os links de download dos seus produtos digitais.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Download className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Acesso imediato
                    </h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Pode fazer o download dos seus produtos imediatamente através dos links no email.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  onClick={() => router.push('/products')}
                  className="w-full"
                  size="lg"
                >
                  Continuar a Comprar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => router.push('/')}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Voltar à Página Inicial
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
