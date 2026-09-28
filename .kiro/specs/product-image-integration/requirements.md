# Requirements Document

## Introduction

This document specifies the functional and non-functional requirements for integrating 228 product images across 7 electrical brands into the existing product catalog system. The integration systematically maps images to appropriate product categories, creates new product entries for underrepresented brands (Schneider Electric, Yale, Luker), and replaces placeholder images with authentic product photography.

The system processes images from `/public/images/` directory, generates valid Product entries conforming to the existing TypeScript schema, and updates data files (`lib/sample-data.ts` and `lib/expanded-products.ts`) while maintaining data integrity through backup and validation mechanisms.

## Requirements

### Functional Requirements

### FR-1: Image Directory Scanning
**Priority**: High  
**Description**: The system SHALL recursively scan the `/public/images/` directory and build a complete inventory of all available product images organized by brand.

**Acceptance Criteria**:
- AC-1.1: System scans all subdirectories within `/public/images/`
- AC-1.2: System identifies and categorizes images by brand based on folder structure
- AC-1.3: System extracts category hints from folder names (e.g., "wires and cables", "fans,lights")
- AC-1.4: System generates statistical summary showing image counts by brand and category
- AC-1.5: System filters files to include only valid image extensions: .jpg, .jpeg, .png, .webp, .jfif

### FR-2: Brand-to-Category Mapping
**Priority**: High  
**Description**: The system SHALL map each brand's image collection to one or more of the five canonical product categories.

**Acceptance Criteria**:
- AC-2.1: System applies pattern matching rules to infer category from folder names
- AC-2.2: Folder names containing "wire" or "cable" map to "Cables & Wires" category
- AC-2.3: Folder names containing "fan", "light", "smart", or "locker" map to "Smart Home" category
- AC-2.4: Folder names containing "theater" or "theatre" map to "Home Theatre & Audio" category
- AC-2.5: "schneider electrics" and "havells1" folders default to "Switches & Sockets" category
- AC-2.6: Ambiguous or unmatched folders default to "Switches & Sockets" category

### FR-3: Product Generation for Schneider Electric
**Priority**: High  
**Description**: The system SHALL create product entries for all 28 Schneider Electric images (14 in main folder + 14 in havells1 subfolder).

**Acceptance Criteria**:
- AC-3.1: System generates 28 unique products with brand "Schneider Electric"
- AC-3.2: All products are categorized as "Switches & Sockets"
- AC-3.3: Products use actual image paths from `/images/schneider electrics/` directory
- AC-3.4: Base price for Schneider products is $5.00 (premium tier)
- AC-3.5: Product names include descriptive terms: "Unica Pure Modular Switch", "Zencelo Switch", etc.
- AC-3.6: Stock levels range between 80-150 units per product

### FR-4: Product Generation for Yale Smart Home
**Priority**: High  
**Description**: The system SHALL create product entries for all 26 Yale smart home device images.

**Acceptance Criteria**:
- AC-4.1: System generates 26 unique products with brand "Yale"
- AC-4.2: All products are categorized as "Smart Home"
- AC-4.3: Products use actual image paths from `/images/yale fans,lights,smart locker/` directory
- AC-4.4: Base price for Yale products is $5.00 (premium tier)
- AC-4.5: Product names include device types: "Smart Door Lock", "Smart Light", "Smart Ceiling Fan"
- AC-4.6: Specifications include connectivity options: WiFi, Bluetooth, Zigbee

### FR-5: Product Generation for Luker Smart Home
**Priority**: High  
**Description**: The system SHALL create product entries for all 41 Luker smart home device images.

**Acceptance Criteria**:
- AC-5.1: System generates 41 unique products with brand "Luker"
- AC-5.2: All products are categorized as "Smart Home"
- AC-5.3: Products use actual image paths from `/images/luker fans,lights,smart locker/` directory
- AC-5.4: Base price for Luker products is $2.50 (standard tier)
- AC-5.5: Product names include device types: "LED Panel", "Ceiling Fan", "Smart Controller"
- AC-5.6: Stock levels range between 100-250 units per product (higher availability)

### FR-6: Product Generation for Home Theatre Equipment
**Priority**: Medium  
**Description**: The system SHALL create product entries for all 9 Home Theatre equipment images.

**Acceptance Criteria**:
- AC-6.1: System generates 9 unique products for Home Theatre category
- AC-6.2: All products are categorized as "Home Theatre & Audio"
- AC-6.3: Products use actual image paths from `/images/Home theater/` directory
- AC-6.4: Product names include equipment types: "Speaker System", "Projector", "AV Receiver"
- AC-6.5: Prices range from $500-$2000 reflecting high-end audio equipment
- AC-6.6: Brands are assigned based on image content or default to reputable brands

### FR-7: Product Updates for Havells
**Priority**: Medium  
**Description**: The system SHALL update existing Havells products with images from both havells folders and create new entries for unassigned images.

**Acceptance Criteria**:
- AC-7.1: System processes 16 images from `/images/havells1/` folder (switches category)
- AC-7.2: System processes 12 images from `/images/havells wires and cables/` folder
- AC-7.3: Existing Havells switch products are updated with images from havells1 folder
- AC-7.4: New cable/wire products are created for images in the wires folder
- AC-7.5: Cable products are categorized as "Cables & Wires"
- AC-7.6: Switch products retain "Switches & Sockets" category

### FR-8: Product Updates for Anchor
**Priority**: Medium  
**Description**: The system SHALL update existing Anchor products and create new entries for the 20 total images (16 switches + 4 wires).

**Acceptance Criteria**:
- AC-8.1: System processes 16 images from `/images/anchor/` folder
- AC-8.2: System processes 4 images from `/images/anchor wires and cables/` folder
- AC-8.3: Existing Anchor products with placeholder images are updated
- AC-8.4: New products are created for unassigned images
- AC-8.5: Wire images are categorized as "Cables & Wires"
- AC-8.6: Switch images are categorized as "Switches & Sockets"

### FR-9: Product Updates for Finolex
**Priority**: Medium  
**Description**: The system SHALL update existing Finolex products and create new entries for the 10 available images.

**Acceptance Criteria**:
- AC-9.1: System processes all 10 images from `/images/finolex/` folder
- AC-9.2: System infers category from image content (switches vs cables)
- AC-9.3: Existing Finolex products are updated where applicable
- AC-9.4: New products fill gaps in the catalog
- AC-9.5: Mixed-category products are correctly classified
- AC-9.6: Brand consistency is maintained across all Finolex products

### FR-10: Unique Product Identifier Generation
**Priority**: High  
**Description**: The system SHALL generate unique identifiers (ID and slug) for all new products.

**Acceptance Criteria**:
- AC-10.1: Product IDs follow pattern: `[brand-prefix]-[number]`
- AC-10.2: No two products have the same ID across the entire catalog
- AC-10.3: Product slugs are URL-safe (lowercase, hyphens only, no spaces)
- AC-10.4: Slugs follow pattern: `[brand]-[category-hint]-[index]`
- AC-10.5: System detects and resolves ID/slug collisions automatically
- AC-10.6: Generated IDs are deterministic for the same input parameters

### FR-11: Product Pricing Strategy
**Priority**: Medium  
**Description**: The system SHALL assign appropriate prices to products based on brand tier and category.

**Acceptance Criteria**:
- AC-11.1: Premium brands (Schneider, Legrand, Yale) have $5.00 base price
- AC-11.2: Mid-range brands (Panasonic, Havells, Norisys) have $3.50 base price
- AC-11.3: Standard brands (Finolex, Anchor, Kolors, Luker) have $2.50 base price
- AC-11.4: Budget brands (Hi-Fi) have $1.50 base price
- AC-11.5: Prices include category multipliers (cables 1.5x, smart home 2x, home theatre 50x)
- AC-11.6: Random variance of ±20-30% adds price diversity within same brand/category

### FR-12: Product Specification Generation
**Priority**: Medium  
**Description**: The system SHALL generate appropriate technical specifications for each product based on category.

**Acceptance Criteria**:
- AC-12.1: Switches include specifications: Rating (6A/10A/16A), Type (Modular/Piano/Bell Push)
- AC-12.2: Cables include specifications: Gauge (1.0-6.0 sqmm), Length (90m), Type (FR Wire)
- AC-12.3: Smart Home products include: Type (Smart Lock/LED/Fan), Connectivity (WiFi/Bluetooth/Zigbee)
- AC-12.4: Home Theatre products include: Type (Speaker/Projector/Receiver), specifications relevant to device
- AC-12.5: All products include Brand and Category in specifications
- AC-12.6: Specifications are stored as key-value pairs in specifications field

### FR-13: Data File Updates
**Priority**: High  
**Description**: The system SHALL update the product data files (sample-data.ts and expanded-products.ts) with new and updated products.

**Acceptance Criteria**:
- AC-13.1: System writes updated product array to `lib/sample-data.ts`
- AC-13.2: System preserves existing TypeScript imports and type annotations
- AC-13.3: System maintains proper formatting and code structure
- AC-13.4: System updates `lib/expanded-products.ts` with brand-specific products
- AC-13.5: System adds new brand sections for Schneider, Yale, Luker if not present
- AC-13.6: System preserves all existing products, only adding/updating as needed

### FR-14: Backup and Rollback
**Priority**: High  
**Description**: The system SHALL create backups before modifying data files and support rollback on errors.

**Acceptance Criteria**:
- AC-14.1: System creates timestamped backup before any file modification
- AC-14.2: Backups are stored in `.backup/` directory within project root
- AC-14.3: System automatically restores from backup if validation fails
- AC-14.4: System logs backup creation and restoration operations
- AC-14.5: Backups include both sample-data.ts and expanded-products.ts
- AC-14.6: Old backups are retained for manual recovery if needed

### FR-15: Output Validation
**Priority**: High  
**Description**: The system SHALL validate all generated products and updated data files before committing changes.

**Acceptance Criteria**:
- AC-15.1: System validates TypeScript syntax of output files
- AC-15.2: System checks all required Product interface fields are present
- AC-15.3: System verifies no duplicate IDs or slugs exist
- AC-15.4: System validates prices are positive numbers
- AC-15.5: System validates stock levels are non-negative integers
- AC-15.6: System validates image URLs start with `/images/` and reference existing files

## Non-Functional Requirements

### NFR-1: Performance
**Description**: The system SHALL complete the entire image integration process within acceptable time limits.

**Criteria**:
- Image scanning completes within 1 second for 250 images
- Product generation completes within 2 seconds for 100 products
- Data file writing completes within 3 seconds
- Total end-to-end process completes within 10 seconds

### NFR-2: Scalability
**Description**: The system SHALL handle growth in image inventory and product catalog size.

**Criteria**:
- Supports up to 1000 images without performance degradation
- Handles up to 500 products per brand
- Memory usage stays below 200MB during processing
- Can process 10+ brands simultaneously

### NFR-3: Reliability
**Description**: The system SHALL operate reliably with proper error handling and recovery.

**Criteria**:
- Zero data loss: backup and rollback mechanism prevents corruption
- Handles missing directories gracefully without crashing
- Skips invalid images and continues processing
- Provides clear error messages for all failure scenarios
- Atomic writes ensure data consistency

### NFR-4: Maintainability
**Description**: The system SHALL be maintainable with clear code structure and documentation.

**Criteria**:
- Code follows TypeScript best practices
- Functions have clear single responsibilities
- All public interfaces are documented with JSDoc comments
- Category mapping rules are externalized for easy updates
- Brand pricing tiers are configurable

### NFR-5: Usability
**Description**: The system SHALL provide clear feedback and progress information during execution.

**Criteria**:
- Displays progress messages during each phase
- Shows summary of actions taken (X products created, Y updated)
- Provides detailed logs for troubleshooting
- Reports skipped images with reasons
- Validation errors include specific field and reason

### NFR-6: Security
**Description**: The system SHALL prevent security vulnerabilities in file operations.

**Criteria**:
- Validates all file paths to prevent directory traversal attacks
- Rejects paths containing `..` or absolute paths outside project
- Validates image file extensions and sizes
- Uses atomic file writes to prevent corruption
- Logs all file modifications for audit trail

### NFR-7: Data Integrity
**Description**: The system SHALL maintain data consistency and integrity throughout operations.

**Criteria**:
- Product IDs remain unique across all operations
- Slugs remain unique and URL-safe
- Existing products are never accidentally deleted
- Timestamps are accurate ISO 8601 format
- Relationships between products and images remain consistent

### NFR-8: Compatibility
**Description**: The system SHALL work within the existing project technology stack.

**Criteria**:
- Uses only Node.js standard library (no new dependencies)
- Compatible with Next.js 14 project structure
- Works with existing TypeScript configuration
- Output files compile without errors
- Maintains compatibility with existing product schema

## Constraints

### C-1: Technology Stack
- MUST use TypeScript for all code
- MUST NOT introduce new npm dependencies
- MUST use Node.js fs/promises for file operations
- MUST maintain compatibility with Next.js 14

### C-2: Data Schema
- MUST conform to existing Product interface in `types/index.ts`
- MUST use one of five canonical categories
- MUST NOT modify the Product interface structure
- MUST preserve all existing product data

### C-3: File System
- MUST read images from `/public/images/` directory only
- MUST write to `lib/sample-data.ts` and `lib/expanded-products.ts` only
- MUST create backups in `.backup/` directory
- MUST NOT modify files outside project root

### C-4: Brand Coverage
- MUST process all 228 available images
- MUST create products for Schneider Electric (28 images)
- MUST create products for Yale (26 images)
- MUST create products for Luker (41 images)
- MUST update existing Havells, Anchor, Finolex products

### C-5: Category Distribution
- MUST use existing categories: Switches & Sockets, Cables & Wires, Smart Home, Home Theatre & Audio, MCB & DB
- MUST categorize based on folder naming patterns
- MUST provide default category for ambiguous cases
- MUST NOT create new categories

## Assumptions

### A-1: Image Quality
- Images are assumed to be properly formatted and not corrupted
- Image files are assumed to be product photographs (not logos or diagrams)
- Image dimensions are assumed to be suitable for web display

### A-2: Folder Structure
- Image folder structure follows brand/category organization
- Folder names provide reliable category hints
- All images in a folder belong to the indicated brand

### A-3: Existing Data
- Existing products in sample-data.ts are assumed to be valid
- Product IDs in existing data are assumed to be unique
- Existing data follows the Product interface schema

### A-4: System Environment
- Node.js runtime is available and functional
- File system has read/write permissions for project directories
- Sufficient disk space exists for backups

### A-5: Brand Information
- Brand names extracted from folders are accurate
- Brand tier classifications (premium/standard/budget) are appropriate
- Brand base prices reflect market positioning

## Dependencies

### Internal Dependencies
- `types/index.ts` - Product interface definition
- `lib/sample-data.ts` - Existing product catalog
- `lib/expanded-products.ts` - Brand-specific products
- `/public/images/` - Image files to integrate

### External Dependencies
- Node.js `fs/promises` module
- Node.js `path` module
- TypeScript compiler

### Data Dependencies
- Product catalog must be readable and valid TypeScript
- Image files must exist in specified locations
- Category mapping rules must be defined

## Success Metrics

### M-1: Image Coverage
- **Target**: 100% of available images (228) are assigned to products
- **Measurement**: Count of products with image_url from /images/ directory
- **Success**: All 228 images referenced in product catalog

### M-2: New Products Created
- **Target**: At least 95 new products for underrepresented brands
- **Measurement**: Difference between product count before and after
- **Success**: Schneider (28) + Yale (26) + Luker (41) = 95 minimum new products

### M-3: Data Quality
- **Target**: Zero validation errors in output files
- **Measurement**: TypeScript compilation success + Product validation checks
- **Success**: All products pass validation, files compile without errors

### M-4: Placeholder Reduction
- **Target**: Replace 80% of placeholder images (unsplash URLs, store-photos)
- **Measurement**: Count of products with /images/ path vs external URLs
- **Success**: At least 80% of products use real product images

### M-5: Processing Time
- **Target**: Complete integration in under 10 seconds
- **Measurement**: Elapsed time from start to finish
- **Success**: Total execution time < 10 seconds

### M-6: Category Distribution
- **Target**: All five categories have product representation
- **Measurement**: Count of products per category
- **Success**: Each category has at least 10 products

### M-7: Zero Data Loss
- **Target**: No existing products are deleted or corrupted
- **Measurement**: Pre/post product count comparison, ID verification
- **Success**: All existing product IDs present in output, no data corruption


## Glossary

| Term | Definition |
|------|------------|
| **Product** | An item in the catalog with properties: id, name, slug, price, category, brand, image_url, stock, specifications |
| **Category** | One of five canonical classifications: Switches & Sockets, Cables & Wires, Smart Home, Home Theatre & Audio, MCB & DB |
| **Brand** | Manufacturer/company name (e.g., Schneider Electric, Yale, Anchor, Finolex) |
| **Image URL** | Relative path to product image starting with `/images/` |
| **Slug** | URL-safe unique identifier derived from product name (lowercase, hyphens only) |
| **Brand Tier** | Classification of brands by market positioning: Premium ($5.00), Mid-Range ($3.50), Standard ($2.50), Budget ($1.50) |
| **Product Template** | Input data structure for generating new products: brand, category, imageUrl, basePrice, stockRange |
| **Placeholder Image** | Temporary image from external sources (unsplash.com) or generic store-photos folder |
| **FR Wire** | Flame Retardant electrical wire - common specification for cables |
| **ISI Certified** | Indian Standards Institution certification for electrical safety |
| **Modular Switch** | Modern switch design with replaceable components and standard mounting |
