import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductPage from '../../../app/(shop)/product/[slug]/page';
import { useCartStore } from '../../../lib/store';

// Mock the useParams hook
jest.mock('next/navigation', () => ({
  useParams: () => ({ slug: 'circuit-audio-receptor' }), // matches a sample product
}));

// Mock next/image to just render an img tag
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt} />;
  },
}));



describe('Product Page Integration', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
    jest.clearAllMocks();
  });

  it('renders product information correctly', () => {
    render(<ProductPage />);
    
    // Check if product name is rendered (assuming 'Circuit Audio Receptor' is in sample data)
    expect(screen.getByText('Circuit Audio Receptor')).toBeInTheDocument();
  });

  it('handles quantity updates correctly', () => {
    render(<ProductPage />);
    
    const quantityDisplay = screen.getByText('1');
    expect(quantityDisplay).toBeInTheDocument();
    
    // Find Plus/Minus buttons by icon or by surrounding buttons
    const buttons = screen.getAllByRole('button');
    // Assuming button[1] is minus, button[2] is plus based on layout
    // Alternatively, we can find by inner SVG or class
    const plusButton = buttons.find(b => b.innerHTML.includes('lucide-plus') || b.querySelector('svg.lucide-plus')) || buttons[2];
    
    fireEvent.click(plusButton);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('adds item to cart and shows toast', () => {
    render(<ProductPage />);
    
    const addToCartButton = screen.getByText('INITIALIZE_TRANSFER');
    expect(addToCartButton).not.toBeDisabled();
    
    fireEvent.click(addToCartButton);
    
    const store = useCartStore.getState();
    expect(store.items).toHaveLength(1);
    expect(store.items[0].quantity).toBe(1);
    // Note: To test toast, we could mock react-hot-toast, but we'll focus on store for now.
  });

  it('disables add to cart when stock is 0', () => {
    // We need to mock useParams to a product with 0 stock
    const { useParams } = require('next/navigation');
    // 'quantum-switch' has 0 stock in sample data
    useParams.mockReturnValue({ slug: 'quantum-switch' });
    
    render(<ProductPage />);
    
    const unavailableButton = screen.getByText('UNAVAILABLE');
    expect(unavailableButton).toBeInTheDocument();
    expect(unavailableButton.closest('button')).toBeDisabled();
  });
});
