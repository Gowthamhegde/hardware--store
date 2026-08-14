const prisma = require('../config/db');
const orderService = require('../services/order.service');
const { NotFoundError, BadRequestError } = require('../utils/errors');

const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.user.id, req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { user_id: req.user.id },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
        include: { items: true, payment: true }
      }),
      prisma.order.count({ where: { user_id: req.user.id } })
    ]);

    res.status(200).json({
      data: orders,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: {
        items: { include: { product: { select: { name: true, images: { where: { is_primary: true } } } } } },
        shipping_address: true,
        payment: true
      }
    });

    if (!order || (order.user_id !== req.user.id && req.user.role !== 'admin')) {
      throw new NotFoundError('Order not found');
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: true }
    });

    if (!order || order.user_id !== req.user.id) {
      throw new NotFoundError('Order not found');
    }

    if (order.status !== 'pending' && order.status !== 'confirmed') {
      throw new BadRequestError('Cannot cancel an order that is already shipped or delivered');
    }

    await prisma.$transaction(async (tx) => {
      // Return items to stock
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.product_id },
          data: { stock_quantity: { increment: item.quantity } }
        });
        
        await tx.inventoryLog.create({
          data: {
            product_id: item.product_id,
            change_type: 'adjustment',
            quantity_change: item.quantity,
            note: `Restocked from cancelled order ${order.order_number}`
          }
        });
      }

      await tx.order.update({
        where: { id: req.params.id },
        data: { status: 'cancelled' }
      });
    });

    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (error) {
    next(error);
  }
};

const getAdminOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let where = {};
    if (status) {
      where.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: Number(limit),
        include: { user: { select: { name: true, email: true } }, payment: true }
      }),
      prisma.order.count({ where })
    ]);

    res.status(200).json({
      data: orders,
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

const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status: req.body.status }
    });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
  getAdminOrders,
  updateOrderStatus
};
