import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { checkRateLimit, RateLimits } from '@/lib/security/rate-limit';
import { getClientIP, isAuthenticatedRequest, unauthorizedResponse, rateLimitResponse } from '@/lib/security/auth-helpers';
import { sanitizeFilename } from '@/lib/security/input-validation';
import { logFileUpload, logRateLimitExceeded, logUnauthorizedAccess } from '@/lib/security/logger';

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  try {
    const ip = getClientIP(request);

    // Rate limiting - 10 uploads per hour
    const rateLimitResult = await checkRateLimit(ip, RateLimits.upload.limit, RateLimits.upload.window);
    if (!rateLimitResult.success) {
      logRateLimitExceeded(ip, '/api/upload');
      return rateLimitResponse(rateLimitResult.reset);
    }

    // Authentication check
    if (!isAuthenticatedRequest(request)) {
      logUnauthorizedAccess(ip, '/api/upload', 'No valid authentication');
      return unauthorizedResponse('Authentication required to upload files');
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file received.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Validate file extension
    const fileExt = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      return NextResponse.json(
        { error: `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate MIME type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file MIME type' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Generate secure random filename
    const randomName = crypto.randomBytes(16).toString('hex');
    const filename = `${Date.now()}-${randomName}${fileExt}`;
    
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    // Ensure upload directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Directory might already exist, ignore error
    }
    
    // Write file to public/uploads
    await writeFile(path.join(uploadDir, filename), buffer);

    // Log successful upload
    logFileUpload(ip, filename, file.size);

    // Return the public URL
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file.' },
      { status: 500 }
    );
  }
}
