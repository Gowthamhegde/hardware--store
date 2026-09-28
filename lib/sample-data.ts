import type { Product } from '@/types';
import { EXPANDED_PRODUCTS } from './expanded-products';

export const SAMPLE_PRODUCTS: Product[] = [
  // Include all expanded brand products
  ...EXPANDED_PRODUCTS,
  
  // Original products with valid images
  {
    "id": "anchor-600",
    "name": "Anchor Roma Modular Switch 10A 1-Way",
    "slug": "anchor-roma-modular-switch-10a-1-way",
    "description": "Iconic Roma modular switch engineered for long-lasting reliability",
    "long_description": "Authentic Anchor Roma modular switch. Features smooth rocking action, silver alloy contacts, and ISI certified electrical safety standards.",
    "price": 2.2,
    "category": "Switches & Sockets",
    "brand": "Anchor",
    "image_url": "/images/anchor/switch (1).jpeg",
    "stock": 150,
    "specifications": {
      "Brand": "Anchor",
      "Series": "Roma",
      "Rating": "10A 240V",
      "Type": "Modular Switch"
    },
    "created_at": "2026-09-28T19:59:46.648Z",
    "updated_at": "2026-09-28T19:59:46.648Z"
  },
  {
    "id": "anchor-601",
    "name": "Anchor Penta 6A Piano Switch",
    "slug": "anchor-penta-6a-piano-switch-authentic",
    "description": "Traditional heavy-duty piano switch by Anchor",
    "long_description": "Authentic Anchor Penta non-modular piano switch. Built with robust urea-formaldehyde housing and tested for over 100,000 operations.",
    "price": 1.5,
    "category": "Switches & Sockets",
    "brand": "Anchor",
    "image_url": "/images/anchor/switch (1).jpg",
    "stock": 250,
    "specifications": {
      "Brand": "Anchor",
      "Series": "Penta",
      "Rating": "6A 240V",
      "Type": "Piano Switch"
    },
    "created_at": "2026-09-28T19:59:46.648Z",
    "updated_at": "2026-09-28T19:59:46.648Z"
  },
  {
    "id": "anchor-602",
    "name": "Anchor Roma Classic 16A Power Switch",
    "slug": "anchor-roma-classic-16a-power-switch",
    "description": "High current 16A modular switch with neon indicator",
    "long_description": "Heavy duty 16A switch for appliances like geysers, air conditioners, and kitchen equipment. High spark suppression mechanism.",
    "price": 3.4,
    "category": "Switches & Sockets",
    "brand": "Anchor",
    "image_url": "/images/anchor/switch (1).png",
    "stock": 120,
    "specifications": {
      "Brand": "Anchor",
      "Series": "Roma Classic",
      "Rating": "16A Heavy Duty",
      "Type": "Power Switch"
    },
    "created_at": "2026-09-28T19:59:46.648Z",
    "updated_at": "2026-09-28T19:59:46.648Z"
  },
  {
    "id": "anchor-603",
    "name": "Anchor Vision Flat Modular Switch",
    "slug": "anchor-vision-flat-modular-switch",
    "description": "Sleek flush-finish minimalist switch module",
    "long_description": "Modern flat-design modular switch from the Anchor Vision series. Ultra-low profile with soft-click actuation.",
    "price": 3.8,
    "category": "Switches & Sockets",
    "brand": "Anchor",
    "image_url": "/images/anchor/switch (1).webp",
    "stock": 90,
    "specifications": {
      "Brand": "Anchor",
      "Series": "Vision",
      "Rating": "10A",
      "Type": "Flat Modular Switch"
    },
    "created_at": "2026-09-28T19:59:46.648Z",
    "updated_at": "2026-09-28T19:59:46.648Z"
  },
  {
    "id": "anchor-604",
    "name": "Anchor Rider 16A 3-Pin Universal Socket",
    "slug": "anchor-rider-16a-3-pin-universal-socket",
    "description": "16A/6A twin shutter socket with safety protection",
    "long_description": "Multi-pin universal socket with integrated child safety shutters and phosphor bronze contacts for firm grip.",
    "price": 3.9,
    "category": "Switches & Sockets",
    "brand": "Anchor",
    "image_url": "/images/anchor/switch (2).jpg",
    "stock": 110,
    "specifications": {
      "Brand": "Anchor",
      "Series": "Rider",
      "Rating": "16A / 6A Dual",
      "Type": "Socket"
    },
    "created_at": "2026-09-28T19:59:46.648Z",
    "updated_at": "2026-09-28T19:59:46.648Z"
  },
  {
    "id": "anchor-605",
    "name": "Anchor Woods 2-Way Bell Push Module",
    "slug": "anchor-woods-2-way-bell-push-module",
    "description": "Premium bell push switch with nameplate slot",
    "long_description": "Durable spring-loaded bell push switch module designed for commercial and residential door entrances.",
    "price": 2.9,
    "category": "Switches & Sockets",
    "brand": "Anchor",
    "image_url": "/images/anchor/switch (3).jpg",
    "stock": 80,
    "specifications": {
      "Brand": "Anchor",
      "Series": "Woods",
      "Rating": "6A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.648Z",
    "updated_at": "2026-09-28T19:59:46.648Z"
  },
  {
    "id": "anchor-606",
    "name": "Anchor Modular Colour Cover Plate",
    "slug": "anchor-modular-colour-cover-plate",
    "description": "Designer accent finish modular front plate",
    "long_description": "Scratch resistant, UV stabilized modular plate that blends seamlessly with modern wall finishes and textures.",
    "price": 4.5,
    "category": "Switches & Sockets",
    "brand": "Anchor",
    "image_url": "/images/anchor/colour-plate.png",
    "stock": 140,
    "specifications": {
      "Brand": "Anchor",
      "Material": "Polycarbonate",
      "Type": "Front Cover Plate"
    },
    "created_at": "2026-09-28T19:59:46.648Z",
    "updated_at": "2026-09-28T19:59:46.648Z"
  },
  {
    "id": "anchor-607",
    "name": "Anchor Advance 1.0 sqmm FR Wire (90m)",
    "slug": "anchor-advance-1-0-sqmm-fr-wire-90m",
    "description": "Flame retardant 1.0 sqmm electrical wire coil",
    "long_description": "100% electrolytic grade copper with 99.97% purity. 90m coil with superior fire retardant PVC insulation.",
    "price": 18,
    "category": "Cables & Wires",
    "brand": "Anchor",
    "image_url": "/images/anchor/wire (1).jpeg",
    "stock": 95,
    "specifications": {
      "Brand": "Anchor",
      "Gauge": "1.0 sqmm",
      "Length": "90m Coil",
      "Type": "FR Copper Wire"
    },
    "created_at": "2026-09-28T19:59:46.648Z",
    "updated_at": "2026-09-28T19:59:46.648Z"
  },
  {
    "id": "anchor-608",
    "name": "Anchor Advance Plus 1.5 sqmm House Wire",
    "slug": "anchor-advance-plus-1-5-sqmm-house-wire",
    "description": "1.5 sqmm single core multi-strand building wire",
    "long_description": "Engineered for lighting and medium power load circuits. High oxygen index prevents spread of fire.",
    "price": 24.5,
    "category": "Cables & Wires",
    "brand": "Anchor",
    "image_url": "/images/anchor/wire (1).jpg",
    "stock": 120,
    "specifications": {
      "Brand": "Anchor",
      "Gauge": "1.5 sqmm",
      "Length": "90m Coil",
      "Type": "House Wire"
    },
    "created_at": "2026-09-28T19:59:46.648Z",
    "updated_at": "2026-09-28T19:59:46.648Z"
  },
  {
    "id": "anchor-609",
    "name": "Anchor Ziva 2.5 sqmm Flame Retardant Wire",
    "slug": "anchor-ziva-2-5-sqmm-flame-retardant-wire",
    "description": "2.5 sqmm power wire for sockets and air conditioners",
    "long_description": "Premium multi-strand copper wire rated for up to 22A continuous current. Heat resistant up to 85°C.",
    "price": 36,
    "category": "Cables & Wires",
    "brand": "Anchor",
    "image_url": "/images/anchor/wire (1).png",
    "stock": 85,
    "specifications": {
      "Brand": "Anchor",
      "Gauge": "2.5 sqmm",
      "Length": "90m Coil",
      "Type": "FR Wire"
    },
    "created_at": "2026-09-28T19:59:46.648Z",
    "updated_at": "2026-09-28T19:59:46.648Z"
  },
  {
    "id": "anchor-610",
    "name": "Anchor Heavy Duty 4.0 sqmm Power Cable",
    "slug": "anchor-heavy-duty-4-0-sqmm-power-cable",
    "description": "4.0 sqmm high capacity mains & inverter cable",
    "long_description": "Low electrical resistance for high load appliances such as main panel distribution, geysers, and EV chargers.",
    "price": 52,
    "category": "Cables & Wires",
    "brand": "Anchor",
    "image_url": "/images/anchor/wire (2).jpeg",
    "stock": 60,
    "specifications": {
      "Brand": "Anchor",
      "Gauge": "4.0 sqmm",
      "Length": "90m Coil",
      "Type": "Heavy Duty Cable"
    },
    "created_at": "2026-09-28T19:59:46.648Z",
    "updated_at": "2026-09-28T19:59:46.648Z"
  },
  {
    "id": "anchor-611",
    "name": "Anchor Industrial 6.0 sqmm Heavy Load Cable",
    "slug": "anchor-industrial-6-0-sqmm-heavy-load-cable",
    "description": "6.0 sqmm heavy industrial single core cable",
    "long_description": "Designed for sub-main power feeds, heavy motor loads, and industrial grade power boards with zero voltage drop.",
    "price": 78,
    "category": "Cables & Wires",
    "brand": "Anchor",
    "image_url": "/images/anchor/wire (2).jpg",
    "stock": 45,
    "specifications": {
      "Brand": "Anchor",
      "Gauge": "6.0 sqmm",
      "Length": "90m Coil",
      "Type": "Industrial Cable"
    },
    "created_at": "2026-09-28T19:59:46.648Z",
    "updated_at": "2026-09-28T19:59:46.648Z"
  },
  {
    "id": "anchor-612",
    "name": "Anchor Flexible 3-Core Submersible Cable",
    "slug": "anchor-flexible-3-core-submersible-cable",
    "description": "Waterproof 3-core flat submersible pump cable",
    "long_description": "Special grade PVC sheathed flexible flat cable resistant to water abrasion, moisture, and extreme temperature conditions.",
    "price": 65,
    "category": "Cables & Wires",
    "brand": "Anchor",
    "image_url": "/images/anchor/wire (3).jpg",
    "stock": 40,
    "specifications": {
      "Brand": "Anchor",
      "Type": "3-Core Flat Cable",
      "Use": "Submersible Pumps"
    },
    "created_at": "2026-09-28T19:59:46.648Z",
    "updated_at": "2026-09-28T19:59:46.648Z"
  },
  {
    "id": "anchor-613",
    "name": "Anchor Multi-Strand Heat Resistant Wire",
    "slug": "anchor-multi-strand-heat-resistant-wire",
    "description": "High heat resistant flexible wiring coil",
    "long_description": "HR-FRLSH (Heat Resistant Flame Retardant Low Smoke Halogen) copper cable for critical safety installations.",
    "price": 42,
    "category": "Cables & Wires",
    "brand": "Anchor",
    "image_url": "/images/anchor/wire (4).jpg",
    "stock": 70,
    "specifications": {
      "Brand": "Anchor",
      "Grade": "HR-FRLSH",
      "Length": "90m Coil",
      "Type": "Safety Wire"
    },
    "created_at": "2026-09-28T19:59:46.648Z",
    "updated_at": "2026-09-28T19:59:46.648Z"
  },
  {
    "id": "anchor-614",
    "name": "Anchor Armoured Mains Power Cable",
    "slug": "anchor-armoured-mains-power-cable",
    "description": "Armoured underground electrical service cable",
    "long_description": "Steel wire armoured cable providing maximum mechanical protection for underground and outdoor distribution networks.",
    "price": 95,
    "category": "Cables & Wires",
    "brand": "Anchor",
    "image_url": "/images/anchor/wire.png",
    "stock": 35,
    "specifications": {
      "Brand": "Anchor",
      "Type": "Armoured Power Cable",
      "Use": "Main Incoming Line"
    },
    "created_at": "2026-09-28T19:59:46.648Z",
    "updated_at": "2026-09-28T19:59:46.648Z"
  },

  // New integrated products from image scanner
  {
    "id": "prd-anchor-2000",
    "name": "Anchor FR Wire 1.5 sqmm",
    "slug": "anchor-wire-0",
    "description": "Flame retardant electrical wire, ISI certified",
    "long_description": "Authentic Anchor product. Flame retardant electrical wire, ISI certified. Suitable for residential and commercial installations.",
    "price": 3.94,
    "category": "Cables & Wires",
    "brand": "Anchor",
    "image_url": "/images/anchor wires and cables/images (2).jfif",
    "stock": 146,
    "specifications": {
      "Brand": "Anchor",
      "Category": "Cables & Wires",
      "Gauge": "4.0 sqmm",
      "Length": "90m",
      "Type": "FR Wire"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-anchor-2001",
    "name": "Anchor FR Wire 2.5 sqmm",
    "slug": "anchor-wire-1-imn",
    "description": "Flame retardant electrical wire, ISI certified",
    "long_description": "Authentic Anchor product. Flame retardant electrical wire, ISI certified. Suitable for residential and commercial installations.",
    "price": 4.49,
    "category": "Cables & Wires",
    "brand": "Anchor",
    "image_url": "/images/anchor wires and cables/images (3).jfif",
    "stock": 126,
    "specifications": {
      "Brand": "Anchor",
      "Category": "Cables & Wires",
      "Gauge": "1.0 sqmm",
      "Length": "90m",
      "Type": "FR Wire"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-anchor-2002",
    "name": "Anchor FR Wire 4.0 sqmm",
    "slug": "anchor-wire-2",
    "description": "Flame retardant electrical wire, ISI certified",
    "long_description": "Authentic Anchor product. Flame retardant electrical wire, ISI certified. Suitable for residential and commercial installations.",
    "price": 4.45,
    "category": "Cables & Wires",
    "brand": "Anchor",
    "image_url": "/images/anchor wires and cables/images.jfif",
    "stock": 115,
    "specifications": {
      "Brand": "Anchor",
      "Category": "Cables & Wires",
      "Gauge": "4.0 sqmm",
      "Length": "90m",
      "Type": "FR Wire"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2000",
    "name": "Havells FR Wire 1.5 sqmm",
    "slug": "havells-wire-0-eqi",
    "description": "Flame retardant electrical wire, ISI certified",
    "long_description": "Authentic Havells product. Flame retardant electrical wire, ISI certified. Suitable for residential and commercial installations.",
    "price": 6.42,
    "category": "Cables & Wires",
    "brand": "Havells",
    "image_url": "/images/havells wires and cables/images (2).jfif",
    "stock": 59,
    "specifications": {
      "Brand": "Havells",
      "Category": "Cables & Wires",
      "Gauge": "1.0 sqmm",
      "Length": "90m",
      "Type": "FR Wire"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2001",
    "name": "Havells FR Wire 2.5 sqmm",
    "slug": "havells-wire-1-96a",
    "description": "Flame retardant electrical wire, ISI certified",
    "long_description": "Authentic Havells product. Flame retardant electrical wire, ISI certified. Suitable for residential and commercial installations.",
    "price": 4.44,
    "category": "Cables & Wires",
    "brand": "Havells",
    "image_url": "/images/havells wires and cables/images (3).jfif",
    "stock": 44,
    "specifications": {
      "Brand": "Havells",
      "Category": "Cables & Wires",
      "Gauge": "1.0 sqmm",
      "Length": "90m",
      "Type": "FR Wire"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2002",
    "name": "Havells FR Wire 4.0 sqmm",
    "slug": "havells-wire-2-nvn",
    "description": "Flame retardant electrical wire, ISI certified",
    "long_description": "Authentic Havells product. Flame retardant electrical wire, ISI certified. Suitable for residential and commercial installations.",
    "price": 6.26,
    "category": "Cables & Wires",
    "brand": "Havells",
    "image_url": "/images/havells wires and cables/images (4).jfif",
    "stock": 115,
    "specifications": {
      "Brand": "Havells",
      "Category": "Cables & Wires",
      "Gauge": "4.0 sqmm",
      "Length": "90m",
      "Type": "FR Wire"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2003",
    "name": "Havells HRFR Cable",
    "slug": "havells-wire-3",
    "description": "Flame retardant electrical wire, ISI certified",
    "long_description": "Authentic Havells product. Flame retardant electrical wire, ISI certified. Suitable for residential and commercial installations.",
    "price": 4.98,
    "category": "Cables & Wires",
    "brand": "Havells",
    "image_url": "/images/havells wires and cables/images (5).jfif",
    "stock": 41,
    "specifications": {
      "Brand": "Havells",
      "Category": "Cables & Wires",
      "Gauge": "4.0 sqmm",
      "Length": "90m",
      "Type": "FR Wire"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2004",
    "name": "Havells Flexible Wire",
    "slug": "havells-wire-4",
    "description": "Flame retardant electrical wire, ISI certified",
    "long_description": "Authentic Havells product. Flame retardant electrical wire, ISI certified. Suitable for residential and commercial installations.",
    "price": 5.47,
    "category": "Cables & Wires",
    "brand": "Havells",
    "image_url": "/images/havells wires and cables/images (6).jfif",
    "stock": 112,
    "specifications": {
      "Brand": "Havells",
      "Category": "Cables & Wires",
      "Gauge": "1.0 sqmm",
      "Length": "90m",
      "Type": "FR Wire"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2005",
    "name": "Havells Multicore Cable",
    "slug": "havells-wire-5",
    "description": "Flame retardant electrical wire, ISI certified",
    "long_description": "Authentic Havells product. Flame retardant electrical wire, ISI certified. Suitable for residential and commercial installations.",
    "price": 5.44,
    "category": "Cables & Wires",
    "brand": "Havells",
    "image_url": "/images/havells wires and cables/images (7).jfif",
    "stock": 69,
    "specifications": {
      "Brand": "Havells",
      "Category": "Cables & Wires",
      "Gauge": "4.0 sqmm",
      "Length": "90m",
      "Type": "FR Wire"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2006",
    "name": "Havells FR Wire 1.5 sqmm",
    "slug": "havells-wire-6",
    "description": "Flame retardant electrical wire, ISI certified",
    "long_description": "Authentic Havells product. Flame retardant electrical wire, ISI certified. Suitable for residential and commercial installations.",
    "price": 5.9,
    "category": "Cables & Wires",
    "brand": "Havells",
    "image_url": "/images/havells wires and cables/images (8).jfif",
    "stock": 139,
    "specifications": {
      "Brand": "Havells",
      "Category": "Cables & Wires",
      "Gauge": "6.0 sqmm",
      "Length": "90m",
      "Type": "FR Wire"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2007",
    "name": "Havells FR Wire 2.5 sqmm",
    "slug": "havells-wire-7",
    "description": "Flame retardant electrical wire, ISI certified",
    "long_description": "Authentic Havells product. Flame retardant electrical wire, ISI certified. Suitable for residential and commercial installations.",
    "price": 4.81,
    "category": "Cables & Wires",
    "brand": "Havells",
    "image_url": "/images/havells wires and cables/images.jfif",
    "stock": 116,
    "specifications": {
      "Brand": "Havells",
      "Category": "Cables & Wires",
      "Gauge": "4.0 sqmm",
      "Length": "90m",
      "Type": "FR Wire"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2008",
    "name": "Havells FR Wire 4.0 sqmm",
    "slug": "havells-wire-8",
    "description": "Flame retardant electrical wire, ISI certified",
    "long_description": "Authentic Havells product. Flame retardant electrical wire, ISI certified. Suitable for residential and commercial installations.",
    "price": 6.51,
    "category": "Cables & Wires",
    "brand": "Havells",
    "image_url": "/images/havells wires and cables/images.png",
    "stock": 54,
    "specifications": {
      "Brand": "Havells",
      "Category": "Cables & Wires",
      "Gauge": "4.0 sqmm",
      "Length": "90m",
      "Type": "FR Wire"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2009",
    "name": "Havells Bell Push",
    "slug": "havells-switch-9",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 2.97,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images (1).jfif",
    "stock": 154,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "10A",
      "Type": "Modular"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2010",
    "name": "Havells 16A Socket",
    "slug": "havells-switch-10",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 3.59,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images (10).jfif",
    "stock": 159,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "10A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2011",
    "name": "Havells 6A Switch",
    "slug": "havells-switch-11",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 3.68,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images (11).jfif",
    "stock": 152,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2012",
    "name": "Havells Dimmer Switch",
    "slug": "havells-switch-12",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 3.57,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images (12).jfif",
    "stock": 83,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "6A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2013",
    "name": "Havells USB Socket",
    "slug": "havells-switch-13",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 4.07,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images (13).jfif",
    "stock": 200,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "6A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2014",
    "name": "Havells Modular Switch",
    "slug": "havells-switch-14",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 4.13,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images (14).jfif",
    "stock": 88,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2015",
    "name": "Havells Flat Switch",
    "slug": "havells-switch-15",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 2.97,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images (15).jfif",
    "stock": 169,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2016",
    "name": "Havells Bell Push",
    "slug": "havells-switch-16",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 2.89,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images (2).jfif",
    "stock": 110,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2017",
    "name": "Havells 16A Socket",
    "slug": "havells-switch-17",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 3.66,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images (3).jfif",
    "stock": 139,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2018",
    "name": "Havells 6A Switch",
    "slug": "havells-switch-18",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 2.84,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images (4).jfif",
    "stock": 184,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "10A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2019",
    "name": "Havells Dimmer Switch",
    "slug": "havells-switch-19",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 4.54,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images (5).jfif",
    "stock": 142,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2020",
    "name": "Havells USB Socket",
    "slug": "havells-switch-20",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 4.28,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images (6).jfif",
    "stock": 222,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "6A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2021",
    "name": "Havells Modular Switch",
    "slug": "havells-switch-21",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 3.83,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images (7).jfif",
    "stock": 106,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2022",
    "name": "Havells Flat Switch",
    "slug": "havells-switch-22",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 3.17,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images (8).jfif",
    "stock": 178,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "10A",
      "Type": "Modular"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2023",
    "name": "Havells Bell Push",
    "slug": "havells-switch-23",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 3.6,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images (9).jfif",
    "stock": 182,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "10A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2024",
    "name": "Havells 16A Socket",
    "slug": "havells-switch-24",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 3.55,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/images.jfif",
    "stock": 144,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2025",
    "name": "Havells 6A Switch",
    "slug": "havells-switch-25",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 4.23,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/schneider electrics/6-a-schneider-unica-pure-modul-20260407004713100.webp",
    "stock": 149,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Modular"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2026",
    "name": "Havells Dimmer Switch",
    "slug": "havells-switch-26",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 3.1,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/schneider electrics/6a-schneider-unica-pure-modula-20260127190551313.webp",
    "stock": 114,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2027",
    "name": "Havells USB Socket",
    "slug": "havells-switch-27",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 2.87,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/schneider electrics/96157933_3564178430265850_580540060701556736_n.webp",
    "stock": 221,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "10A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2028",
    "name": "Havells Modular Switch",
    "slug": "havells-switch-28",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 3.36,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/schneider electrics/images (1).jfif",
    "stock": 115,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2029",
    "name": "Havells Flat Switch",
    "slug": "havells-switch-29",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 2.85,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/schneider electrics/images (2).jfif",
    "stock": 136,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "6A",
      "Type": "Modular"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2030",
    "name": "Havells Bell Push",
    "slug": "havells-switch-30",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 3.83,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/schneider electrics/images (3).jfif",
    "stock": 142,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Modular"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2031",
    "name": "Havells 16A Socket",
    "slug": "havells-switch-31",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 4.22,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/schneider electrics/images (4).jfif",
    "stock": 73,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2032",
    "name": "Havells 6A Switch",
    "slug": "havells-switch-32",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 3.92,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/schneider electrics/images (5).jfif",
    "stock": 104,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "10A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2033",
    "name": "Havells Dimmer Switch",
    "slug": "havells-switch-33",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 3.27,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/schneider electrics/images (6).jfif",
    "stock": 89,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "10A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2034",
    "name": "Havells USB Socket",
    "slug": "havells-switch-34",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 4.1,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/schneider electrics/images.jfif",
    "stock": 230,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "10A",
      "Type": "Modular"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2035",
    "name": "Havells Modular Switch",
    "slug": "havells-switch-35",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 4.44,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/schneider electrics/product-jpeg.jfif",
    "stock": 72,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "6A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2036",
    "name": "Havells Flat Switch",
    "slug": "havells-switch-36",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 3.07,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/schneider electrics/product-jpeg.jpg",
    "stock": 80,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "6A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2037",
    "name": "Havells Bell Push",
    "slug": "havells-switch-37",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 3.04,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/schneider electrics/schneider electrics.webp",
    "stock": 162,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "6A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-havells-2038",
    "name": "Havells 16A Socket",
    "slug": "havells-switch-38",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Havells product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 4.3,
    "category": "Switches & Sockets",
    "brand": "Havells",
    "image_url": "/images/havells1/schneider electrics/schneider-unica-pure-modular-switch.jpeg",
    "stock": 139,
    "specifications": {
      "Brand": "Havells",
      "Category": "Switches & Sockets",
      "Rating": "6A",
      "Type": "Modular"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-home-theat-2000",
    "name": "Home Theatre 5.1 Speaker System",
    "slug": "home-theatre-audio-0",
    "description": "High-fidelity audio equipment",
    "long_description": "Authentic Home Theatre product. High-fidelity audio equipment. Suitable for residential and commercial installations.",
    "price": 154.74,
    "category": "Home Theatre & Audio",
    "brand": "Home Theatre",
    "image_url": "/images/Home theater/1200Wx1200H_39d6a9f7-df0a-4d8c-b6d4-70d31fe15919_1200x630.webp",
    "stock": 9,
    "specifications": {
      "Brand": "Home Theatre",
      "Category": "Home Theatre & Audio",
      "Type": "Receiver"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-home-theat-2001",
    "name": "Home Theatre Soundbar",
    "slug": "home-theatre-audio-1",
    "description": "High-fidelity audio equipment",
    "long_description": "Authentic Home Theatre product. High-fidelity audio equipment. Suitable for residential and commercial installations.",
    "price": 162.22,
    "category": "Home Theatre & Audio",
    "brand": "Home Theatre",
    "image_url": "/images/Home theater/focal-sopra-no3-home-cinema-7-1-speaker-package-500x500.webp",
    "stock": 22,
    "specifications": {
      "Brand": "Home Theatre",
      "Category": "Home Theatre & Audio",
      "Type": "Amplifier"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-home-theat-2002",
    "name": "Home Theatre AV Receiver",
    "slug": "home-theatre-audio-2",
    "description": "High-fidelity audio equipment",
    "long_description": "Authentic Home Theatre product. High-fidelity audio equipment. Suitable for residential and commercial installations.",
    "price": 148.63,
    "category": "Home Theatre & Audio",
    "brand": "Home Theatre",
    "image_url": "/images/Home theater/images (1).jfif",
    "stock": 6,
    "specifications": {
      "Brand": "Home Theatre",
      "Category": "Home Theatre & Audio",
      "Type": "Subwoofer"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-home-theat-2003",
    "name": "Home Theatre Floorstanding Speaker",
    "slug": "home-theatre-audio-3",
    "description": "High-fidelity audio equipment",
    "long_description": "Authentic Home Theatre product. High-fidelity audio equipment. Suitable for residential and commercial installations.",
    "price": 138.29,
    "category": "Home Theatre & Audio",
    "brand": "Home Theatre",
    "image_url": "/images/Home theater/images (2).jfif",
    "stock": 19,
    "specifications": {
      "Brand": "Home Theatre",
      "Category": "Home Theatre & Audio",
      "Type": "Amplifier"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-home-theat-2004",
    "name": "Home Theatre Subwoofer",
    "slug": "home-theatre-audio-4",
    "description": "High-fidelity audio equipment",
    "long_description": "Authentic Home Theatre product. High-fidelity audio equipment. Suitable for residential and commercial installations.",
    "price": 136.31,
    "category": "Home Theatre & Audio",
    "brand": "Home Theatre",
    "image_url": "/images/Home theater/images (3).jfif",
    "stock": 30,
    "specifications": {
      "Brand": "Home Theatre",
      "Category": "Home Theatre & Audio",
      "Type": "Receiver"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-home-theat-2005",
    "name": "Home Theatre In-Ceiling Speaker",
    "slug": "home-theatre-audio-5",
    "description": "High-fidelity audio equipment",
    "long_description": "Authentic Home Theatre product. High-fidelity audio equipment. Suitable for residential and commercial installations.",
    "price": 161.9,
    "category": "Home Theatre & Audio",
    "brand": "Home Theatre",
    "image_url": "/images/Home theater/images (4).jfif",
    "stock": 20,
    "specifications": {
      "Brand": "Home Theatre",
      "Category": "Home Theatre & Audio",
      "Type": "Receiver"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-home-theat-2006",
    "name": "Home Theatre 5.1 Speaker System",
    "slug": "home-theatre-audio-6",
    "description": "High-fidelity audio equipment",
    "long_description": "Authentic Home Theatre product. High-fidelity audio equipment. Suitable for residential and commercial installations.",
    "price": 157.96,
    "category": "Home Theatre & Audio",
    "brand": "Home Theatre",
    "image_url": "/images/Home theater/images (5).jfif",
    "stock": 25,
    "specifications": {
      "Brand": "Home Theatre",
      "Category": "Home Theatre & Audio",
      "Type": "Receiver"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-home-theat-2007",
    "name": "Home Theatre Soundbar",
    "slug": "home-theatre-audio-7",
    "description": "High-fidelity audio equipment",
    "long_description": "Authentic Home Theatre product. High-fidelity audio equipment. Suitable for residential and commercial installations.",
    "price": 160.99,
    "category": "Home Theatre & Audio",
    "brand": "Home Theatre",
    "image_url": "/images/Home theater/images.jfif",
    "stock": 7,
    "specifications": {
      "Brand": "Home Theatre",
      "Category": "Home Theatre & Audio",
      "Type": "Amplifier"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-home-theat-2008",
    "name": "Home Theatre AV Receiver",
    "slug": "home-theatre-audio-8",
    "description": "High-fidelity audio equipment",
    "long_description": "Authentic Home Theatre product. High-fidelity audio equipment. Suitable for residential and commercial installations.",
    "price": 142.83,
    "category": "Home Theatre & Audio",
    "brand": "Home Theatre",
    "image_url": "/images/Home theater/klipsch-reference-5-2-home-theater-system-620.jpg",
    "stock": 27,
    "specifications": {
      "Brand": "Home Theatre",
      "Category": "Home Theatre & Audio",
      "Type": "Receiver"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-luker-2000",
    "name": "Luker Smart Door Lock",
    "slug": "luker-smart-0",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 6.37,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (1).jfif",
    "stock": 53,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "LED Light",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-luker-2001",
    "name": "Luker LED Panel Light",
    "slug": "luker-smart-1",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.22,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (10).jfif",
    "stock": 36,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "WiFi"
    },
    "created_at": "2026-09-28T19:59:46.657Z",
    "updated_at": "2026-09-28T19:59:46.657Z"
  },
  {
    "id": "prd-luker-2002",
    "name": "Luker Smart Ceiling Fan",
    "slug": "luker-smart-2",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.36,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (11).jfif",
    "stock": 60,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2003",
    "name": "Luker Smart LED Bulb",
    "slug": "luker-smart-3",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.14,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (12).jfif",
    "stock": 76,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "LED Light",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2004",
    "name": "Luker Motion Sensor",
    "slug": "luker-smart-4",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 4.3,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (13).jfif",
    "stock": 51,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "LED Light",
      "Connectivity": "WiFi"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2005",
    "name": "Luker Smart Controller",
    "slug": "luker-smart-5",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.18,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (14).jfif",
    "stock": 28,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2006",
    "name": "Luker Smart Door Lock",
    "slug": "luker-smart-6",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.49,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (15).jfif",
    "stock": 46,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "WiFi"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2007",
    "name": "Luker LED Panel Light",
    "slug": "luker-smart-7",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.22,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (16).jfif",
    "stock": 78,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2008",
    "name": "Luker Smart Ceiling Fan",
    "slug": "luker-smart-8",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.42,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (17).jfif",
    "stock": 94,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "LED Light",
      "Connectivity": "WiFi"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2009",
    "name": "Luker Smart LED Bulb",
    "slug": "luker-smart-9",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.94,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (18).jfif",
    "stock": 78,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "WiFi"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2010",
    "name": "Luker Motion Sensor",
    "slug": "luker-smart-10",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.08,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (19).jfif",
    "stock": 91,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2011",
    "name": "Luker Smart Controller",
    "slug": "luker-smart-11",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 6.08,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (2).jfif",
    "stock": 77,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "LED Light",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2012",
    "name": "Luker Smart Door Lock",
    "slug": "luker-smart-12",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 6.29,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (20).jfif",
    "stock": 32,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2013",
    "name": "Luker LED Panel Light",
    "slug": "luker-smart-13",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 4.17,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (21).jfif",
    "stock": 25,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "LED Light",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2014",
    "name": "Luker Smart Ceiling Fan",
    "slug": "luker-smart-14",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 6.04,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (22).jfif",
    "stock": 48,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2015",
    "name": "Luker Smart LED Bulb",
    "slug": "luker-smart-15",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.87,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (23).jfif",
    "stock": 69,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2016",
    "name": "Luker Motion Sensor",
    "slug": "luker-smart-16",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 4.7,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (24).jfif",
    "stock": 90,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "WiFi"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2017",
    "name": "Luker Smart Controller",
    "slug": "luker-smart-17",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 6.08,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (25).jfif",
    "stock": 66,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2018",
    "name": "Luker Smart Door Lock",
    "slug": "luker-smart-18",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.66,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (26).jfif",
    "stock": 46,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2019",
    "name": "Luker LED Panel Light",
    "slug": "luker-smart-19",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 6.28,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (27).jfif",
    "stock": 51,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2020",
    "name": "Luker Smart Ceiling Fan",
    "slug": "luker-smart-20",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 6.1,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (28).jfif",
    "stock": 51,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2021",
    "name": "Luker Smart LED Bulb",
    "slug": "luker-smart-21",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 4.66,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (29).jfif",
    "stock": 21,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2022",
    "name": "Luker Motion Sensor",
    "slug": "luker-smart-22",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.14,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (3).jfif",
    "stock": 91,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2023",
    "name": "Luker Smart Controller",
    "slug": "luker-smart-23",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 6,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (30).jfif",
    "stock": 24,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2024",
    "name": "Luker Smart Door Lock",
    "slug": "luker-smart-24",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.78,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (31).jfif",
    "stock": 72,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2025",
    "name": "Luker LED Panel Light",
    "slug": "luker-smart-25",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.76,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (32).jfif",
    "stock": 65,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2026",
    "name": "Luker Smart Ceiling Fan",
    "slug": "luker-smart-26",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.28,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (33).jfif",
    "stock": 27,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "WiFi"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2027",
    "name": "Luker Smart LED Bulb",
    "slug": "luker-smart-27",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.92,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (34).jfif",
    "stock": 43,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2028",
    "name": "Luker Motion Sensor",
    "slug": "luker-smart-28",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 6,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (35).jfif",
    "stock": 82,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "WiFi"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2029",
    "name": "Luker Smart Controller",
    "slug": "luker-smart-29",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.09,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (36).jfif",
    "stock": 37,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2030",
    "name": "Luker Smart Door Lock",
    "slug": "luker-smart-30",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 4.11,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (37).jfif",
    "stock": 74,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2031",
    "name": "Luker LED Panel Light",
    "slug": "luker-smart-31",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 6.38,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (38).jfif",
    "stock": 52,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2032",
    "name": "Luker Smart Ceiling Fan",
    "slug": "luker-smart-32",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 6.34,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (39).jfif",
    "stock": 71,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "WiFi"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2033",
    "name": "Luker Smart LED Bulb",
    "slug": "luker-smart-33",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 4.18,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (4).jfif",
    "stock": 20,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2034",
    "name": "Luker Motion Sensor",
    "slug": "luker-smart-34",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 4.79,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (5).jfif",
    "stock": 30,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "LED Light",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2035",
    "name": "Luker Smart Controller",
    "slug": "luker-smart-35",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 4.16,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (6).jfif",
    "stock": 45,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "WiFi"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2036",
    "name": "Luker Smart Door Lock",
    "slug": "luker-smart-36",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 4.05,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (7).jfif",
    "stock": 77,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "WiFi"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2037",
    "name": "Luker LED Panel Light",
    "slug": "luker-smart-37",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 5.55,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (8).jfif",
    "stock": 29,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2038",
    "name": "Luker Smart Ceiling Fan",
    "slug": "luker-smart-38",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 4.12,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images (9).jfif",
    "stock": 35,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-luker-2039",
    "name": "Luker Smart LED Bulb",
    "slug": "luker-smart-39",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Luker product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 6.36,
    "category": "Smart Home",
    "brand": "Luker",
    "image_url": "/images/luker fans,lights,smart locker/images.jfif",
    "stock": 86,
    "specifications": {
      "Brand": "Luker",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-schneider--2000",
    "name": "Schneider Electric Modular Switch",
    "slug": "schneider-electric-switch-0",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Schneider Electric product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 5.84,
    "category": "Switches & Sockets",
    "brand": "Schneider Electric",
    "image_url": "/images/schneider electrics/6a-schneider-unica-pure-modula-20260127190551313.webp",
    "stock": 72,
    "specifications": {
      "Brand": "Schneider Electric",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-schneider--2001",
    "name": "Schneider Electric Flat Switch",
    "slug": "schneider-electric-switch-1",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Schneider Electric product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 5.05,
    "category": "Switches & Sockets",
    "brand": "Schneider Electric",
    "image_url": "/images/schneider electrics/96157933_3564178430265850_580540060701556736_n.webp",
    "stock": 132,
    "specifications": {
      "Brand": "Schneider Electric",
      "Category": "Switches & Sockets",
      "Rating": "6A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-schneider--2002",
    "name": "Schneider Electric Bell Push",
    "slug": "schneider-electric-switch-2",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Schneider Electric product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 4.1,
    "category": "Switches & Sockets",
    "brand": "Schneider Electric",
    "image_url": "/images/schneider electrics/images (1).jfif",
    "stock": 113,
    "specifications": {
      "Brand": "Schneider Electric",
      "Category": "Switches & Sockets",
      "Rating": "10A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-schneider--2003",
    "name": "Schneider Electric 16A Socket",
    "slug": "schneider-electric-switch-3",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Schneider Electric product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 5.91,
    "category": "Switches & Sockets",
    "brand": "Schneider Electric",
    "image_url": "/images/schneider electrics/images (2).jfif",
    "stock": 75,
    "specifications": {
      "Brand": "Schneider Electric",
      "Category": "Switches & Sockets",
      "Rating": "10A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-schneider--2004",
    "name": "Schneider Electric 6A Switch",
    "slug": "schneider-electric-switch-4",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Schneider Electric product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 5.34,
    "category": "Switches & Sockets",
    "brand": "Schneider Electric",
    "image_url": "/images/schneider electrics/images (3).jfif",
    "stock": 175,
    "specifications": {
      "Brand": "Schneider Electric",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-schneider--2005",
    "name": "Schneider Electric Dimmer Switch",
    "slug": "schneider-electric-switch-5",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Schneider Electric product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 4.94,
    "category": "Switches & Sockets",
    "brand": "Schneider Electric",
    "image_url": "/images/schneider electrics/images (4).jfif",
    "stock": 171,
    "specifications": {
      "Brand": "Schneider Electric",
      "Category": "Switches & Sockets",
      "Rating": "10A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-schneider--2006",
    "name": "Schneider Electric USB Socket",
    "slug": "schneider-electric-switch-6",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Schneider Electric product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 5.17,
    "category": "Switches & Sockets",
    "brand": "Schneider Electric",
    "image_url": "/images/schneider electrics/images (5).jfif",
    "stock": 58,
    "specifications": {
      "Brand": "Schneider Electric",
      "Category": "Switches & Sockets",
      "Rating": "10A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-schneider--2007",
    "name": "Schneider Electric Modular Switch",
    "slug": "schneider-electric-switch-7",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Schneider Electric product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 4.26,
    "category": "Switches & Sockets",
    "brand": "Schneider Electric",
    "image_url": "/images/schneider electrics/images (6).jfif",
    "stock": 131,
    "specifications": {
      "Brand": "Schneider Electric",
      "Category": "Switches & Sockets",
      "Rating": "6A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-schneider--2008",
    "name": "Schneider Electric Flat Switch",
    "slug": "schneider-electric-switch-8",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Schneider Electric product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 4.89,
    "category": "Switches & Sockets",
    "brand": "Schneider Electric",
    "image_url": "/images/schneider electrics/images.jfif",
    "stock": 165,
    "specifications": {
      "Brand": "Schneider Electric",
      "Category": "Switches & Sockets",
      "Rating": "10A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-schneider--2009",
    "name": "Schneider Electric Bell Push",
    "slug": "schneider-electric-switch-9",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Schneider Electric product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 6.29,
    "category": "Switches & Sockets",
    "brand": "Schneider Electric",
    "image_url": "/images/schneider electrics/product-jpeg.jfif",
    "stock": 136,
    "specifications": {
      "Brand": "Schneider Electric",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-schneider--2010",
    "name": "Schneider Electric 16A Socket",
    "slug": "schneider-electric-switch-10",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Schneider Electric product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 5.03,
    "category": "Switches & Sockets",
    "brand": "Schneider Electric",
    "image_url": "/images/schneider electrics/product-jpeg.jpg",
    "stock": 217,
    "specifications": {
      "Brand": "Schneider Electric",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Modular"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-schneider--2011",
    "name": "Schneider Electric 6A Switch",
    "slug": "schneider-electric-switch-11",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Schneider Electric product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 5.38,
    "category": "Switches & Sockets",
    "brand": "Schneider Electric",
    "image_url": "/images/schneider electrics/schneider electrics.webp",
    "stock": 142,
    "specifications": {
      "Brand": "Schneider Electric",
      "Category": "Switches & Sockets",
      "Rating": "10A",
      "Type": "Piano"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-schneider--2012",
    "name": "Schneider Electric Dimmer Switch",
    "slug": "schneider-electric-switch-12",
    "description": "Premium modular switch for modern interiors",
    "long_description": "Authentic Schneider Electric product. Premium modular switch for modern interiors. Suitable for residential and commercial installations.",
    "price": 5.88,
    "category": "Switches & Sockets",
    "brand": "Schneider Electric",
    "image_url": "/images/schneider electrics/schneider-unica-pure-modular-switch.jpeg",
    "stock": 104,
    "specifications": {
      "Brand": "Schneider Electric",
      "Category": "Switches & Sockets",
      "Rating": "16A",
      "Type": "Bell Push"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2000",
    "name": "Yale Smart Door Lock",
    "slug": "yale-smart-0",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 11.42,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (10).jfif",
    "stock": 54,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "LED Light",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2001",
    "name": "Yale LED Panel Light",
    "slug": "yale-smart-1",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 10.92,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (11).jfif",
    "stock": 35,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2002",
    "name": "Yale Smart Ceiling Fan",
    "slug": "yale-smart-2",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 10.65,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (12).jfif",
    "stock": 99,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2003",
    "name": "Yale Smart LED Bulb",
    "slug": "yale-smart-3",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 12.68,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (13).jfif",
    "stock": 61,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2004",
    "name": "Yale Motion Sensor",
    "slug": "yale-smart-4",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 12.54,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (14).jfif",
    "stock": 72,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2005",
    "name": "Yale Smart Controller",
    "slug": "yale-smart-5",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 9.15,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (15).jfif",
    "stock": 76,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2006",
    "name": "Yale Smart Door Lock",
    "slug": "yale-smart-6",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 10.44,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (16).jfif",
    "stock": 74,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2007",
    "name": "Yale LED Panel Light",
    "slug": "yale-smart-7",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 9.11,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (17).jfif",
    "stock": 39,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2008",
    "name": "Yale Smart Ceiling Fan",
    "slug": "yale-smart-8",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 11.95,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (18).jfif",
    "stock": 41,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "LED Light",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2009",
    "name": "Yale Smart LED Bulb",
    "slug": "yale-smart-9",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 9.42,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (19).jfif",
    "stock": 46,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "LED Light",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2010",
    "name": "Yale Motion Sensor",
    "slug": "yale-smart-10",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 12.13,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (2).jfif",
    "stock": 49,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "WiFi"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2011",
    "name": "Yale Smart Controller",
    "slug": "yale-smart-11",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 11.98,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (20).jfif",
    "stock": 32,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2012",
    "name": "Yale Smart Door Lock",
    "slug": "yale-smart-12",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 10.42,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (21).jfif",
    "stock": 94,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "LED Light",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2013",
    "name": "Yale LED Panel Light",
    "slug": "yale-smart-13",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 12.11,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (22).jfif",
    "stock": 92,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2014",
    "name": "Yale Smart Ceiling Fan",
    "slug": "yale-smart-14",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 9.77,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (23).jfif",
    "stock": 21,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "LED Light",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2015",
    "name": "Yale Smart LED Bulb",
    "slug": "yale-smart-15",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 12.77,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (24).jfif",
    "stock": 95,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "WiFi"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2016",
    "name": "Yale Motion Sensor",
    "slug": "yale-smart-16",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 9.54,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (3).jfif",
    "stock": 30,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2017",
    "name": "Yale Smart Controller",
    "slug": "yale-smart-17",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 9.02,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (4).jfif",
    "stock": 36,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2018",
    "name": "Yale Smart Door Lock",
    "slug": "yale-smart-18",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 10.68,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (40).jfif",
    "stock": 71,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2019",
    "name": "Yale LED Panel Light",
    "slug": "yale-smart-19",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 12.28,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (5).jfif",
    "stock": 70,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2020",
    "name": "Yale Smart Ceiling Fan",
    "slug": "yale-smart-20",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 9.6,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (6).jfif",
    "stock": 57,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2021",
    "name": "Yale Smart LED Bulb",
    "slug": "yale-smart-21",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 12.86,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (7).jfif",
    "stock": 96,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Smart Lock",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2022",
    "name": "Yale Motion Sensor",
    "slug": "yale-smart-22",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 8.63,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (8).jfif",
    "stock": 76,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "LED Light",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2023",
    "name": "Yale Smart Controller",
    "slug": "yale-smart-23",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 9.53,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images (9).jfif",
    "stock": 63,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Ceiling Fan",
      "Connectivity": "Zigbee"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
  {
    "id": "prd-yale-2024",
    "name": "Yale Smart Door Lock",
    "slug": "yale-smart-24",
    "description": "Smart home device with WiFi connectivity",
    "long_description": "Authentic Yale product. Smart home device with WiFi connectivity. Suitable for residential and commercial installations.",
    "price": 12.54,
    "category": "Smart Home",
    "brand": "Yale",
    "image_url": "/images/yale fans,lights,smart locker/images.jfif",
    "stock": 53,
    "specifications": {
      "Brand": "Yale",
      "Category": "Smart Home",
      "Type": "Controller",
      "Connectivity": "Bluetooth"
    },
    "created_at": "2026-09-28T19:59:46.658Z",
    "updated_at": "2026-09-28T19:59:46.658Z"
  },
];
