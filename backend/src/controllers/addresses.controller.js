const prisma = require('../config/db');

const getAddresses = async (req, res, next) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { user_id: req.user.id }
    });
    res.status(200).json(addresses);
  } catch (error) {
    next(error);
  }
};

const createAddress = async (req, res, next) => {
  try {
    if (req.body.is_default) {
      await prisma.address.updateMany({
        where: { user_id: req.user.id },
        data: { is_default: false }
      });
    }

    const address = await prisma.address.create({
      data: {
        ...req.body,
        user_id: req.user.id
      }
    });
    res.status(201).json(address);
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    if (req.body.is_default) {
      await prisma.address.updateMany({
        where: { user_id: req.user.id, id: { not: req.params.id } },
        data: { is_default: false }
      });
    }

    const address = await prisma.address.update({
      where: { id: req.params.id, user_id: req.user.id },
      data: req.body
    });
    res.status(200).json(address);
  } catch (error) {
    next(error);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    await prisma.address.delete({
      where: { id: req.params.id, user_id: req.user.id }
    });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress
};
