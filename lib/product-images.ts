/**
 * Product Image Mapping
 * Maps product IDs and brands to actual product images from /public/product-images/
 */

// Company-specific image mappings
const COMPANY_IMAGES = {
  kolors: [
    '/images/kolors/switch.jpg',
    '/images/kolors/switch1.jpeg',
    '/images/kolors/switch10.jpeg',
    '/images/kolors/switch11.jpeg',
    '/images/kolors/switch12.jpeg',
    '/images/kolors/switch13.jpeg',
    '/images/kolors/switch14.jpeg',
    '/images/kolors/switch15.jpeg',
    '/images/kolors/switch16.jpeg',
    '/images/kolors/switch17.jpeg',
    '/images/kolors/switch18.jpeg',
    '/images/kolors/switch19.jpeg',
    '/images/kolors/switch2.jpeg',
    '/images/kolors/switch3.jpeg',
    '/images/kolors/switch4.jpeg',
    '/images/kolors/switch6.jpeg',
    '/images/kolors/switch7.jpeg',
    '/images/kolors/switch8.jpeg',
    '/images/kolors/switch9.jpeg',
  ],
  legrand: [
    '/images/legrand/switch.jpeg',
    '/images/legrand/switch1.jpeg',
    '/images/legrand/switch10.jpeg',
    '/images/legrand/switch11.jpeg',
    '/images/legrand/switch12.jpeg',
    '/images/legrand/switch13.jpeg',
    '/images/legrand/switch14.jpeg',
    '/images/legrand/switch15.jpeg',
    '/images/legrand/switch16.jpg',
    '/images/legrand/switch2.jpeg',
    '/images/legrand/switch3.jpeg',
    '/images/legrand/switch4.jpeg',
    '/images/legrand/switch5.jpeg',
    '/images/legrand/switch6.jpeg',
    '/images/legrand/switch7.jpeg',
    '/images/legrand/switch8.jpeg',
    '/images/legrand/switch9.jpeg',
  ],
  norisys: [
    '/images/norisys/switch (1).jpeg',
    '/images/norisys/switch (10).jpeg',
    '/images/norisys/switch (11).jpeg',
    '/images/norisys/switch (12).jpeg',
    '/images/norisys/switch (13).jpeg',
    '/images/norisys/switch (14).jpeg',
    '/images/norisys/switch (15).jpeg',
    '/images/norisys/switch (16).jpeg',
    '/images/norisys/switch (17).jpeg',
    '/images/norisys/switch (18).jpeg',
    '/images/norisys/switch (19).jpeg',
    '/images/norisys/switch (2).jpeg',
    '/images/norisys/switch (3).jpeg',
    '/images/norisys/switch (4).jpeg',
    '/images/norisys/switch (5).jpeg',
    '/images/norisys/switch (6).jpeg',
    '/images/norisys/switch (7).jpeg',
    '/images/norisys/switch (8).jpeg',
    '/images/norisys/switch (9).jpeg',
  ],
  panasonic: [
    '/images/panasonic/switch (1).jpeg',
    '/images/panasonic/switch (1).jpg',
    '/images/panasonic/switch (1).png',
    '/images/panasonic/switch (1).webp',
    '/images/panasonic/switch (2).jpeg',
    '/images/panasonic/switch (2).png',
    '/images/panasonic/switch (3).png',
  ],
};

/**
 * Get product image based on brand
 * Returns a consistent image for the same product but varies by brand
 */
export function getProductImageByBrand(brand: string, productId: string, fallbackUrl?: string): string {
  const brandLower = brand?.toLowerCase();
  
  // Check if we have images for this brand
  if (brandLower && COMPANY_IMAGES[brandLower as keyof typeof COMPANY_IMAGES]) {
    const images = COMPANY_IMAGES[brandLower as keyof typeof COMPANY_IMAGES];
    
    // Use product ID to deterministically select an image (same product always gets same image)
    const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = hash % images.length;
    
    return images[index];
  }
  
  // Fallback to provided URL or first available product image
  if (fallbackUrl) {
    return fallbackUrl;
  }
  
  // Use first available image from any brand as final fallback
  const allImages = [...COMPANY_IMAGES.kolors, ...COMPANY_IMAGES.legrand, ...COMPANY_IMAGES.norisys, ...COMPANY_IMAGES.panasonic];
  return allImages[0] || '/placeholder-product.png';
}

/**
 * Get all images for a specific brand
 */
export function getImagesByBrand(brand: string): string[] {
  const brandLower = brand?.toLowerCase();
  return COMPANY_IMAGES[brandLower as keyof typeof COMPANY_IMAGES] || [];
}

/**
 * Get random image from a brand's collection
 */
export function getRandomBrandImage(brand: string): string {
  const images = getImagesByBrand(brand);
  if (images.length === 0) {
    // Use first available image from any brand as fallback
    const allImages = [...COMPANY_IMAGES.kolors, ...COMPANY_IMAGES.legrand, ...COMPANY_IMAGES.norisys, ...COMPANY_IMAGES.panasonic];
    return allImages[0] || '/placeholder-product.png';
  }
  return images[Math.floor(Math.random() * images.length)];
}
