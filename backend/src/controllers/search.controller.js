const prisma = require('../config/db');

const search = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(200).json({ products: [], categories: [] });
    }

    const [products, categories] = await Promise.all([
      prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
            { sku: { contains: q, mode: 'insensitive' } },
            { brand: { name: { contains: q, mode: 'insensitive' } } }
          ],
          is_active: true
        },
        take: 10,
        include: { images: { where: { is_primary: true } } }
      }),
      prisma.category.findMany({
        where: {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } }
          ]
        },
        take: 5
      })
    ]);

    res.status(200).json({ products, categories });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  search
};
