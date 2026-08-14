const prisma = require('../config/db');

const getDashboardStats = async (req, res, next) => {
  try {
    const [totalSales, orderCount, lowStockProducts, recentOrders] = await Promise.all([
      prisma.order.aggregate({
        _sum: { total_amount: true },
        where: { status: { in: ['confirmed', 'shipped', 'delivered'] } }
      }),
      prisma.order.count(),
      prisma.product.count({
        where: { stock_quantity: { lte: 10 } }
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { created_at: 'desc' },
        include: { user: { select: { name: true } } }
      })
    ]);

    // Top selling products could be calculated by grouping order items
    const topSelling = await prisma.orderItem.groupBy({
      by: ['product_id'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5
    });

    const topSellingProducts = await Promise.all(
      topSelling.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.product_id },
          select: { name: true, price: true }
        });
        return {
          ...product,
          total_sold: item._sum.quantity
        };
      })
    );

    res.status(200).json({
      totalSales: totalSales._sum.total_amount || 0,
      orderCount,
      lowStockProductsCount: lowStockProducts,
      recentOrders,
      topSellingProducts
    });
  } catch (error) {
    next(error);
  }
};

const getInventory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [inventoryLogs, total] = await Promise.all([
      prisma.inventoryLog.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        include: { product: { select: { name: true, sku: true, stock_quantity: true } } }
      }),
      prisma.inventoryLog.count()
    ]);

    res.status(200).json({
      data: inventoryLogs,
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

module.exports = {
  getDashboardStats,
  getInventory
};
