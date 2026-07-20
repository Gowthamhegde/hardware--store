import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TechnicalProductCard from '../../components/TechnicalProductCard';
import { Product } from '../../types';

// Mock Zustand store and lucide-react
jest.mock('../../lib/store', () => ({
  useCartStore: () => ({ addItem: jest.fn() }),
  useCompareStore: () => ({ toggleCompare: jest.fn(), compareItems: [] }),
}));

jest.mock('lucide-react', () => ({
  ShoppingCart: () => <div data-testid="shopping-cart-icon" />,
  Scale: () => <div data-testid="scale-icon" />,
}));



const mockProduct = (stock: number): Product => ({
  id: 'test-1',
  name: 'Test Audio Unit',
  slug: 'test-audio-unit',
  description: 'Test description',
  price: 500,
  category: 'Home Theatre & Audio',
  image_url: '/test.jpg',
  stock,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
});

describe('TechnicalProductCard Stock LED Logic', () => {
  it('displays OUT label and correct color when stock is 0', () => {
    render(<TechnicalProductCard product={mockProduct(0)} />);
    
    // Check label
    expect(screen.getByText('OUT')).toBeInTheDocument();
    
    // Check color classes (aluminum for out of stock)
    const ledSpan = screen.getByText('OUT').previousSibling as HTMLElement;
    expect(ledSpan).toHaveClass('bg-aluminum/20');
  });

  it('displays LOW label and correct color when stock is 5 (< 10)', () => {
    render(<TechnicalProductCard product={mockProduct(5)} />);
    
    // Check label
    expect(screen.getByText('LOW')).toBeInTheDocument();
    
    // Check color classes (live-red for low stock)
    const ledSpan = screen.getByText('LOW').previousSibling as HTMLElement;
    expect(ledSpan).toHaveClass('bg-live-red');
    expect(ledSpan).toHaveClass('shadow-magenta');
  });

  it('displays STOCKED label and correct color when stock is 50 (>= 10)', () => {
    render(<TechnicalProductCard product={mockProduct(50)} />);
    
    // Check label
    expect(screen.getByText('STOCKED')).toBeInTheDocument();
    
    // Check color classes (signal for stocked)
    const ledSpan = screen.getByText('STOCKED').previousSibling as HTMLElement;
    expect(ledSpan).toHaveClass('bg-signal');
    expect(ledSpan).toHaveClass('shadow-signal');
  });
});
