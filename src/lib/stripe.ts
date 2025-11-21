import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with publishable key
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('Stripe publishable key not found. Payment features will not work.');
}

export const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

// For server-side operations
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20',
}) : null;