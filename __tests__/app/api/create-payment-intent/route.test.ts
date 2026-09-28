import { POST } from '@/app/api/create-payment-intent/route';

// Set a fake but real-looking Stripe key so the route skips simulated mode
process.env.STRIPE_SECRET_KEY = 'sk_test_fakekeyfortesting123456789012345678';

// Mock stripe
jest.mock('@/lib/stripe', () => ({
  createPaymentIntent: jest.fn().mockImplementation((amount) => {
    if (amount === 99999) {
      throw new Error('Stripe API error');
    }
    return { client_secret: 'pi_test_secret_123' };
  }),
}));

/** Minimal Request mock that satisfies getClientIP and rate limiter */
function makeReq(body: object): Request {
  return {
    json: async () => body,
    headers: {
      get: (key: string) => {
        if (key === 'x-forwarded-for') return '127.0.0.1';
        return null;
      },
    },
  } as any;
}

describe('create-payment-intent API Route', () => {
  it('returns a clientSecret for valid request', async () => {
    const res = await POST(makeReq({ amount: 1000, orderId: 'ord_123' }));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.clientSecret).toBe('pi_test_secret_123');
  });

  it('returns 400 error when amount is missing or invalid', async () => {
    const res = await POST(makeReq({ orderId: 'ord_123' }));
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data.error).toBe('Invalid amount');
  });

  it('returns 500 error when Stripe API fails', async () => {
    const res = await POST(makeReq({ amount: 99999, orderId: 'ord_123' }));
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data.error).toBe('Failed to create payment intent');
  });
});
