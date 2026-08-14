const prisma = require('../config/db');
const productService = require('../services/product.service');
const { uploadImageToCloudinary, deleteImageFromCloudinary } = require('../config/cloudinary');
const { NotFoundError } = require('../utils/errors');

const getProducts = async (req, res, next) => {
  try {
    const { category, brand, minPrice, maxPrice, search, sort, page = 1, limit = 10 } = req.query;
    
    let where = {};
    
    if (category) {
      where.category = { slug: category };
    }
    
    if (brand) {
      where.brand = { name: brand };
    }
    
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    let orderBy = {};
    if (sort === 'price_asc') orderBy.price = 'asc';
    else if (sort === 'price_desc') orderBy.price = 'desc';
    else if (sort === 'newest') orderBy.created_at = 'desc';
    else orderBy.created_at = 'desc';

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: Number(limit),
        include: {
          images: { where: { is_primary: true } },
          brand: true,
          category: true
        }
      }),
      prisma.product.count({ where })
    ]);

    res.status(200).json({
      data: products,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

const getProductBySlug = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: {
        images: true,
        specifications: true,
        brand: true,
        category: true,
        reviews: {
          include: { user: { select: { name: true } } },
          take: 5,
          orderBy: { created_at: 'desc' }
        }
      }
    });

    if (!product) throw new NotFoundError('Product not found');

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body, req.files);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const addProductImages = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: { message: 'No images uploaded' } });
    }

    const currentImagesCount = await prisma.productImage.count({ where: { product_id: id } });

    const uploadPromises = req.files.map((file, index) => 
      uploadImageToCloudinary(file.buffer, 'hardware_store/products').then(result => ({
        product_id: id,
        image_url: result.secure_url,
        is_primary: currentImagesCount === 0 && index === 0,
        sort_order: currentImagesCount + index
      }))
    );
    
    const imageRecords = await Promise.all(uploadPromises);
    
    await prisma.productImage.createMany({
      data: imageRecords
    });

    const updatedImages = await prisma.productImage.findMany({ where: { product_id: id }});
    res.status(201).json(updatedImages);
  } catch (error) {
    next(error);
  }
};

const deleteProductImage = async (req, res, next) => {
  try {
    const { id, imageId } = req.params;
    
    const image = await prisma.productImage.findUnique({
      where: { id: imageId }
    });

    if (!image) throw new NotFoundError('Image not found');

    const urlParts = image.image_url.split('/');
    const filenameWithExtension = urlParts[urlParts.length - 1];
    const publicId = `hardware_store/products/${filenameWithExtension.split('.')[0]}`;
    await deleteImageFromCloudinary(publicId).catch(() => {});

    await prisma.productImage.delete({ where: { id: imageId } });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductImages,
  deleteProductImage
};
