import { checkRateLimit } from '@/lib/security/rate-limit';
import { getClientIP, rateLimitResponse } from '@/lib/security/auth-helpers';
import { logRateLimitExceeded } from '@/lib/security/logger';

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);

    // Rate limiting - 10 payment intents per hour per IP
    const rateLimitResult = await checkRateLimit(ip, 10, 60 * 60 * 1000);
    if (!rateLimitResult.success) {
      logRateLimitExceeded(ip, 'POST /api/create-payment-intent');
      return rateLimitResponse(rateLimitResult.reset);
    }

    const { amount, orderId, customer_email } = await request.json();

    if (!amount || amount <= 0) {
      return jsonResponse({ error: 'Invalid amount' }, 400);
    }

    // Validate amount is reasonable (prevent abuse)
    if (amount > 10000000) { // $100,000 max
      return jsonResponse({ error: 'Amount exceeds maximum allowed' }, 400);
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;
    const isDev = process.env.NODE_ENV !== 'production';

    // In development without a real Stripe key, simulate a successful payment intent
    // so the checkout flow can be tested end-to-end without API credentials.
    if (!secretKey || secretKey.startsWith('sk_test_your')) {
      if (!isDev) {
        return jsonResponse({ error: 'Payment service is not configured' }, 503);
      }

      const simulatedId = `pi_simulated_${Date.now()}`;
      return jsonResponse(
        {
          clientSecret: `${simulatedId}_secret_simulated`,
          paymentIntentId: simulatedId,
          simulated: true,
        },
        200
      );
    }

    // Real Stripe path — only reached when a valid key is present.
    const { createPaymentIntent } = await import('@/lib/stripe');
    const paymentIntent = await createPaymentIntent(amount, {
      orderId: orderId ?? '',
      customer_email: customer_email ?? '',
    });

    return jsonResponse(
      {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
      200
    );
  } catch (error) {
    console.error('Payment intent error:', error);
    return jsonResponse({ error: 'Failed to create payment intent' }, 500);
  }
}
