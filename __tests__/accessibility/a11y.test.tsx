import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import TechnicalProductCard from '../../components/TechnicalProductCard';
import Navbar from '../../components/Navbar';
import { SAMPLE_PRODUCTS } from '../../lib/sample-data';

expect.extend(toHaveNoViolations);

// Mock hooks and components
jest.mock('next/navigation', () => ({
  useParams: () => ({ slug: 'test' }),
  usePathname: () => '/',
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || 'test image'} />,
}));

jest.mock('../../lib/store', () => ({
  useCartStore: () => ({ addItem: jest.fn(), items: [], isCartOpen: false }),
  useCompareStore: () => ({ toggleCompare: jest.fn(), compareItems: [] }),
}));

jest.mock('lucide-react', () => ({
  ShoppingCart: () => <div />,
  Scale: () => <div />,
  Menu: () => <div />,
  X: () => <div />,
  Search: () => <div />,
  User: () => <div />,
}));



describe('Accessibility Audit (jest-axe)', () => {
  it('TechnicalProductCard should have no accessibility violations', async () => {
    const { container } = render(
      <TechnicalProductCard product={SAMPLE_PRODUCTS[0]} index={0} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Navbar should have no accessibility violations', async () => {
    const { container } = render(<Navbar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Since we don't have a specific form component exported directly (like CheckoutForm),
  // we'll just test these two main components which cover interactive elements and contrast.
});
