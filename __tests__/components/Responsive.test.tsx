import { render } from '@testing-library/react';
import BentoGrid from '../../components/BentoGrid';
import TechnicalProductCard from '../../components/TechnicalProductCard';
import ProductPage from '../../app/(shop)/product/[slug]/page';
import { SAMPLE_PRODUCTS } from '../../lib/sample-data';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock hooks and components
jest.mock('next/navigation', () => ({
  useParams: () => ({ slug: 'circuit-audio-receptor' }),
}));
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt} />,
}));
jest.mock('../../lib/store', () => ({
  useCartStore: () => ({ addItem: jest.fn() }),
  useCompareStore: () => ({ toggleCompare: jest.fn(), compareItems: [] }),
}));
jest.mock('lucide-react', () => ({
  ShoppingCart: () => <div data-testid="shopping-cart-icon" />,
  Scale: () => <div data-testid="scale-icon" />,
  ArrowRight: () => <div />,
  Plug: () => <div />,
  Cable: () => <div />,
  Speaker: () => <div />,
  Smartphone: () => <div />,
  Tag: () => <div />,
  Zap: () => <div />,
  Minus: () => <div />,
  Plus: () => <div />,
  Truck: () => <div />,
  RotateCcw: () => <div />,
  Shield: () => <div />,
  ChevronRight: () => <div />,
  Activity: () => <div />,
  Share2: () => <div />,
}));
  };
});

describe('Responsive Layout Snapshots', () => {
  const viewports = [
    { width: 375, name: 'Mobile' },
    { width: 768, name: 'Tablet' },
    { width: 1280, name: 'Desktop' },
  ];

  viewports.forEach(({ width, name }) => {
    describe(`${name} (${width}px)`, () => {
      beforeAll(() => {
        // Mock window innerWidth
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });
      });

      it('BentoGrid matches snapshot', () => {
        const { asFragment } = render(<BentoGrid />);
        expect(asFragment()).toMatchSnapshot();
      });

      it('TechnicalProductCard matches snapshot', () => {
        const { asFragment } = render(<TechnicalProductCard product={SAMPLE_PRODUCTS[0]} index={0} />);
        expect(asFragment()).toMatchSnapshot();
      });

      it('ProductPage matches snapshot', () => {
        const { asFragment } = render(<ProductPage />);
        expect(asFragment()).toMatchSnapshot();
      });
    });
  });
});
