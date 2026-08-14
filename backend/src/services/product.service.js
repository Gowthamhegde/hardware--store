const prisma = require('../config/db');
const { uploadImageToCloudinary, deleteImageFromCloudinary } = require('../config/cloudinary');
const { NotFoundError } = require('../utils/errors');

const createProduct = async (data, files) => {
  return await prisma.$transaction(async (tx) => {
    // Check if category exists
    const category = await tx.category.findUnique({ where: { id: data.category_id } });
    if (!category) throw new NotFoundError('Category not found');

    if (data.brand_id) {
      const brand = await tx.brand.findUnique({ where: { id: data.brand_id } });
      if (!brand) throw new NotFoundError('Brand not found');
    }

    // Parse specifications
    let specs = [];
    if (data.specifications) {
      specs = JSON.parse(data.specifications);
    }

    const sku = data.name.toUpperCase().substring(0, 4) + '-' + Date.now().toString().slice(-6);
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);

    const product = await tx.product.create({
      data: {
        name: data.name,
        slug,
        sku,
        description: data.description,
        category_id: data.category_id,
        brand_id: data.brand_id,
        price: data.price,
        discount_price: data.discount_price,
        stock_quantity: Number(data.stock_quantity),
        unit: data.unit,
        weight: data.weight ? Number(data.weight) : null,
        specifications: {
          create: specs.map(spec => ({
            spec_name: spec.spec_name,
            spec_value: spec.spec_value
          }))
        }
      }
    });

    if (files && files.length > 0) {
      const uploadPromises = files.map((file, index) => 
        uploadImageToCloudinary(file.buffer, 'hardware_store/products').then(result => ({
          product_id: product.id,
          image_url: result.secure_url,
          is_primary: index === 0,
          sort_order: index
        }))
      );
      
      const imageRecords = await Promise.all(uploadPromises);
      
      await tx.productImage.createMany({
        data: imageRecords
      });
    }

    // Initial stock log
    if (Number(data.stock_quantity) > 0) {
      await tx.inventoryLog.create({
        data: {
          product_id: product.id,
          change_type: 'restock',
          quantity_change: Number(data.stock_quantity),
          note: 'Initial stock',
        }
      });
    }

    return await tx.product.findUnique({
      where: { id: product.id },
      include: { images: true, specifications: true }
    });
  });
};

const deleteProduct = async (id) => {
  return await prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id },
      include: { images: true }
    });

    if (!product) throw new NotFoundError('Product not found');

    // Delete images from Cloudinary (optional if you want to keep them, but best practice is to clean up)
    for (const image of product.images) {
      // Extract public_id from secure_url (this is basic, might need regex based on actual url format)
      const urlParts = image.image_url.split('/');
      const filenameWithExtension = urlParts[urlParts.length - 1];
      const publicId = `hardware_store/products/${filenameWithExtension.split('.')[0]}`;
      await deleteImageFromCloudinary(publicId).catch(() => {});
    }

    await tx.product.delete({ where: { id } });
  });
};

module.exports = {
  createProduct,
  deleteProduct,
};
