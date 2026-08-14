const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
});

const createAddressSchema = z.object({
  label: z.string().min(1),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  country: z.string().min(1),
  is_default: z.boolean().optional(),
});

const updateAddressSchema = createAddressSchema.partial();

const createCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  parent_id: z.string().uuid().optional(),
  description: z.string().optional(),
  image_url: z.string().url().optional(),
});

const updateCategorySchema = createCategorySchema.partial();

const createBrandSchema = z.object({
  name: z.string().min(1),
  logo_url: z.string().url().optional(),
});

const updateBrandSchema = createBrandSchema.partial();

const createProductSchema = z.object({
  name: z.string().min(2),
  sku: z.string().min(2),
  description: z.string().min(10),
  category_id: z.string().uuid(),
  brand_id: z.string().uuid().optional(),
  price: z.coerce.number().positive(),
  discount_price: z.coerce.number().positive().optional(),
  currency: z.string().default('INR'),
  stock_quantity: z.coerce.number().int().min(0),
  unit: z.string().default('piece'),
  weight: z.coerce.number().positive().optional(),
  specifications: z.string().optional(), // JSON string, parsed in service
});

const updateProductSchema = createProductSchema.partial();

const addCartItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().int().min(1),
});

const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0),
});

const createOrderSchema = z.object({
  shipping_address_id: z.string().uuid(),
  payment_method: z.string().min(1),
  coupon_code: z.string().optional(),
});

const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
});

const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  createAddressSchema,
  updateAddressSchema,
  createCategorySchema,
  updateCategorySchema,
  createBrandSchema,
  updateBrandSchema,
  createProductSchema,
  updateProductSchema,
  addCartItemSchema,
  updateCartItemSchema,
  createOrderSchema,
  createReviewSchema,
  updateOrderStatusSchema,
  updateProfileSchema,
};
