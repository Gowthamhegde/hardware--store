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

  // Pulse: stock=0 uses fixed dim opacity (no pulse class); stock>0 uses signal/live-red (pulse active).
  // framer-motion is mocked so we verify color correctness as the pulse proxy — gray = no pulse, colored = pulse.
  it('LED has no-pulse color (aluminum) for stock 0 and pulse color for stock > 0', () => {
    const { rerender } = render(<TechnicalProductCard product={mockProduct(0)} />);
    const noStock = screen.getByText('OUT').previousSibling as HTMLElement;
    expect(noStock).toHaveClass('bg-aluminum/20'); // dim = no pulse

    rerender(<TechnicalProductCard product={mockProduct(5)} />);
    const lowStock = screen.getByText('LOW').previousSibling as HTMLElement;
    expect(lowStock).not.toHaveClass('bg-aluminum/20'); // colored = pulse active
  });

  // Req 14.9: accessible text alternative — label text is the non-color indicator
  it('provides accessible text label as stock status (not color only)', () => {
    const { rerender } = render(<TechnicalProductCard product={mockProduct(0)} />);
    expect(screen.getByText('OUT')).toBeInTheDocument();

    rerender(<TechnicalProductCard product={mockProduct(5)} />);
    expect(screen.getByText('LOW')).toBeInTheDocument();

    rerender(<TechnicalProductCard product={mockProduct(50)} />);
    expect(screen.getByText('STOCKED')).toBeInTheDocument();
  });
});
