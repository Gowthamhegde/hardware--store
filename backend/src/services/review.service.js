const prisma = require('../config/database');
const AppError = require('../utils/AppError');
const { getPagination, formatPaginatedResponse } = require('../utils/pagination');

const getProductReviews = async (productId, query) => {
  const { skip, take, page, limit } = getPagination(query);
  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where: { product_id: productId },
      skip, take,
      include: { user: { select: { id: true, name: true } } },
      orderBy: { created_at: 'desc' },
    }),
    prisma.review.count({ where: { product_id: productId } }),
  ]);
  return formatPaginatedResponse(reviews, total, page, limit);
};

const createReview = async (userId, productId, { rating, comment }) => {
  // Verify product exists
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new AppError('Product not found', 404, 'NOT_FOUND');

  // Check verified purchase
  const verifiedPurchase = await prisma.orderItem.findFirst({
    where: {
      product_id: productId,
      order: { user_id: userId, status: 'delivered' },
    },
  });
  if (!verifiedPurchase) {
    throw new AppError('You can only review products from delivered orders', 403, 'FORBIDDEN');
  }

  // Check existing review
  const existing = await prisma.review.findUnique({
    where: { product_id_user_id: { product_id: productId, user_id: userId } },
  });
  if (existing) throw new AppError('You have already reviewed this product', 409, 'CONFLICT');

  return prisma.review.create({
    data: { product_id: productId, user_id: userId, rating, comment },
    include: { user: { select: { id: true, name: true } } },
  });
};

const deleteReview = async (userId, reviewId, role) => {
  const review = await prisma.review.findUnique({ where: { id: reviewId } });
  if (!review) throw new AppError('Review not found', 404, 'NOT_FOUND');
  if (role !== 'admin' && review.user_id !== userId) {
    throw new AppError('Not authorized to delete this review', 403, 'FORBIDDEN');
  }
  await prisma.review.delete({ where: { id: reviewId } });
};

module.exports = { getProductReviews, createReview, deleteReview };
