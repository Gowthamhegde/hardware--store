# Hardware Store E-Commerce API

This is the backend REST API for a complete hardware store e-commerce platform.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT (Access + Refresh tokens) & bcrypt
- **Validation**: Zod
- **Image Storage**: Cloudinary (via Multer)
- **Payments**: Razorpay

## Setup Instructions

1. **Clone & Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your PostgreSQL database URL, Cloudinary keys, JWT secrets, and Razorpay keys.

3. **Database Migration**
   ```bash
   npx prisma migrate dev
   ```

4. **Seed Database**
   Populate the database with an admin, a customer, categories, brands, products, and sample orders:
   ```bash
   npm run seed
   ```
   *Note: Check console output for generated login credentials.*

5. **Start the Server**
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:5000`.

## Testing

Run tests using Jest and Supertest:
```bash
npm run test
```

## API Documentation
A `requests.http` file is included. If you use the REST Client extension for VS Code, you can easily run requests directly from that file to interact with all API endpoints.
