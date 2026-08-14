const prisma = require('../config/db');
const { BadRequestError, NotFoundError } = require('../utils/errors');

const createOrder = async (userId, data) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Get user's cart
    const cart = await tx.cart.findUnique({
      where: { user_id: userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestError('Cart is empty');
    }

    // 2. Calculate totals and check stock
    let totalAmount = 0;
    const orderItemsData = [];
    const inventoryLogsData = [];
    const productsToUpdate = [];

    for (const item of cart.items) {
      if (item.product.stock_quantity < item.quantity) {
        throw new BadRequestError(`Insufficient stock for ${item.product.name}`);
      }
      
      const priceToUse = item.product.discount_price || item.product.price;
      const subtotal = Number(priceToUse) * item.quantity;
      totalAmount += subtotal;

      orderItemsData.push({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: priceToUse,
        subtotal: subtotal,
      });

      inventoryLogsData.push({
        product_id: item.product_id,
        change_type: 'sale',
        quantity_change: -item.quantity,
        note: `Sold in order`,
      });

      productsToUpdate.push({
        id: item.product_id,
        stock_quantity: item.product.stock_quantity - item.quantity,
      });
    }

    // Coupon logic could be added here
    
    // Generate order number
    const order_number = 'ORD-' + Date.now().toString().slice(-8) + '-' + Math.floor(Math.random() * 1000);

    // 3. Create Order
    const order = await tx.order.create({
      data: {
        user_id: userId,
        order_number,
        total_amount: totalAmount,
        shipping_address_id: data.shipping_address_id,
        coupon_code: data.coupon_code,
        items: {
          create: orderItemsData
        }
      },
      include: {
        items: true,
      }
    });

    // 4. Update Product Stock
    for (const p of productsToUpdate) {
      await tx.product.update({
        where: { id: p.id },
        data: { stock_quantity: p.stock_quantity }
      });
    }

    // 5. Write Inventory Logs (Update notes with actual order number)
    await tx.inventoryLog.createMany({
      data: inventoryLogsData.map(log => ({...log, note: `Sold in order ${order_number}`}))
    });

    // 6. Clear Cart
    await tx.cartItem.deleteMany({
      where: { cart_id: cart.id }
    });

    return order;
  });
};

module.exports = {
  createOrder,
};
