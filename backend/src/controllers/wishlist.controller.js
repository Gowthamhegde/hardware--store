const prisma = require('../config/db');
const { BadRequestError } = require('../utils/errors');

const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await prisma.wishlist.findMany({
      where: { user_id: req.user.id },
      include: {
        product: {
          select: {
            id: true, name: true, slug: true, price: true, discount_price: true,
            images: { where: { is_primary: true } }
          }
        }
      }
    });
    res.status(200).json(wishlist);
  } catch (error) {
    next(error);
  }
};

const addToWishlist = async (req, res, next) => {
  try {
    const { product_id } = req.body;
    
    // Check if already in wishlist
    const existing = await prisma.wishlist.findUnique({
      where: {
        user_id_product_id: { user_id: req.user.id, product_id }
      }
    });

    if (existing) {
      throw new BadRequestError('Product already in wishlist');
    }

    const item = await prisma.wishlist.create({
      data: {
        user_id: req.user.id,
        product_id
      }
    });

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

const removeFromWishlist = async (req, res, next) => {
  try {
    await prisma.wishlist.deleteMany({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist
};
