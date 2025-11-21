'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingCart, CreditCard, ExternalLink, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
}

interface CheckoutProps {
  product: Product;
}

export function Checkout({ product }: CheckoutProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Por favor, insira seu email.');
      return;
    }

    setIsLoading(true);

    try {
      // Link direto do Stripe Payment Link
      const stripePaymentLink = 'https://buy.stripe.com/fZu14g14S8u73852Fc9bO00';
      
      // Adicionar email como parâmetro
      const paymentUrl = `${stripePaymentLink}?prefilled_email=${encodeURIComponent(email)}`;
      
      // Salvar informações localmente
      localStorage.setItem('checkout_email', email);
      localStorage.setItem('checkout_product', JSON.stringify(product));
      
      toast.success('Redirecionando para pagamento seguro...');
      
      // Redirecionar para Stripe
      setTimeout(() => {
        window.location.href = paymentUrl;
      }, 500);
    } catch (error) {
      console.error('Erro no checkout:', error);
      toast.error('Erro ao processar o pagamento. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Comprar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Finalizar Compra</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleCheckout} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Receberá o recibo e link de download neste email
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-blue-900 dark:text-blue-100 mb-1">
                  Pagamento via Stripe
                </h3>
                <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
                  Aceita todos os métodos:
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  <span className="bg-white dark:bg-gray-800 px-2 py-0.5 rounded-full text-[10px] font-medium border">
                    💳 Cartão
                  </span>
                  <span className="bg-white dark:bg-gray-800 px-2 py-0.5 rounded-full text-[10px] font-medium border">
                    🏦 Multibanco
                  </span>
                  <span className="bg-white dark:bg-gray-800 px-2 py-0.5 rounded-full text-[10px] font-medium border">
                    📱 MB WAY
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400">
                  <Lock className="h-3 w-3" />
                  <span>100% seguro</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-2xl font-bold">€{product.price.toFixed(2)}</span>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                'Redirecionando...'
              ) : (
                <>
                  Pagar com Stripe
                  <ExternalLink className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Será redirecionado para página segura do Stripe
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
