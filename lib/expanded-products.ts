import type { Product } from '@/types';

/**
 * Expanded product catalog using all available brand images
 * Each image from the brand folders is assigned to a product
 */

// KOLORS Products (21 images)
const kolorsProducts: Product[] = Array.from({ length: 21 }, (_, i) => ({
  id: `kolors-${100 + i}`,
  name: `Kolors ${['Modular Switch', 'Socket', '2-Way Switch', '3-Pin Socket', 'Bell Push', 'Fan Regulator', 'Dimmer Switch', 'USB Charger', 'Data Socket', 'TV Socket'][i % 10]} ${Math.floor(i / 10) + 1}`,
  slug: `kolors-product-${100 + i}`,
  description: `Premium Kolors electrical product - high quality and durable`,
  long_description: `Authentic Kolors electrical product. Premium quality with modern design and reliable performance.`,
  price: 2.50 + (i * 0.30),
  category: 'Switches & Sockets',
  brand: 'Kolors',
  image_url: '',
  stock: 50 + (i * 10),
  specifications: { 'Brand': 'Kolors', 'Rating': '16A', 'Type': 'Modular' },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

// LEGRAND Products (17 images)
const legrandProducts: Product[] = Array.from({ length: 17 }, (_, i) => ({
  id: `legrand-${200 + i}`,
  name: `Legrand ${['Mylinc Switch', 'Arteor Socket', 'Belanko Switch', 'Galion Socket', 'Mallia Switch', 'Lyncus Socket', 'Valena Switch'][i % 7]} ${Math.floor(i / 7) + 1}`,
  slug: `legrand-product-${200 + i}`,
  description: `Premium Legrand electrical accessories - French engineering excellence`,
  long_description: `Authentic Legrand product. World-class quality with innovative design and superior safety features.`,
  price: 4.00 + (i * 0.50),
  category: 'Switches & Sockets',
  brand: 'Legrand',
  image_url: '',
  stock: 40 + (i * 8),
  specifications: { 'Brand': 'Legrand', 'Rating': '16A', 'Type': 'Modular', 'Series': 'Premium' },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

// NORISYS Products (19 images)
const norisysProducts: Product[] = Array.from({ length: 19 }, (_, i) => ({
  id: `norisys-${300 + i}`,
  name: `Norisys ${['Cube Switch', 'Veto Socket', 'Classico Switch', 'Verve Socket', 'Jazz Switch', 'Step Socket', 'Bell Push'][i % 7]} ${Math.floor(i / 7) + 1}`,
  slug: `norisys-product-${300 + i}`,
  description: `Elegant Norisys electrical products - style meets functionality`,
  long_description: `Authentic Norisys product. Elegant design with premium finish and reliable performance.`,
  price: 3.50 + (i * 0.40),
  category: 'Switches & Sockets',
  brand: 'Norisys',
  image_url: '',
  stock: 45 + (i * 9),
  specifications: { 'Brand': 'Norisys', 'Rating': '16A', 'Type': 'Modular' },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

// PANASONIC Products (7 images)
const panasonicProducts: Product[] = Array.from({ length: 7 }, (_, i) => ({
  id: `panasonic-${400 + i}`,
  name: `Panasonic ${['Roma Switch', 'Friz Switch', 'Refina Socket', 'Thea Switch', 'Modular Socket', 'Bell Push', 'Fan Regulator'][i]}`,
  slug: `panasonic-product-${400 + i}`,
  description: `Trusted Panasonic electrical products - Japanese quality and reliability`,
  long_description: `Authentic Panasonic product. Japanese engineering with unmatched reliability and safety standards.`,
  price: 3.80 + (i * 0.60),
  category: 'Switches & Sockets',
  brand: 'Panasonic',
  image_url: '',
  stock: 60 + (i * 12),
  specifications: { 'Brand': 'Panasonic', 'Rating': '16A', 'Type': 'Modular', 'Origin': 'Japan Tech' },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

// FINOLEX Products (9 images: 4 switches + 5 cables)
const finolexProducts: Product[] = [
  // Switches (4 images)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `finolex-${500 + i}`,
    name: `Finolex ${['16A Modular Switch', '10A 2-Way Switch', '6A Bell Push', '16A 3-Pin Socket'][i]}`,
    slug: `finolex-switch-${500 + i}`,
    description: `Premium Finolex modular switches - trusted Indian brand`,
    long_description: `Authentic Finolex electrical switch. Made in India with premium materials and superior safety features.`,
    price: 2.80 + (i * 0.40),
    category: 'Switches & Sockets',
    brand: 'Finolex',
    image_url: '',
    stock: 100 + (i * 15),
    specifications: { 'Brand': 'Finolex', 'Rating': '16A', 'Type': 'Modular', 'Made in': 'India' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })),
  // Cables (5 images)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `finolex-${510 + i}`,
    name: `Finolex ${['2.5mm² FR Wire', '1.5mm² House Wire', '4mm² Submersible Cable', '6mm² Power Cable', '1mm² Flexible Wire'][i]}`,
    slug: `finolex-cable-${510 + i}`,
    description: `High quality Finolex cables and wires - flame retardant and durable`,
    long_description: `Authentic Finolex cable. ISI certified with superior insulation and long-lasting performance.`,
    price: 15.00 + (i * 8.00),
    category: 'Cables & Wires',
    brand: 'Finolex',
    image_url: '',
    stock: 80 + (i * 20),
    specifications: { 'Brand': 'Finolex', 'Type': 'FR Cable', 'Length': '90m', 'ISI': 'Certified' },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })),
];

// Export all expanded products
export const EXPANDED_PRODUCTS: Product[] = [
  ...kolorsProducts,
  ...legrandProducts,
  ...norisysProducts,
  ...panasonicProducts,
  ...finolexProducts,
];

// Export by brand for easy filtering
export const PRODUCTS_BY_BRAND = {
  kolors: kolorsProducts,
  legrand: legrandProducts,
  norisys: norisysProducts,
  panasonic: panasonicProducts,
  finolex: finolexProducts,
};
