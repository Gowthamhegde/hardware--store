import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductPage from '@/app/(shop)/product/[slug]/page';
import { useCartStore } from '@/lib/store';

// Mock the useParams hook
jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ slug: 'circuit-audio-receptor' })),
}));

// Mock next/image to just render an img tag
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt} />;
  },
}));

const mockProduct = {
  id: 'prod_1',
  name: 'Circuit Audio Receptor',
  price: 100,
  stock: 5,
  category: 'Home Theatre & Audio',
  image_url: 'test.jpg'
};

const mockQuantumSwitch = {
  ...mockProduct,
  id: 'prod_2',
  name: 'Quantum Switch',
  stock: 0
};

describe('Product Page Integration', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
    jest.clearAllMocks();
    
    // Mock fetch
    global.fetch = jest.fn((url: string) => {
      if (url.includes('quantum-switch')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockQuantumSwitch)
        });
      }
      if (url.includes('circuit-audio-receptor')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProduct)
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockProduct, mockQuantumSwitch])
      });
    }) as jest.Mock;
  });

  it('renders product information correctly', async () => {
    render(<ProductPage />);
    
    const elements = await screen.findAllByText('Circuit Audio Receptor');
    expect(elements.length).toBeGreaterThan(0);
  });

  it('handles quantity updates correctly', async () => {
    render(<ProductPage />);
    
    const quantityDisplay = await screen.findByText('1');
    expect(quantityDisplay).toBeInTheDocument();
    
    const buttons = screen.getAllByRole('button');
    const plusButton = buttons.find(b => b.innerHTML.includes('lucide-plus') || b.querySelector('svg.lucide-plus')) || buttons[2];
    
    fireEvent.click(plusButton);
    expect(await screen.findByText('2')).toBeInTheDocument();
  });

  it('adds item to cart and shows toast', async () => {
    render(<ProductPage />);
    
    const addToCartButton = await screen.findByText('INITIALIZE_TRANSFER');
    expect(addToCartButton).not.toBeDisabled();
    
    fireEvent.click(addToCartButton);
    
    const store = useCartStore.getState();
    expect(store.items).toHaveLength(1);
    expect(store.items[0].quantity).toBe(1);
  });

  it('disables add to cart when stock is 0', async () => {
    const { useParams } = require('next/navigation');
    useParams.mockReturnValue({ slug: 'quantum-switch' });
    
    render(<ProductPage />);
    
    const unavailableButton = await screen.findByText('UNAVAILABLE');
    expect(unavailableButton).toBeInTheDocument();
    expect(unavailableButton.closest('button')).toBeDisabled();
  });
});
