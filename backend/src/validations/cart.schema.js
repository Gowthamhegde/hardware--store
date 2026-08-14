const { z } = require('zod');

const addToCartSchema = z.object({
  body: z.object({
    product_id: z.string().uuid('Invalid product ID'),
    quantity: z.number().int().positive('Quantity must be at least 1'),
  }),
});

const updateCartItemSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid cart item ID'),
  }),
  body: z.object({
    quantity: z.number().int().positive('Quantity must be at least 1'),
  }),
});

module.exports = {
  addToCartSchema,
  updateCartItemSchema,
};
