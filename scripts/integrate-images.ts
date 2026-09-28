#!/usr/bin/env ts-node
/**
 * Image Integration Script
 * Scans /public/images and integrates into product catalog
 * ponytail: One script to rule them all
 */

import { join } from 'path';
import { ImageScanner } from '../lib/image-scanner';
import { CategoryMapper } from '../lib/category-mapper';
import { ProductGenerator } from '../lib/product-generator';
import { ProductValidator } from '../lib/product-validator';
import { SAMPLE_PRODUCTS } from '../lib/sample-data';
import { writeFile, readFile, mkdir } from 'fs/promises';
import type { Product } from '../types';

async function main() {
  console.log('🔍 Starting image integration...\n');

  // Step 1: Scan images
  console.log('📂 Scanning /public/images directory...');
  const scanner = new ImageScanner();
  const publicPath = join(process.cwd(), 'public', 'images');
  
  const inventory = await scanner.scanDirectory(publicPath);
  const stats = scanner.countImages();
  
  console.log(`✅ Found ${inventory.totalImages} images across ${inventory.brands.size} brands`);
  console.log('Brands:', Array.from(inventory.brands.keys()).join(', '));
  console.log();

  // Step 2: Map categories
  console.log('🗺️  Mapping brands to categories...');
  const mapper = new CategoryMapper();
  const categoryMappings = new Map();
  
  for (const [brand, images] of inventory.brands) {
    const mapping = mapper.mapBrandToCategory(brand, images.length);
    categoryMappings.set(brand, mapping);
    console.log(`  ${brand} → ${mapping.primaryCategory} (confidence: ${mapping.confidence})`);
  }
  console.log();

  // Step 3: Generate products
  console.log('🏭 Generating new products...');
  const generator = new ProductGenerator();
  generator.registerExistingProducts(SAMPLE_PRODUCTS);
  
  const newProducts: Product[] = [];
  const existingImagePaths = new Set(
    SAMPLE_PRODUCTS
      .map((product) => product.image_url)
      .filter((imagePath): imagePath is string => Boolean(imagePath))
  );
  const brandCounts: Record<string, number> = {};
  
  for (const [brand, images] of inventory.brands) {
    const mapping = categoryMappings.get(brand);
    if (!mapping) continue;
    
    const missingImages = images.filter((image) => !existingImagePaths.has(image.path));
    const newCount = missingImages.length;
    
    brandCounts[brand] = newCount;
    
    if (newCount > 0) {
      console.log(`  Creating ${newCount} products for ${brand}...`);
      
      for (let i = 0; i < missingImages.length; i++) {
        const image = missingImages[i];
        const category = (image.categoryHint as Product['category'] | null) || mapping.primaryCategory;
        const template = {
          brand,
          category,
          imageUrl: image.path,
          basePrice: generator.getBrandBasePrice(brand),
          stockRange: [50, 200] as [number, number],
        };
        
        const product = generator.generateProduct(template, i);
        newProducts.push(product);
        existingImagePaths.add(image.path);
      }
    }
  }
  
  console.log(`✅ Generated ${newProducts.length} new products`);
  console.log();

  // Step 4: Validate
  console.log('✔️  Validating products...');
  const validator = new ProductValidator();
  // Filter out products without images from SAMPLE_PRODUCTS (from EXPANDED_PRODUCTS)
  const validSampleProducts = Array.from(
    SAMPLE_PRODUCTS
      .filter((product) => product.image_url && product.image_url.length > 0)
      .reduce((products, product) => {
        const key = `${product.id}:${product.slug}`;
        if (!products.has(key)) products.set(key, product);
        return products;
      }, new Map<string, Product>())
      .values()
  );
  const allProducts = [...validSampleProducts, ...newProducts];
  const validation = validator.validateProductArray(allProducts);
  
  if (!validation.isValid) {
    console.error('❌ Validation failed:');
    validation.errors.forEach(err => console.error(`  - ${err}`));
    process.exit(1);
  }
  
  if (validation.warnings.length > 0) {
    console.warn('⚠️  Warnings:');
    validation.warnings.forEach(warn => console.warn(`  - ${warn}`));
  }
  
  console.log(`✅ Validation passed (${allProducts.length} total products)`);
  console.log();

  // Step 5: Backup and write
  console.log('💾 Creating backup...');
  const backupDir = join(process.cwd(), '.backup');
  await mkdir(backupDir, { recursive: true });
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = join(backupDir, `sample-data-${timestamp}.ts.bak`);
  
  const currentFile = join(process.cwd(), 'lib', 'sample-data.ts');
  const currentContent = await readFile(currentFile, 'utf-8');
  await writeFile(backupPath, currentContent);
  
  console.log(`✅ Backup created: ${backupPath}`);
  console.log();

  // Step 6: Write new file
  console.log('📝 Updating lib/sample-data.ts...');
  
  const newContent = `import type { Product } from '@/types';
import { EXPANDED_PRODUCTS } from './expanded-products';

export const SAMPLE_PRODUCTS: Product[] = [
  // Include all expanded brand products
  ...EXPANDED_PRODUCTS,
  
  // Original products with valid images
${validSampleProducts.filter(p => !p.id.startsWith('prd-')).map(p => `  ${JSON.stringify(p, null, 2).replace(/\n/g, '\n  ')},`).join('\n')}

  // New integrated products from image scanner
${newProducts.map(p => `  ${JSON.stringify(p, null, 2).replace(/\n/g, '\n  ')},`).join('\n')}
];
`;
  
  await writeFile(currentFile, newContent);
  console.log('✅ File updated successfully');
  console.log();

  // Summary
  console.log('📊 Integration Summary:');
  console.log(`  Total images scanned: ${inventory.totalImages}`);
  console.log(`  New products created: ${newProducts.length}`);
  console.log(`  Total products in catalog: ${allProducts.length}`);
  console.log();
  console.log('Brand breakdown:');
  for (const [brand, count] of Object.entries(brandCounts)) {
    if (count > 0) {
      console.log(`  - ${brand}: +${count} products`);
    }
  }
  console.log();
  console.log('✨ Integration complete!');
}

main().catch(err => {
  console.error('❌ Integration failed:', err);
  process.exit(1);
});
