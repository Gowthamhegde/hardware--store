/**
 * Product Image Mapping
 * Maps product IDs and brands to actual product images from /public/product-images/
 */

// Brand logos
export const BRAND_LOGOS = {
  kolors: '/images/kolors/logo.jpeg',
  legrand: '/product-images/legrand/Legrand-Logo.png',
  norisys: '/images/norisys/logo.png',
  panasonic: '/product-images/panasonic/panasonic/Panasonic-logo.jpg',
  finolex: '/images/finolex/logo.jpg',
};

// Company-specific image mappings (ALL IMAGES)
const COMPANY_IMAGES = {
  kolors: [
    '/product-images/kolors/kolors/716bXbLET-L.jpg',
    '/product-images/kolors/kolors/images-2.jpeg',
    '/product-images/kolors/kolors/images-3.jpeg',
    '/product-images/kolors/kolors/images-4.jpeg',
    '/product-images/kolors/kolors/images-5.jpeg',
    '/product-images/kolors/kolors/images-6.jpeg',
    '/product-images/kolors/kolors/images-7.jpeg',
    '/product-images/kolors/kolors/images-8.jpeg',
    '/product-images/kolors/kolors/images-9.jpeg',
    '/product-images/kolors/kolors/images-10.jpeg',
    '/product-images/kolors/kolors/images-11.jpeg',
    '/product-images/kolors/kolors/images-12.jpeg',
    '/product-images/kolors/kolors/images-13.jpeg',
    '/product-images/kolors/kolors/images-14.jpeg',
    '/product-images/kolors/kolors/images-15.jpeg',
    '/product-images/kolors/kolors/images-16.jpeg',
    '/product-images/kolors/kolors/images-17.jpeg',
    '/product-images/kolors/kolors/images-18.jpeg',
    '/product-images/kolors/kolors/images-19.jpeg',
    '/product-images/kolors/kolors/images-20.jpeg',
    '/product-images/kolors/kolors/images-21.jpeg',
  ],
  legrand: [
    '/product-images/legrand/images-2.jpeg',
    '/product-images/legrand/images-3.jpeg',
    '/product-images/legrand/images-4.jpeg',
    '/product-images/legrand/images-5.jpeg',
    '/product-images/legrand/images-6.jpeg',
    '/product-images/legrand/images-7.jpeg',
    '/product-images/legrand/images-8.jpeg',
    '/product-images/legrand/images-9.jpeg',
    '/product-images/legrand/images-10.jpeg',
    '/product-images/legrand/images-11.jpeg',
    '/product-images/legrand/images-12.jpeg',
    '/product-images/legrand/images-13.jpeg',
    '/product-images/legrand/images-14.jpeg',
    '/product-images/legrand/images-15.jpeg',
    '/product-images/legrand/images-16.jpeg',
    '/product-images/legrand/images-17.jpeg',
    '/product-images/legrand/legrand-modular-switch-board-470.jpg',
  ],
  norisys: [
    '/product-images/norisys/norisys/images-3.jpeg',
    '/product-images/norisys/norisys/images-4.jpeg',
    '/product-images/norisys/norisys/images-5.jpeg',
    '/product-images/norisys/norisys/images-6.jpeg',
    '/product-images/norisys/norisys/images-7.jpeg',
    '/product-images/norisys/norisys/images-8.jpeg',
    '/product-images/norisys/norisys/images-9.jpeg',
    '/product-images/norisys/norisys/images-10.jpeg',
    '/product-images/norisys/norisys/images-11.jpeg',
    '/product-images/norisys/norisys/images-12.jpeg',
    '/product-images/norisys/norisys/images-13.jpeg',
    '/product-images/norisys/norisys/images-14.jpeg',
    '/product-images/norisys/norisys/images-15.jpeg',
    '/product-images/norisys/norisys/images-16.jpeg',
    '/product-images/norisys/norisys/images-17.jpeg',
    '/product-images/norisys/norisys/images-18.jpeg',
    '/product-images/norisys/norisys/images-19.jpeg',
    '/product-images/norisys/norisys/images-20.jpeg',
    '/product-images/norisys/norisys/images-21.jpeg',
  ],
  panasonic: [
    '/product-images/panasonic/panasonic/images-2.jpeg',
    '/product-images/panasonic/panasonic/images-3.jpeg',
    '/product-images/panasonic/panasonic/Panasonic1__ACE.jpg',
    '/product-images/panasonic/panasonic/0ad8cbd9-b83d-468c-a5cf-a8f8892f1dc6.png',
    '/product-images/panasonic/panasonic/16a-3g-2w-switch-panasonic-refina-high-quality-multi-gang-electrical-switch-webp535327mwk04f4108f7222e036bfae1719cd3e730e946cb71d.png',
    '/product-images/panasonic/panasonic/panasonic-combination-4-way-1-way-switch-16a-250v-front-view.jpg.webp',
    '/product-images/panasonic/panasonic/thea_comp21.png',
  ],
  finolex: [
    '/images/finolex/switch (1).jpg',
    '/images/finolex/switch (2).jpg',
    '/images/finolex/switch (3).jpg',
    '/images/finolex/switch (4).jpg',
    '/images/finolex/cable (1).jpg',
    '/images/finolex/cable (2).jpg',
    '/images/finolex/cable (3).jpg',
    '/images/finolex/cable (4).jpg',
    '/images/finolex/cable (5).jpg',
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
  const allImages = [...COMPANY_IMAGES.kolors, ...COMPANY_IMAGES.legrand, ...COMPANY_IMAGES.norisys, ...COMPANY_IMAGES.panasonic, ...COMPANY_IMAGES.finolex];
  return allImages[0] || '/placeholder-product.png';
}

/**
 * Get brand logo
 */
export function getBrandLogo(brand: string): string {
  const brandLower = brand?.toLowerCase();
  return BRAND_LOGOS[brandLower as keyof typeof BRAND_LOGOS] || '';
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
    const allImages = [...COMPANY_IMAGES.kolors, ...COMPANY_IMAGES.legrand, ...COMPANY_IMAGES.norisys, ...COMPANY_IMAGES.panasonic, ...COMPANY_IMAGES.finolex];
    return allImages[0] || '/placeholder-product.png';
  }
  return images[Math.floor(Math.random() * images.length)];
}
