/**
 * Input Validation Utilities
 * Provides reusable validation functions for API inputs
 */

import { z } from 'zod';

/**
 * Validate and sanitize filename
 */
export function sanitizeFilename(filename: string): string {
  // Remove path traversal attempts
  const basename = filename.split(/[/\\]/).pop() || 'file';
  
  // Remove dangerous characters, keep only alphanumeric, dash, underscore, dot
  const sanitized = basename.replace(/[^a-zA-Z0-9._-]/g, '_');
  
  // Limit length
  return sanitized.slice(0, 200);
}

/**
 * Validate file extension against whitelist
 */
export function isAllowedFileExtension(filename: string, allowedExts: string[]): boolean {
  const ext = filename.toLowerCase().split('.').pop();
  return ext ? allowedExts.includes(`.${ext}`) : false;
}

/**
 * Product creation validation schema
 */
export const productSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  description: z.string().min(1).max(1000),
  long_description: z.string().max(5000).optional(),
  price: z.number().positive().max(1000000),
  category: z.string().min(1),
  subcategory: z.string().optional(),
  brand: z.string().optional(),
  image_url: z.string().url().max(500),
  images: z.array(z.string().url()).optional(),
  stock: z.number().int().min(0).max(1000000),
  specifications: z.record(z.string()).optional(),
});

/**
 * Order creation validation schema
 */
export const orderSchema = z.object({
  customer_name: z.string().min(1).max(100),
  customer_email: z.string().email().max(200),
  customer_phone: z.string().min(10).max(20),
  shipping_address: z.object({
    street: z.string().min(1).max(200),
    city: z.string().min(1).max(100),
    state: z.string().min(1).max(100),
    zip: z.string().min(1).max(20),
    country: z.string().min(1).max(100),
  }),
  items: z.array(z.object({
    product_id: z.string().uuid().optional().or(z.string()),
    quantity: z.number().int().positive().max(1000),
    price: z.number().positive(),
  })).min(1).max(100),
  subtotal: z.number().positive().max(10000000),
  total: z.number().positive().max(10000000),
});

/**
 * Search query validation
 */
export const searchQuerySchema = z.object({
  category: z.string().max(100).optional(),
  search: z.string().max(200).optional(),
  minPrice: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
  maxPrice: z.string().regex(/^\d+(\.\d{1,2})?$/).optional(),
  inStock: z.enum(['true', 'false']).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

/**
 * Validate and parse request body
 */
export async function validateRequestBody<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);
    
    if (!result.success) {
      return {
        success: false,
        error: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      };
    }
    
    return { success: true, data: result.data };
  } catch (error) {
    return { success: false, error: 'Invalid JSON body' };
  }
}

/**
 * Validate query parameters
 */
export function validateQueryParams<T>(
  searchParams: URLSearchParams,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; error: string } {
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  const result = schema.safeParse(params);
  
  if (!result.success) {
    return {
      success: false,
      error: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
    };
  }
  
  return { success: true, data: result.data };
}
