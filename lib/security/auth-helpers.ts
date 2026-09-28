/**
 * Authentication Helper Functions for Next.js API Routes
 * Provides simple authentication checks without full session management
 */

import { headers } from 'next/headers';

/**
 * Extract IP address from request headers
 */
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

/**
 * Check if request has valid admin authentication
 * For now, uses a simple API key approach
 * TODO: Replace with proper JWT validation when auth is implemented
 */
export function isAdminRequest(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const apiKey = request.headers.get('x-api-key');
  
  // Check for admin API key from environment
  const adminKey = process.env.ADMIN_API_KEY;
  
  if (!adminKey) {
    // If no admin key is set, deny all admin operations
    return false;
  }
  
  // Check bearer token
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    return token === adminKey;
  }
  
  // Check API key header
  if (apiKey === adminKey) {
    return true;
  }
  
  return false;
}

/**
 * Check if request is authenticated (any valid user)
 * TODO: Implement proper JWT validation
 */
export function isAuthenticatedRequest(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  
  // For now, require any bearer token
  // This will be replaced with proper JWT validation
  if (authHeader?.startsWith('Bearer ') && authHeader.length > 20) {
    return true;
  }
  
  return false;
}

/**
 * Create unauthorized response
 */
export function unauthorizedResponse(message = 'Unauthorized'): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        'WWW-Authenticate': 'Bearer realm="API"',
      },
    }
  );
}

/**
 * Create forbidden response
 */
export function forbiddenResponse(message = 'Forbidden'): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

/**
 * Create rate limit exceeded response
 */
export function rateLimitResponse(resetTime: number): Response {
  return new Response(
    JSON.stringify({
      error: 'Rate limit exceeded',
      retryAfter: Math.ceil((resetTime - Date.now()) / 1000),
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString(),
      },
    }
  );
}
