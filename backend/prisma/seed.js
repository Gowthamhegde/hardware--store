const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean DB
  await prisma.inventoryLog.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.productSpecification.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 12);

  // 1. Users
  const admin = await prisma.user.create({
    data: { name: 'Admin User', email: 'admin@example.com', password_hash: passwordHash, role: 'admin', phone: '1234567890' }
  });

  const customer = await prisma.user.create({
    data: { name: 'Test Customer', email: 'customer@example.com', password_hash: passwordHash, role: 'customer', phone: '0987654321' }
  });

  const address = await prisma.address.create({
    data: {
      user_id: customer.id, label: 'Home', street: '123 Main St', city: 'Mumbai', state: 'MH', zip: '400001', country: 'India', is_default: true
    }
  });

  // 2. Categories
  const categoryNames = ['Power Tools', 'Hand Tools', 'Electrical', 'Plumbing', 'Building Materials', 'Safety Gear'];
  const categories = [];
  for (const name of categoryNames) {
    categories.push(await prisma.category.create({
      data: { name, slug: name.toLowerCase().replace(/ /g, '-'), description: `All kinds of ${name}` }
    }));
  }

  // 3. Brands
  const brandNames = ['Bosch', 'DeWalt', 'Makita', 'Stanley', '3M'];
  const brands = [];
  for (const name of brandNames) {
    brands.push(await prisma.brand.create({
      data: { name, logo_url: `https://example.com/logos/${name.toLowerCase()}.png` }
    }));
  }

  // 4. Products (creating ~20 products)
  const productsToCreate = [
    { name: 'Bosch Professional Cordless Drill', catIndex: 0, brandIndex: 0, price: 5500, stock: 50 },
    { name: 'DeWalt Impact Driver', catIndex: 0, brandIndex: 1, price: 6200, stock: 30 },
    { name: 'Makita Angle Grinder', catIndex: 0, brandIndex: 2, price: 4100, stock: 45 },
    { name: 'Stanley Hammer', catIndex: 1, brandIndex: 3, price: 800, stock: 100 },
    { name: 'Screwdriver Set (12 pcs)', catIndex: 1, brandIndex: 3, price: 1200, stock: 120 },
    { name: 'Adjustable Wrench', catIndex: 1, brandIndex: 3, price: 650, stock: 80 },
    { name: 'Electrical Wire 100m (Red)', catIndex: 2, brandIndex: 4, price: 2100, stock: 200 },
    { name: 'Circuit Breaker 16A', catIndex: 2, brandIndex: 0, price: 450, stock: 150 },
    { name: 'LED Bulb 9W (Pack of 4)', catIndex: 2, brandIndex: 4, price: 300, stock: 300 },
    { name: 'PVC Pipe 1 inch (3m)', catIndex: 3, brandIndex: null, price: 250, stock: 500 },
    { name: 'Brass Ball Valve 1/2"', catIndex: 3, brandIndex: null, price: 400, stock: 80 },
    { name: 'Teflon Tape (Pack of 10)', catIndex: 3, brandIndex: 3, price: 150, stock: 400 },
    { name: 'Portland Cement 50kg', catIndex: 4, brandIndex: null, price: 380, stock: 1000 },
    { name: 'Ceramic Tile Adhesive 20kg', catIndex: 4, brandIndex: null, price: 550, stock: 200 },
    { name: 'Waterproofing Chemical 1L', catIndex: 4, brandIndex: 4, price: 320, stock: 150 },
    { name: '3M Safety Goggles', catIndex: 5, brandIndex: 4, price: 250, stock: 120 },
    { name: 'Leather Work Gloves', catIndex: 5, brandIndex: 3, price: 350, stock: 250 },
    { name: 'N95 Respirator Mask (Pack of 20)', catIndex: 5, brandIndex: 4, price: 1200, stock: 300 },
    { name: 'Safety Helmet (Yellow)', catIndex: 5, brandIndex: 4, price: 400, stock: 150 },
    { name: 'Steel Toe Safety Shoes', catIndex: 5, brandIndex: null, price: 1800, stock: 60 }
  ];

  const dbProducts = [];
  for (const p of productsToCreate) {
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-3);
    const sku = p.name.substring(0, 3).toUpperCase() + '-' + Date.now().toString().slice(-4);
    
    const prod = await prisma.product.create({
      data: {
        name: p.name,
        slug,
        sku,
        description: `High quality ${p.name}. Durable and reliable for all your needs.`,
        category_id: categories[p.catIndex].id,
        brand_id: p.brandIndex !== null ? brands[p.brandIndex].id : null,
        price: p.price,
        stock_quantity: p.stock,
        is_active: true,
        images: {
          create: [
            { image_url: 'https://via.placeholder.com/400?text=' + p.name.replace(/ /g, '+'), is_primary: true, sort_order: 0 },
            { image_url: 'https://via.placeholder.com/400?text=' + p.name.replace(/ /g, '+') + '+Side', is_primary: false, sort_order: 1 }
          ]
        },
        specifications: {
          create: [
            { spec_name: 'Material', spec_value: 'Premium Grade' },
            { spec_name: 'Warranty', spec_value: '1 Year' }
          ]
        }
      }
    });

    await prisma.inventoryLog.create({
      data: {
        product_id: prod.id,
        change_type: 'restock',
        quantity_change: p.stock,
        note: 'Initial Seed Stock'
      }
    });

    dbProducts.push(prod);
  }

  // 5. Sample Order
  const orderNumber = 'ORD-' + Date.now();
  const order = await prisma.order.create({
    data: {
      user_id: customer.id,
      order_number: orderNumber,
      total_amount: dbProducts[0].price * 2 + dbProducts[3].price,
      shipping_address_id: address.id,
      status: 'delivered',
      payment_status: 'paid',
      items: {
        create: [
          { product_id: dbProducts[0].id, quantity: 2, unit_price: dbProducts[0].price, subtotal: dbProducts[0].price * 2 },
          { product_id: dbProducts[3].id, quantity: 1, unit_price: dbProducts[3].price, subtotal: dbProducts[3].price }
        ]
      }
    }
  });

  await prisma.payment.create({
    data: {
      order_id: order.id,
      provider: 'razorpay',
      provider_payment_id: 'pay_' + Date.now(),
      amount: order.total_amount,
      status: 'paid'
    }
  });

  console.log('✅ Seeding completed successfully!');
  console.log('--- Credentials ---');
  console.log('Admin: admin@example.com / password123');
  console.log('Customer: customer@example.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
