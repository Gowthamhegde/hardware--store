const { z } = require('zod');

const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Product name is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    category_id: z.string().uuid('Invalid category ID'),
    brand_id: z.string().uuid('Invalid brand ID').optional(),
    price: z.string().refine((val) => !isNaN(Number(val)), 'Price must be a number'),
    discount_price: z.string().refine((val) => !isNaN(Number(val)), 'Discount price must be a number').optional(),
    stock_quantity: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, 'Stock must be a non-negative number'),
    unit: z.string().optional(),
    weight: z.string().refine((val) => !isNaN(Number(val)), 'Weight must be a number').optional(),
    specifications: z.string().optional().refine((val) => {
      if (!val) return true;
      try {
        const parsed = JSON.parse(val);
        return Array.isArray(parsed);
      } catch {
        return false;
      }
    }, 'Specifications must be a valid JSON array string'),
  }),
});

const updateProductSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid product ID'),
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().min(10).optional(),
    category_id: z.string().uuid().optional(),
    brand_id: z.string().uuid().optional(),
    price: z.number().positive().optional(),
    discount_price: z.number().positive().optional(),
    stock_quantity: z.number().int().nonnegative().optional(),
    is_active: z.boolean().optional(),
  }),
});

const getProductsQuerySchema = z.object({
  query: z.object({
    category: z.string().optional(),
    brand: z.string().optional(),
    minPrice: z.string().optional().refine(v => !v || !isNaN(Number(v))),
    maxPrice: z.string().optional().refine(v => !v || !isNaN(Number(v))),
    search: z.string().optional(),
    sort: z.string().optional(),
    page: z.string().optional().refine(v => !v || !isNaN(Number(v))),
    limit: z.string().optional().refine(v => !v || !isNaN(Number(v))),
  }),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductsQuerySchema,
};
