const prisma = require('../config/database');
const AppError = require('../utils/AppError');
const { getPagination, formatPaginatedResponse } = require('../utils/pagination');

const USER_SELECT = { id: true, name: true, email: true, phone: true, role: true, created_at: true, updated_at: true };

const getById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id }, select: USER_SELECT });
  if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');
  return user;
};

const updateProfile = async (id, { name, phone }) => {
  const user = await prisma.user.update({
    where: { id },
    data: { ...(name && { name }), ...(phone !== undefined && { phone }) },
    select: USER_SELECT,
  });
  return user;
};

const getAllUsers = async (query) => {
  const { skip, take, page, limit } = getPagination(query);
  const [users, total] = await Promise.all([
    prisma.user.findMany({ skip, take, select: USER_SELECT, orderBy: { created_at: 'desc' } }),
    prisma.user.count(),
  ]);
  return formatPaginatedResponse(users, total, page, limit);
};

const deleteUser = async (adminId, targetId) => {
  if (adminId === targetId) throw new AppError('You cannot delete your own account', 400, 'BAD_REQUEST');
  await prisma.user.delete({ where: { id: targetId } });
};

module.exports = { getById, updateProfile, getAllUsers, deleteUser };
