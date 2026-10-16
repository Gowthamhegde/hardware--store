// Diagnostic script to verify Home Theatre product images
const { SAMPLE_PRODUCTS } = require('./lib/sample-data.ts');

const homeTheatreProducts = SAMPLE_PRODUCTS.filter(p => p.category === 'Home Theatre & Audio');

console.log(`\n📊 Home Theatre Products: ${homeTheatreProducts.length} total\n`);

const imageUsage = {};
homeTheatreProducts.forEach((product, index) => {
  const img = product.image_url;
  if (!imageUsage[img]) {
    imageUsage[img] = [];
  }
  imageUsage[img].push({
    id: product.id,
    name: product.name,
    brand: product.brand
  });
});

console.log('🖼️  Image Distribution:\n');
Object.entries(imageUsage).forEach(([img, products]) => {
  console.log(`${img}`);
  console.log(`  Used by ${products.length} product(s):`);
  products.forEach(p => {
    console.log(`    - ${p.id}: ${p.name} (${p.brand})`);
  });
  console.log('');
});

const uniqueImages = Object.keys(imageUsage).length;
const duplicates = Object.entries(imageUsage).filter(([img, prods]) => prods.length > 1);

console.log(`\n✅ Summary:`);
console.log(`   Total products: ${homeTheatreProducts.length}`);
console.log(`   Unique images: ${uniqueImages}`);
console.log(`   Images used multiple times: ${duplicates.length}`);

if (duplicates.length > 0) {
  console.log(`\n⚠️  Duplicates found:`);
  duplicates.forEach(([img, prods]) => {
    console.log(`   ${img} → ${prods.length} products`);
  });
}
