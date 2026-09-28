/**
 * Rate Limiting Utility for Next.js API Routes
 * ponytail: Simple in-memory rate limiting, ceiling: not distributed-system safe
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const limitMap = new Map<string, RateLimitEntry>();

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  limitMap.forEach((entry, key) => {
    if (entry.resetTime < now) {
      limitMap.delete(key);
    }
  });
}, 10 * 60 * 1000);

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

/**
 * Check rate limit for an identifier
 * @param identifier - Unique identifier (IP, user ID, etc.)
 * @param limit - Maximum requests allowed
 * @param windowMs - Time window in milliseconds
 */
export async function checkRateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const now = Date.now();
  const entry = limitMap.get(identifier);

  if (!entry || entry.resetTime < now) {
    // New window
    limitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      remaining: limit - 1,
      reset: now + windowMs,
    };
  }

  if (entry.count >= limit) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      reset: entry.resetTime,
    };
  }

  // Increment count
  entry.count += 1;
  return {
    success: true,
    remaining: limit - entry.count,
    reset: entry.resetTime,
  };
}

/**
 * Rate limit presets for different endpoint types
 */
export const RateLimits = {
  strict: { limit: 5, window: 60 * 1000 }, // 5 req/min
  moderate: { limit: 20, window: 60 * 1000 }, // 20 req/min
  lenient: { limit: 100, window: 60 * 1000 }, // 100 req/min
  upload: { limit: 10, window: 60 * 60 * 1000 }, // 10 req/hour
};
