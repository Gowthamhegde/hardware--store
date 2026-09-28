/**
 * Security Event Logger
 * Logs security-relevant events for monitoring and auditing
 */

interface SecurityEvent {
  event: string;
  severity: 'info' | 'warn' | 'error' | 'critical';
  ip?: string;
  userId?: string;
  email?: string;
  details?: Record<string, any>;
  timestamp: string;
}

/**
 * Log security event
 * ponytail: Simple console logging, ceiling: use proper logging service in production
 */
export function logSecurityEvent(event: Omit<SecurityEvent, 'timestamp'>): void {
  const logEntry: SecurityEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  };

  // Remove sensitive data from logs
  if (logEntry.details) {
    delete logEntry.details.password;
    delete logEntry.details.token;
    delete logEntry.details.secret;
  }

  const logMessage = JSON.stringify(logEntry);

  switch (event.severity) {
    case 'critical':
    case 'error':
      console.error('[SECURITY]', logMessage);
      break;
    case 'warn':
      console.warn('[SECURITY]', logMessage);
      break;
    default:
      console.log('[SECURITY]', logMessage);
  }

  // TODO: In production, send to proper logging service
  // - AWS CloudWatch
  // - Datadog
  // - Sentry
  // - ELK Stack
}

/**
 * Log authentication failure
 */
export function logAuthFailure(email: string, ip: string, reason: string): void {
  logSecurityEvent({
    event: 'auth_failure',
    severity: 'warn',
    email,
    ip,
    details: { reason },
  });
}

/**
 * Log successful authentication
 */
export function logAuthSuccess(email: string, ip: string): void {
  logSecurityEvent({
    event: 'auth_success',
    severity: 'info',
    email,
    ip,
  });
}

/**
 * Log rate limit violation
 */
export function logRateLimitExceeded(ip: string, endpoint: string): void {
  logSecurityEvent({
    event: 'rate_limit_exceeded',
    severity: 'warn',
    ip,
    details: { endpoint },
  });
}

/**
 * Log unauthorized access attempt
 */
export function logUnauthorizedAccess(ip: string, endpoint: string, reason: string): void {
  logSecurityEvent({
    event: 'unauthorized_access',
    severity: 'warn',
    ip,
    details: { endpoint, reason },
  });
}

/**
 * Log file upload
 */
export function logFileUpload(ip: string, filename: string, size: number): void {
  logSecurityEvent({
    event: 'file_upload',
    severity: 'info',
    ip,
    details: { filename, size },
  });
}

/**
 * Log suspicious activity
 */
export function logSuspiciousActivity(ip: string, activity: string, details?: Record<string, any>): void {
  logSecurityEvent({
    event: 'suspicious_activity',
    severity: 'error',
    ip,
    details: { activity, ...details },
  });
}
