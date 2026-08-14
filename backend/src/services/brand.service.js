const prisma = require('../config/database');
const AppError = require('../utils/AppError');

const getAll = () => prisma.brand.findMany({ orderBy: { name: 'asc' } });

const create = (data) => prisma.brand.create({ data });

const update = async (id, data) => {
  const brand = await prisma.brand.findUnique({ where: { id } });
  if (!brand) throw new AppError('Brand not found', 404, 'NOT_FOUND');
  return prisma.brand.update({ where: { id }, data });
};

const remove = async (id) => {
  const brand = await prisma.brand.findUnique({ where: { id } });
  if (!brand) throw new AppError('Brand not found', 404, 'NOT_FOUND');
  await prisma.brand.delete({ where: { id } });
};

module.exports = { getAll, create, update, remove };
