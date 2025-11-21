import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 500 }
    );
  }

  try {
    const { items, customerEmail, paymentMethod } = await request.json();

    // Configure payment method types based on selection
    let paymentMethodTypes: string[] = ['card'];

    if (paymentMethod === 'multibanco') {
      paymentMethodTypes = ['ideal'];
    } else if (paymentMethod === 'mbway') {
      // MB WAY is supported via card payments in Portugal
      paymentMethodTypes = ['card'];
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethodTypes,
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            description: item.description,
            images: item.images,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'}/cancel`,
      customer_email: customerEmail,
      ...(paymentMethod === 'multibanco' && {
        payment_method_options: {
          ideal: {
            bank: 'multibanco',
          },
        },
      }),
      metadata: {
        order_id: `order_${Date.now()}`,
        payment_method: paymentMethod,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}