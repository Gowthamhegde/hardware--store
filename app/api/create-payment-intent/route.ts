import { createPaymentIntent } from '@/lib/stripe';

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: Request) {
  try {
    const { amount, orderId, customer_email } = await request.json();

    if (!amount || amount <= 0) {
      return jsonResponse({ error: 'Invalid amount' }, 400);
    }

    const paymentIntent = await createPaymentIntent(amount, {
      orderId,
      customer_email,
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
