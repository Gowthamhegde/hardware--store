const Razorpay = require('razorpay');
const crypto = require('crypto');
const env = require('../config/env');
const prisma = require('../config/db');
const { BadRequestError, NotFoundError } = require('../utils/errors');

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

const createRazorpayOrder = async (orderId) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId }
  });

  if (!order) {
    throw new NotFoundError('Order not found');
  }

  const options = {
    amount: Math.round(Number(order.total_amount) * 100), // amount in the smallest currency unit (paise)
    currency: 'INR',
    receipt: order.order_number,
  };

  try {
    const razorpayOrder = await razorpay.orders.create(options);
    
    // Create pending payment record
    await prisma.payment.upsert({
      where: { order_id: order.id },
      update: {
        provider_payment_id: razorpayOrder.id,
        amount: order.total_amount,
        status: 'pending'
      },
      create: {
        order_id: order.id,
        provider: 'razorpay',
        provider_payment_id: razorpayOrder.id,
        amount: order.total_amount,
        status: 'pending'
      }
    });

    return razorpayOrder;
  } catch (error) {
    console.error('Razorpay Order Creation Error:', error);
    throw new Error('Failed to create Razorpay order');
  }
};

const verifyWebhookSignature = (body, signature) => {
  const expectedSignature = crypto
    .createHmac('sha256', env.RAZORPAY_KEY_SECRET) // usually a separate webhook secret, but using key_secret for simplicity if configured same
    .update(JSON.stringify(body))
    .digest('hex');
  return expectedSignature === signature;
};

module.exports = {
  createRazorpayOrder,
  verifyWebhookSignature,
};
