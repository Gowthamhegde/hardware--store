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
  });

  it('renders all products by default', () => {
    render(<ShopPage />);
    expect(screen.getByText(SAMPLE_PRODUCTS[0].name)).toBeInTheDocument();
  });
});
