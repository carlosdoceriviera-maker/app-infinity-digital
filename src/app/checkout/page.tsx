'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/cart-context';
import { CreditCard, Lock, ShoppingBag, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    paymentMethod: 'stripe',
  });

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.name) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);

    try {
      // Redirecionar diretamente para o Stripe Payment Link
      const stripePaymentLink = 'https://buy.stripe.com/fZu14g14S8u73852Fc9bO00';
      
      // Adicionar email como parâmetro (se o Stripe suportar)
      const paymentUrl = `${stripePaymentLink}?prefilled_email=${encodeURIComponent(formData.email)}`;
      
      toast.success('Redirecionando para pagamento seguro...');
      
      // Salvar informações localmente antes de redirecionar
      localStorage.setItem('checkout_email', formData.email);
      localStorage.setItem('checkout_name', formData.name);
      localStorage.setItem('checkout_items', JSON.stringify(items));
      
      // Redirecionar para Stripe
      window.location.href = paymentUrl;
    } catch (error) {
      console.error('Erro no checkout:', error);
      toast.error('Erro ao processar pagamento. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulário de Checkout */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informações do Cliente */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informações de Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Enviaremos o recibo e os links de download para este email
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Método de Pagamento */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Método de Pagamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                          <CreditCard className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2">
                            Pagamento via Stripe
                          </h3>
                          <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                            Aceita todos os métodos de pagamento:
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-medium border">
                              💳 Cartão de Crédito
                            </span>
                            <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-medium border">
                              💳 Cartão de Débito
                            </span>
                            <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-medium border">
                              🏦 Multibanco
                            </span>
                            <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-medium border">
                              📱 MB WAY
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                            <Lock className="h-3 w-3" />
                            <span>Pagamento 100% seguro e criptografado</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-start gap-2">
                        <Lock className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-green-900 dark:text-green-100">
                            Proteção Total
                          </p>
                          <p className="text-green-700 dark:text-green-300 mt-1">
                            Seus dados são protegidos com criptografia SSL de nível bancário. 
                            Processamento 100% seguro via Stripe.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    'Redirecionando...'
                  ) : (
                    <>
                      Pagar €{total.toFixed(2)} com Stripe
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Ao clicar em "Pagar", você será redirecionado para a página segura do Stripe
                </p>
              </form>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Lista de Produtos */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.product.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qtd: {item.quantity}
                          </p>
                          <p className="text-sm font-bold">
                            €{(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">€{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taxas</span>
                      <span className="font-medium">€0.00</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between">
                        <span className="font-bold">Total</span>
                        <span className="font-bold text-xl">€{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                    <p className="text-xs text-green-800 dark:text-green-200">
                      <ShoppingBag className="h-4 w-4 inline mr-1" />
                      Entrega digital imediata após pagamento
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
