import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShopPage from '../../../app/(shop)/shop/page';
import { SAMPLE_PRODUCTS } from '../../../lib/sample-data';

// Mock useRouter and useSearchParams
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));



describe('Shop Page Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(SAMPLE_PRODUCTS)
      })
    ) as jest.Mock;
  });

  it('renders all products by default', async () => {
    render(<ShopPage />);
    const elements = await screen.findAllByText(SAMPLE_PRODUCTS[0].name);
    expect(elements.length).toBeGreaterThan(0);
  });
});
