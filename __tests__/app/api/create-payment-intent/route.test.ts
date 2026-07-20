// Removed NextRequest import to avoid Request is not defined error
import { POST } from '@/app/api/create-payment-intent/route';

// Mock stripe
jest.mock('@/lib/stripe', () => ({
  createPaymentIntent: jest.fn().mockImplementation((amount) => {
    if (amount === 99999) {
      throw new Error('Stripe API error');
    }
    return { client_secret: 'pi_test_secret_123' };
  }),
}));

describe('create-payment-intent API Route', () => {
  it('returns a clientSecret for valid request', async () => {
    const req = {
      json: async () => ({ amount: 1000, orderId: 'ord_123' }),
    } as any;

    const res = await POST(req);
    const data = await res.json();
    
    expect(res.status).toBe(200);
    expect(data.clientSecret).toBe('pi_test_secret_123');
  });

  it('returns 400 error when amount is missing or invalid', async () => {
    const req = {
      json: async () => ({ orderId: 'ord_123' }), // Missing amount
    } as any;

    const res = await POST(req);
    const data = await res.json();
    
    expect(res.status).toBe(400);
    expect(data.error).toBe('Invalid amount');
  });

  it('returns 500 error when Stripe API fails', async () => {
    // 99999 is mocked to throw an error
    const req = {
      json: async () => ({ amount: 99999, orderId: 'ord_123' }),
    } as any;

    const res = await POST(req);
    const data = await res.json();
    
    expect(res.status).toBe(500);
    expect(data.error).toBe('Failed to create payment intent');
  });
});
