import { ImageScanner } from './image-scanner';
import { join } from 'path';

/**
 * Basic validation test for ImageScanner functionality.
 * Scans the actual /public/images/ directory and verifies the results.
 */
describe('ImageScanner', () => {
  const scanner = new ImageScanner();
  const publicImagesPath = join(process.cwd(), 'public', 'images');

  it('should scan directory and return inventory with all brands', async () => {
    const inventory = await scanner.scanDirectory(publicImagesPath);

    // Verify we found images
    expect(inventory.totalImages).toBeGreaterThan(0);
    expect(inventory.brands.size).toBeGreaterThan(0);

    // Verify expected brands are present
    const brandNames = Array.from(inventory.brands.keys());
    expect(brandNames).toContain('Schneider Electric');
    expect(brandNames).toContain('Yale');
    expect(brandNames).toContain('Luker');
    expect(brandNames).toContain('Havells');
    expect(brandNames).toContain('Anchor');
  });

  it('should normalize paths to /images/ format', async () => {
    const inventory = await scanner.scanDirectory(publicImagesPath);

    const allImages = Array.from(inventory.brands.values()).flat();
    
    for (const image of allImages) {
      // All paths should start with /images/
      expect(image.path).toMatch(/^\/images\//);
      
      // Paths should use forward slashes
      expect(image.path).not.toContain('\\');
    }
  });

  it('should extract brand names correctly', async () => {
    const inventory = await scanner.scanDirectory(publicImagesPath);

    // Check specific brand mappings
    const schneiderImages = inventory.brands.get('Schneider Electric');
    expect(schneiderImages).toBeDefined();
    expect(schneiderImages!.length).toBeGreaterThan(0);

    const yaleImages = inventory.brands.get('Yale');
    expect(yaleImages).toBeDefined();
    expect(yaleImages!.length).toBeGreaterThan(0);

    const lukerImages = inventory.brands.get('Luker');
    expect(lukerImages).toBeDefined();
    expect(lukerImages!.length).toBeGreaterThan(0);
  });

  it('should extract category hints from folder names', async () => {
    const inventory = await scanner.scanDirectory(publicImagesPath);

    // Yale should be Smart Home
    const yaleImages = inventory.brands.get('Yale');
    expect(yaleImages).toBeDefined();
    expect(yaleImages![0].categoryHint).toBe('Smart Home');

    // Home Theatre images should have correct category
    const theatreImages = inventory.brands.get('Home Theatre');
    if (theatreImages) {
      expect(theatreImages[0].categoryHint).toBe('Home Theatre & Audio');
    }
  });

  it('should filter only valid image extensions', async () => {
    const inventory = await scanner.scanDirectory(publicImagesPath);
    const allImages = Array.from(inventory.brands.values()).flat();

    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.jfif'];

    for (const image of allImages) {
      expect(validExtensions).toContain(image.extension);
    }
  });

  it('should skip logo files', async () => {
    const inventory = await scanner.scanDirectory(publicImagesPath);
    const allImages = Array.from(inventory.brands.values()).flat();

    for (const image of allImages) {
      expect(image.filename.toLowerCase()).not.toContain('logo');
    }
  });

  it('should generate accurate image statistics', async () => {
    await scanner.scanDirectory(publicImagesPath);
    const stats = scanner.countImages();

    // Verify stats structure
    expect(stats.byBrand).toBeDefined();
    expect(stats.byCategory).toBeDefined();
    expect(stats.byExtension).toBeDefined();

    // Verify stats have data
    expect(Object.keys(stats.byBrand).length).toBeGreaterThan(0);
    expect(Object.keys(stats.byExtension).length).toBeGreaterThan(0);

    // Verify specific brands have counts
    expect(stats.byBrand['Schneider Electric']).toBeGreaterThan(0);
    expect(stats.byBrand['Yale']).toBeGreaterThan(0);
    expect(stats.byBrand['Luker']).toBeGreaterThan(0);
  });

  it('should group images by brand correctly', async () => {
    const inventory = await scanner.scanDirectory(publicImagesPath);

    // Each brand should have at least one image
    for (const [brand, images] of inventory.brands) {
      expect(images.length).toBeGreaterThan(0);
      
      // All images in group should have matching brand
      for (const image of images) {
        expect(image.brand).toBe(brand);
      }
    }
  });

  it('should generate category suggestions per brand', async () => {
    const inventory = await scanner.scanDirectory(publicImagesPath);

    // Yale should suggest Smart Home
    const yaleSuggestions = inventory.categorySuggestions.get('Yale');
    expect(yaleSuggestions).toBeDefined();
    expect(yaleSuggestions).toContain('Smart Home');

    // Luker should suggest Smart Home
    const lukerSuggestions = inventory.categorySuggestions.get('Luker');
    expect(lukerSuggestions).toBeDefined();
    expect(lukerSuggestions).toContain('Smart Home');
  });

  it('should handle nested directory structures', async () => {
    const inventory = await scanner.scanDirectory(publicImagesPath);

    // havells1/schneider electrics/ images should be mapped to Schneider Electric
    const schneiderImages = inventory.brands.get('Schneider Electric');
    expect(schneiderImages).toBeDefined();
    
    // Should have images from both main folder and nested folder
    const schneiderPaths = schneiderImages!.map(img => img.path);
    const hasMainFolder = schneiderPaths.some(p => p.includes('/schneider electrics/'));
    expect(hasMainFolder).toBe(true);
  });
});
