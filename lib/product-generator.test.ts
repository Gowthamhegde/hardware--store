import { ProductGenerator } from './product-generator';
import type { Product } from '@/types';

/**
 * Test suite for ProductGenerator
 */

describe('ProductGenerator', () => {
  let generator: ProductGenerator;
  
  beforeEach(() => {
    generator = new ProductGenerator();
  });
  
  describe('generateProductId', () => {
    it('should generate unique IDs', () => {
      const id1 = generator.generateProductId('Schneider Electric', 0);
      const id2 = generator.generateProductId('Schneider Electric', 1);
      
      expect(id1).not.toBe(id2);
      expect(id1.length).toBeGreaterThan(0);
    });
    
    it('should follow the pattern prd-[brand-prefix]-[number]', () => {
      const id = generator.generateProductId('Schneider Electric', 0);
      
      expect(id).toMatch(/^prd-[a-z0-9-]+-\d+(-[a-z0-9]+)?$/);
    });
    
    it('should handle collision by adding random suffix', () => {
      const id1 = generator.generateProductId('Test Brand', 0);
      const id2 = generator.generateProductId('Test Brand', 0);
      
      expect(id1).not.toBe(id2);
    });
  });
  
  describe('generateSlug', () => {
    it('should generate URL-safe slugs', () => {
      const slug = generator.generateSlug('Schneider Electric', 'Switches & Sockets', 0);
      
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    });
    
    it('should be unique', () => {
      const slug1 = generator.generateSlug('Brand', 'Switches & Sockets', 0);
      const slug2 = generator.generateSlug('Brand', 'Switches & Sockets', 0);
      
      expect(slug1).not.toBe(slug2);
    });
  });
  
  describe('getBrandBasePrice', () => {
    it('should return premium price for Schneider Electric', () => {
      const price = generator.getBrandBasePrice('Schneider Electric');
      expect(price).toBe(5.0);
    });
    
    it('should return standard price for Anchor', () => {
      const price = generator.getBrandBasePrice('Anchor');
      expect(price).toBe(2.5);
    });
    
    it('should return mid-range price for Havells', () => {
      const price = generator.getBrandBasePrice('Havells');
      expect(price).toBe(3.5);
    });
  });
  
  describe('getCategoryPriceMultiplier', () => {
    it('should return correct multiplier for Switches & Sockets', () => {
      const multiplier = generator.getCategoryPriceMultiplier('Switches & Sockets');
      expect(multiplier).toBe(1.0);
    });
    
    it('should return correct multiplier for Smart Home', () => {
      const multiplier = generator.getCategoryPriceMultiplier('Smart Home');
      expect(multiplier).toBe(2.0);
    });
  });
  
  describe('generateStockLevel', () => {
    it('should generate stock within valid range for category', () => {
      const stock = generator.generateStockLevel('Switches & Sockets', 'Anchor');
      
      expect(stock).toBeGreaterThanOrEqual(50);
      expect(stock).toBeLessThanOrEqual(250);
    });
  });
  
  describe('generateProduct', () => {
    it('should create complete Product object', () => {
      const product = generator.generateProduct({
        brand: 'Schneider Electric',
        category: 'Switches & Sockets',
        imageUrl: '/images/test.jpg',
        basePrice: 5.0,
        stockRange: [80, 150]
      }, 0);
      
      expect(product.id).toBeTruthy();
      expect(product.slug).toBeTruthy();
      expect(product.name).toContain('Schneider Electric');
      expect(product.price).toBeGreaterThan(0);
      expect(product.stock).toBeGreaterThanOrEqual(0);
      expect(product.category).toBe('Switches & Sockets');
      expect(product.brand).toBe('Schneider Electric');
      expect(product.image_url).toBe('/images/test.jpg');
      expect(product.specifications).toBeDefined();
      expect(product.specifications?.Brand).toBe('Schneider Electric');
      expect(product.created_at).toBeTruthy();
      expect(product.updated_at).toBeTruthy();
    });
  });
  
  describe('generateProductName', () => {
    it('should include brand name', () => {
      const name1 = generator.generateProductName('Yale', 'Smart Home', 0);
      const name2 = generator.generateProductName('Luker', 'Smart Home', 1);
      
      expect(name1).toContain('Yale');
      expect(name2).toContain('Luker');
    });
  });
  
  describe('generateSpecifications', () => {
    it('should generate correct specs for Switches & Sockets', () => {
      const specs = generator.generateSpecifications('Anchor', 'Switches & Sockets');
      
      expect(specs.Brand).toBe('Anchor');
      expect(specs.Rating).toBeDefined();
      expect(specs.Type).toBeDefined();
    });
    
    it('should generate correct specs for Cables & Wires', () => {
      const specs = generator.generateSpecifications('Finolex', 'Cables & Wires');
      
      expect(specs.Gauge).toBeDefined();
      expect(specs.Type).toBe('FR Wire');
    });
  });
  
  describe('registerExistingProducts', () => {
    it('should prevent ID collision with existing products', () => {
      const existingProducts: Product[] = [
        {
          id: 'existing-1',
          name: 'Existing Product',
          slug: 'existing-product',
          description: 'Test',
          price: 10,
          category: 'Switches & Sockets',
          image_url: '/test.jpg',
          stock: 100,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ];
      
      generator.registerExistingProducts(existingProducts);
      const newId = generator.generateProductId('Test', 0);
      const newSlug = generator.generateSlug('Test', 'Switches & Sockets', 0);
      
      expect(newId).not.toBe('existing-1');
      expect(newSlug).not.toBe('existing-product');
    });
  });
});
