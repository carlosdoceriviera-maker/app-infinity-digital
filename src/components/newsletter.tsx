'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success('Inscrito com sucesso! Verifique seu email.');
    setEmail('');
    setLoading(false);
  };

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Card className="mx-auto max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Fique por Dentro</CardTitle>
            <p className="text-muted-foreground">
              Receba novidades sobre novos produtos e ofertas exclusivas
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  'Inscrevendo...'
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Inscrever
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}