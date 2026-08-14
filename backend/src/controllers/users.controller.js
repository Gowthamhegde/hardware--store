const prisma = require('../config/db');
const { NotFoundError } = require('../utils/errors');
const bcrypt = require('bcryptjs');

const getUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: { id: true, name: true, email: true, phone: true, role: true, created_at: true }
    });
    
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, phone, password } = req.body;
    let data = { name, phone };
    
    if (password) {
      data.password_hash = await bcrypt.hash(password, 12);
    }
    
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data,
      select: { id: true, name: true, email: true, phone: true, role: true }
    });
    
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getAdminUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        select: { id: true, name: true, email: true, role: true, created_at: true }
      }),
      prisma.user.count()
    ]);

    res.status(200).json({
      data: users,
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

const deleteAdminUser = async (req, res, next) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id }
    });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  updateUser,
  getAdminUsers,
  deleteAdminUser
};
