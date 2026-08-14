const prisma = require('../config/db');
const { NotFoundError } = require('../utils/errors');

const getCart = async (req, res, next) => {
  try {
    let cart = await prisma.cart.findUnique({
      where: { user_id: req.user.id },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, name: true, slug: true, price: true, discount_price: true, stock_quantity: true, images: { where: { is_primary: true } } }
            }
          }
        }
      }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { user_id: req.user.id },
        include: { items: true }
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

const addItem = async (req, res, next) => {
  try {
    const { product_id, quantity } = req.body;

    let cart = await prisma.cart.findUnique({ where: { user_id: req.user.id } });
    
    if (!cart) {
      cart = await prisma.cart.create({ data: { user_id: req.user.id } });
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: { cart_id: cart.id, product_id }
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
    } else {
      await prisma.cartItem.create({
        data: { cart_id: cart.id, product_id, quantity }
      });
    }

    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    
    const cart = await prisma.cart.findUnique({ where: { user_id: req.user.id } });
    if (!cart) throw new NotFoundError('Cart not found');

    const item = await prisma.cartItem.findFirst({
      where: { id: req.params.id, cart_id: cart.id }
    });

    if (!item) throw new NotFoundError('Cart item not found');

    await prisma.cartItem.update({
      where: { id: req.params.id },
      data: { quantity }
    });

    res.status(200).json({ message: 'Cart item updated' });
  } catch (error) {
    next(error);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findUnique({ where: { user_id: req.user.id } });
    if (!cart) throw new NotFoundError('Cart not found');

    await prisma.cartItem.deleteMany({
      where: { id: req.params.id, cart_id: cart.id }
    });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findUnique({ where: { user_id: req.user.id } });
    if (cart) {
      await prisma.cartItem.deleteMany({ where: { cart_id: cart.id } });
    }
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart
};
