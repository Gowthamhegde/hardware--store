const { z } = require('zod');

const checkoutSchema = z.object({
  body: z.object({
    shipping_address_id: z.string().uuid('Invalid shipping address ID'),
    coupon_code: z.string().optional(),
  }),
});

const updateOrderStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid order ID'),
  }),
  body: z.object({
    status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
  }),
});

const getAdminOrdersQuerySchema = z.object({
  query: z.object({
    status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']).optional(),
    page: z.string().optional().refine(v => !v || !isNaN(Number(v))),
    limit: z.string().optional().refine(v => !v || !isNaN(Number(v))),
  }),
});

module.exports = {
  checkoutSchema,
  updateOrderStatusSchema,
  getAdminOrdersQuerySchema,
};
