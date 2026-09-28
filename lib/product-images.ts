/**
 * Product Image Mapping
 * Maps brands to their actual product images from /public/images/
 */

export const BRAND_LOGOS = {
  anchor: '/images/anchor/logo.png',
  kolors: '/images/kolors/logo.jpeg',
  legrand: '/images/legrand/Logo.png',
  norisys: '/images/norisys/logo.png',
  panasonic: '/images/panasonic/Panasonic-logo.jpg',
  finolex: '/images/finolex/logo.jpg',
};

const COMPANY_IMAGES: Record<string, string[]> = {
  anchor: [
    '/images/anchor/switch (1).jpeg',
    '/images/anchor/switch (1).jpg',
    '/images/anchor/switch (1).png',
    '/images/anchor/switch (1).webp',
    '/images/anchor/switch (2).jpg',
    '/images/anchor/switch (3).jpg',
    '/images/anchor/colour-plate.png',
    '/images/anchor/wire (1).jpeg',
    '/images/anchor/wire (1).jpg',
    '/images/anchor/wire (1).png',
    '/images/anchor/wire (2).jpeg',
    '/images/anchor/wire (2).jpg',
    '/images/anchor/wire (3).jpg',
    '/images/anchor/wire (4).jpg',
    '/images/anchor/wire.png',
    '/images/anchor wires and cables/images.jfif',
    '/images/anchor wires and cables/images (1).jfif',
    '/images/anchor wires and cables/images (2).jfif',
    '/images/anchor wires and cables/images (3).jfif',
  ],
  kolors: [
    '/images/kolors/switch.jpg',
    '/images/kolors/switch1.jpeg',
    '/images/kolors/switch2.jpeg',
    '/images/kolors/switch3.jpeg',
    '/images/kolors/switch4.jpeg',
    '/images/kolors/switch6.jpeg',
    '/images/kolors/switch7.jpeg',
    '/images/kolors/switch8.jpeg',
    '/images/kolors/switch9.jpeg',
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
  ],
  legrand: [
    '/images/legrand/switch.jpeg',
    '/images/legrand/switch1.jpeg',
    '/images/legrand/switch2.jpeg',
    '/images/legrand/switch3.jpeg',
    '/images/legrand/switch4.jpeg',
    '/images/legrand/switch5.jpeg',
    '/images/legrand/switch6.jpeg',
    '/images/legrand/switch7.jpeg',
    '/images/legrand/switch8.jpeg',
    '/images/legrand/switch9.jpeg',
    '/images/legrand/switch10.jpeg',
    '/images/legrand/switch11.jpeg',
    '/images/legrand/switch12.jpeg',
    '/images/legrand/switch13.jpeg',
    '/images/legrand/switch14.jpeg',
    '/images/legrand/switch15.jpeg',
    '/images/legrand/switch16.jpg',
  ],
  norisys: [
    '/images/norisys/switch (1).jpeg',
    '/images/norisys/switch (2).jpeg',
    '/images/norisys/switch (3).jpeg',
    '/images/norisys/switch (4).jpeg',
    '/images/norisys/switch (5).jpeg',
    '/images/norisys/switch (6).jpeg',
    '/images/norisys/switch (7).jpeg',
    '/images/norisys/switch (8).jpeg',
    '/images/norisys/switch (9).jpeg',
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
  havells: [
    '/images/havells1/images.jfif',
    '/images/havells1/images (1).jfif',
    '/images/havells1/images (2).jfif',
    '/images/havells1/images (3).jfif',
    '/images/havells1/images (4).jfif',
    '/images/havells1/images (5).jfif',
    '/images/havells1/images (6).jfif',
    '/images/havells1/images (7).jfif',
    '/images/havells1/images (8).jfif',
    '/images/havells1/images (9).jfif',
    '/images/havells1/images (10).jfif',
    '/images/havells1/images (11).jfif',
    '/images/havells1/images (12).jfif',
    '/images/havells1/images (13).jfif',
    '/images/havells1/images (14).jfif',
    '/images/havells1/images (15).jfif',
    '/images/havells wires and cables/05-sqmm-havells-electrical-wi-20260123141315861.webp',
    '/images/havells wires and cables/images.jfif',
    '/images/havells wires and cables/images.png',
    '/images/havells wires and cables/images (1).jfif',
    '/images/havells wires and cables/images (1).png',
    '/images/havells wires and cables/images (2).jfif',
    '/images/havells wires and cables/images (3).jfif',
    '/images/havells wires and cables/images (4).jfif',
    '/images/havells wires and cables/images (5).jfif',
    '/images/havells wires and cables/images (6).jfif',
    '/images/havells wires and cables/images (7).jfif',
    '/images/havells wires and cables/images (8).jfif',
  ],
  'schneider electric': [
    '/images/schneider electrics/schneider-unica-pure-modular-switch.jpeg',
    '/images/schneider electrics/6-a-schneider-unica-pure-modul-20260407004713100.webp',
    '/images/schneider electrics/6a-schneider-unica-pure-modula-20260127190551313.webp',
    '/images/schneider electrics/schneider electrics.webp',
    '/images/schneider electrics/product-jpeg.jpg',
    '/images/schneider electrics/product-jpeg.jfif',
    '/images/schneider electrics/96157933_3564178430265850_580540060701556736_n.webp',
    '/images/schneider electrics/images.jfif',
    '/images/schneider electrics/images (1).jfif',
    '/images/schneider electrics/images (2).jfif',
    '/images/schneider electrics/images (3).jfif',
    '/images/schneider electrics/images (4).jfif',
    '/images/schneider electrics/images (5).jfif',
    '/images/schneider electrics/images (6).jfif',
    '/images/havells1/schneider electrics/schneider-unica-pure-modular-switch.jpeg',
    '/images/havells1/schneider electrics/6-a-schneider-unica-pure-modul-20260407004713100.webp',
    '/images/havells1/schneider electrics/6a-schneider-unica-pure-modula-20260127190551313.webp',
    '/images/havells1/schneider electrics/product-jpeg.jpg',
    '/images/havells1/schneider electrics/images.jfif',
    '/images/havells1/schneider electrics/images (1).jfif',
    '/images/havells1/schneider electrics/images (2).jfif',
    '/images/havells1/schneider electrics/images (3).jfif',
    '/images/havells1/schneider electrics/images (4).jfif',
    '/images/havells1/schneider electrics/images (5).jfif',
    '/images/havells1/schneider electrics/images (6).jfif',
  ],
  yale: [
    '/images/yale fans,lights,smart locker/images.jfif',
    '/images/yale fans,lights,smart locker/images (1).jfif',
    '/images/yale fans,lights,smart locker/images (2).jfif',
    '/images/yale fans,lights,smart locker/images (3).jfif',
    '/images/yale fans,lights,smart locker/images (4).jfif',
    '/images/yale fans,lights,smart locker/images (5).jfif',
    '/images/yale fans,lights,smart locker/images (6).jfif',
    '/images/yale fans,lights,smart locker/images (7).jfif',
    '/images/yale fans,lights,smart locker/images (8).jfif',
    '/images/yale fans,lights,smart locker/images (9).jfif',
    '/images/yale fans,lights,smart locker/images (10).jfif',
    '/images/yale fans,lights,smart locker/images (11).jfif',
    '/images/yale fans,lights,smart locker/images (12).jfif',
    '/images/yale fans,lights,smart locker/images (13).jfif',
    '/images/yale fans,lights,smart locker/images (14).jfif',
    '/images/yale fans,lights,smart locker/images (15).jfif',
    '/images/yale fans,lights,smart locker/images (16).jfif',
    '/images/yale fans,lights,smart locker/images (17).jfif',
    '/images/yale fans,lights,smart locker/images (18).jfif',
    '/images/yale fans,lights,smart locker/images (19).jfif',
    '/images/yale fans,lights,smart locker/images (20).jfif',
    '/images/yale fans,lights,smart locker/images (21).jfif',
    '/images/yale fans,lights,smart locker/images (22).jfif',
    '/images/yale fans,lights,smart locker/images (23).jfif',
    '/images/yale fans,lights,smart locker/images (24).jfif',
    '/images/yale fans,lights,smart locker/images (40).jfif',
  ],
  luker: [
    '/images/luker fans,lights,smart locker/61IUjar0rnL._AC_UF350,350_QL80_.jpg',
    '/images/luker fans,lights,smart locker/images.jfif',
    '/images/luker fans,lights,smart locker/images (1).jfif',
    '/images/luker fans,lights,smart locker/images (2).jfif',
    '/images/luker fans,lights,smart locker/images (3).jfif',
    '/images/luker fans,lights,smart locker/images (4).jfif',
    '/images/luker fans,lights,smart locker/images (5).jfif',
    '/images/luker fans,lights,smart locker/images (6).jfif',
    '/images/luker fans,lights,smart locker/images (7).jfif',
    '/images/luker fans,lights,smart locker/images (8).jfif',
    '/images/luker fans,lights,smart locker/images (9).jfif',
    '/images/luker fans,lights,smart locker/images (10).jfif',
    '/images/luker fans,lights,smart locker/images (11).jfif',
    '/images/luker fans,lights,smart locker/images (12).jfif',
    '/images/luker fans,lights,smart locker/images (13).jfif',
    '/images/luker fans,lights,smart locker/images (14).jfif',
    '/images/luker fans,lights,smart locker/images (15).jfif',
    '/images/luker fans,lights,smart locker/images (16).jfif',
    '/images/luker fans,lights,smart locker/images (17).jfif',
    '/images/luker fans,lights,smart locker/images (18).jfif',
    '/images/luker fans,lights,smart locker/images (19).jfif',
    '/images/luker fans,lights,smart locker/images (20).jfif',
    '/images/luker fans,lights,smart locker/images (21).jfif',
    '/images/luker fans,lights,smart locker/images (22).jfif',
    '/images/luker fans,lights,smart locker/images (23).jfif',
    '/images/luker fans,lights,smart locker/images (24).jfif',
    '/images/luker fans,lights,smart locker/images (25).jfif',
    '/images/luker fans,lights,smart locker/images (26).jfif',
    '/images/luker fans,lights,smart locker/images (27).jfif',
    '/images/luker fans,lights,smart locker/images (28).jfif',
    '/images/luker fans,lights,smart locker/images (29).jfif',
    '/images/luker fans,lights,smart locker/images (30).jfif',
    '/images/luker fans,lights,smart locker/images (31).jfif',
    '/images/luker fans,lights,smart locker/images (32).jfif',
    '/images/luker fans,lights,smart locker/images (33).jfif',
    '/images/luker fans,lights,smart locker/images (34).jfif',
    '/images/luker fans,lights,smart locker/images (35).jfif',
    '/images/luker fans,lights,smart locker/images (36).jfif',
    '/images/luker fans,lights,smart locker/images (37).jfif',
    '/images/luker fans,lights,smart locker/images (38).jfif',
    '/images/luker fans,lights,smart locker/images (39).jfif',
  ],
  'home theatre': [
    '/images/Home theater/klipsch-reference-5-2-home-theater-system-620.jpg',
    '/images/Home theater/focal-sopra-no3-home-cinema-7-1-speaker-package-500x500.webp',
    '/images/Home theater/1200Wx1200H_39d6a9f7-df0a-4d8c-b6d4-70d31fe15919_1200x630.webp',
    '/images/Home theater/images.jfif',
    '/images/Home theater/images (1).jfif',
    '/images/Home theater/images (2).jfif',
    '/images/Home theater/images (3).jfif',
    '/images/Home theater/images (4).jfif',
    '/images/Home theater/images (5).jfif',
  ],
};

/**
 * Get product image based on brand.
 * If the product already has a real image path, use it.
 * Otherwise pick deterministically from the brand's image pool.
 */
export function getProductImageByBrand(brand: string, productId: string, fallbackUrl?: string): string {
  // Real image already on the product — don't override
  if (fallbackUrl && fallbackUrl !== '' && !fallbackUrl.startsWith('/store-photos/')) {
    return fallbackUrl;
  }

  const brandLower = brand?.toLowerCase().trim();
  const images = COMPANY_IMAGES[brandLower];

  if (images && images.length > 0) {
    // Deterministic: same productId always maps to the same image
    const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return images[hash % images.length];
  }

  if (fallbackUrl && fallbackUrl !== '') return fallbackUrl;

  return COMPANY_IMAGES['anchor'][0];
}

/**
 * Get brand logo
 */
export function getBrandLogo(brand: string): string {
  const brandLower = brand?.toLowerCase().trim();
  return BRAND_LOGOS[brandLower as keyof typeof BRAND_LOGOS] || '';
}

/**
 * Get all images for a specific brand
 */
export function getImagesByBrand(brand: string): string[] {
  const brandLower = brand?.toLowerCase().trim();
  return COMPANY_IMAGES[brandLower] || [];
}

/**
 * Get random image from a brand's collection
 */
export function getRandomBrandImage(brand: string): string {
  const images = getImagesByBrand(brand);
  if (images.length === 0) return COMPANY_IMAGES['anchor'][0];
  return images[Math.floor(Math.random() * images.length)];
}
