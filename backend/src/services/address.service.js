const prisma = require('../config/database');
const AppError = require('../utils/AppError');

const getAddresses = (userId) =>
  prisma.address.findMany({ where: { user_id: userId }, orderBy: { is_default: 'desc' } });

const createAddress = async (userId, data) => {
  if (data.is_default) {
    await prisma.address.updateMany({ where: { user_id: userId }, data: { is_default: false } });
  }
  return prisma.address.create({ data: { ...data, user_id: userId } });
};

const updateAddress = async (userId, addressId, data) => {
  const address = await prisma.address.findFirst({ where: { id: addressId, user_id: userId } });
  if (!address) throw new AppError('Address not found', 404, 'NOT_FOUND');

  return prisma.$transaction(async (tx) => {
    if (data.is_default) {
      await tx.address.updateMany({ where: { user_id: userId }, data: { is_default: false } });
    }
    return tx.address.update({ where: { id: addressId }, data });
  });
};

const deleteAddress = async (userId, addressId) => {
  const address = await prisma.address.findFirst({ where: { id: addressId, user_id: userId } });
  if (!address) throw new AppError('Address not found', 404, 'NOT_FOUND');
  await prisma.address.delete({ where: { id: addressId } });
};

const setDefault = async (userId, addressId) => {
  const address = await prisma.address.findFirst({ where: { id: addressId, user_id: userId } });
  if (!address) throw new AppError('Address not found', 404, 'NOT_FOUND');

  return prisma.$transaction(async (tx) => {
    await tx.address.updateMany({ where: { user_id: userId }, data: { is_default: false } });
    return tx.address.update({ where: { id: addressId }, data: { is_default: true } });
  });
};

module.exports = { getAddresses, createAddress, updateAddress, deleteAddress, setDefault };
