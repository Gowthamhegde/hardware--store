const prisma = require('../config/database');
const AppError = require('../utils/AppError');

const getAll = () =>
  prisma.category.findMany({
    where: { parent_id: null },
    include: { children: true },
    orderBy: { name: 'asc' },
  });

const getBySlug = async (slug) => {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      children: true,
      _count: { select: { products: true } },
    },
  });
  if (!category) throw new AppError('Category not found', 404, 'NOT_FOUND');
  return category;
};

const create = (data) => prisma.category.create({ data });

const update = async (id, data) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new AppError('Category not found', 404, 'NOT_FOUND');
  return prisma.category.update({ where: { id }, data });
};

const remove = async (id) => {
  const count = await prisma.product.count({ where: { category_id: id } });
  if (count > 0) throw new AppError('Cannot delete category with existing products', 400, 'BAD_REQUEST');
  await prisma.category.delete({ where: { id } });
};

module.exports = { getAll, getBySlug, create, update, remove };
