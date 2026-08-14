const prisma = require('../config/database');
const AppError = require('../utils/AppError');

const CART_INCLUDE = {
  items: {
    include: {
      product: {
        include: {
          images: { where: { is_primary: true }, take: 1 },
        },
      },
    },
  },
};

const getOrCreateCart = (userId) =>
  prisma.cart.upsert({
    where: { user_id: userId },
    create: { user_id: userId },
    update: {},
    include: CART_INCLUDE,
  });

const getCart = (userId) => getOrCreateCart(userId);

const addItem = async (userId, productId, quantity) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || !product.is_active) throw new AppError('Product not found', 404, 'NOT_FOUND');
  if (product.stock_quantity < quantity) {
    throw new AppError(`Insufficient stock. Available: ${product.stock_quantity}`, 422, 'INSUFFICIENT_STOCK');
  }

  const cart = await getOrCreateCart(userId);

  const existing = await prisma.cartItem.findFirst({
    where: { cart_id: cart.id, product_id: productId },
  });

  if (existing) {
    const newQty = existing.quantity + quantity;
    if (product.stock_quantity < newQty) {
      throw new AppError(`Insufficient stock. Available: ${product.stock_quantity}`, 422, 'INSUFFICIENT_STOCK');
    }
    await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: newQty } });
  } else {
    await prisma.cartItem.create({ data: { cart_id: cart.id, product_id: productId, quantity } });
  }

  return getCart(userId);
};

const updateItem = async (userId, cartItemId, quantity) => {
  const cart = await prisma.cart.findUnique({ where: { user_id: userId } });
  if (!cart) throw new AppError('Cart not found', 404, 'NOT_FOUND');

  const item = await prisma.cartItem.findFirst({ where: { id: cartItemId, cart_id: cart.id } });
  if (!item) throw new AppError('Cart item not found', 404, 'NOT_FOUND');

  if (quantity === 0) {
    await prisma.cartItem.delete({ where: { id: cartItemId } });
  } else {
    const product = await prisma.product.findUnique({ where: { id: item.product_id } });
    if (product.stock_quantity < quantity) {
      throw new AppError(`Insufficient stock. Available: ${product.stock_quantity}`, 422, 'INSUFFICIENT_STOCK');
    }
    await prisma.cartItem.update({ where: { id: cartItemId }, data: { quantity } });
  }

  return getCart(userId);
};

const removeItem = async (userId, cartItemId) => {
  const cart = await prisma.cart.findUnique({ where: { user_id: userId } });
  if (!cart) throw new AppError('Cart not found', 404, 'NOT_FOUND');

  const item = await prisma.cartItem.findFirst({ where: { id: cartItemId, cart_id: cart.id } });
  if (!item) throw new AppError('Cart item not found', 404, 'NOT_FOUND');

  await prisma.cartItem.delete({ where: { id: cartItemId } });
  return getCart(userId);
};

const clearCart = async (userId) => {
  const cart = await prisma.cart.findUnique({ where: { user_id: userId } });
  if (cart) {
    await prisma.cartItem.deleteMany({ where: { cart_id: cart.id } });
  }
};

module.exports = { getCart, addItem, updateItem, removeItem, clearCart };
