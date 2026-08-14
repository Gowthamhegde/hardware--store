const prisma = require('../config/db');
const { BadRequestError, NotFoundError } = require('../utils/errors');

const getProductReviews = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { product_id: req.params.id },
        skip,
        take: limit,
        include: { user: { select: { id: true, name: true } } },
        orderBy: { created_at: 'desc' }
      }),
      prisma.review.count({ where: { product_id: req.params.id } })
    ]);

    res.status(200).json({
      data: reviews,
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

const createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const { id: product_id } = req.params;
    const user_id = req.user.id;

    // Check if user has bought this product
    const hasBought = await prisma.orderItem.findFirst({
      where: {
        product_id,
        order: {
          user_id,
          status: { in: ['delivered', 'shipped', 'confirmed'] }
        }
      }
    });

    if (!hasBought) {
      throw new BadRequestError('You must purchase this product before reviewing it');
    }

    const review = await prisma.review.upsert({
      where: {
        product_id_user_id: { product_id, user_id }
      },
      update: {
        rating,
        comment
      },
      create: {
        product_id,
        user_id,
        rating,
        comment
      }
    });

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const review = await prisma.review.findUnique({
      where: { id: req.params.id }
    });

    if (!review) throw new NotFoundError('Review not found');

    if (review.user_id !== req.user.id && req.user.role !== 'admin') {
      throw new BadRequestError('Not authorized to delete this review');
    }

    await prisma.review.delete({
      where: { id: req.params.id }
    });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductReviews,
  createReview,
  deleteReview
};
