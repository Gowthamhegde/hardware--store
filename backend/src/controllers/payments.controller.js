const paymentService = require('../services/payment.service');
const prisma = require('../config/db');

const createRazorpayOrder = async (req, res, next) => {
  try {
    const { order_id } = req.body;
    const razorpayOrder = await paymentService.createRazorpayOrder(order_id);
    res.status(200).json(razorpayOrder);
  } catch (error) {
    next(error);
  }
};

const verifyWebhook = async (req, res, next) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const isValid = paymentService.verifyWebhookSignature(req.body, signature);

    if (!isValid) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = req.body.event;
    if (event === 'payment.captured') {
      const paymentEntity = req.body.payload.payment.entity;
      const orderId = paymentEntity.order_id; // Razorpay order id

      // Find our internal payment record
      const payment = await prisma.payment.findFirst({
        where: { provider_payment_id: orderId }
      });

      if (payment) {
        await prisma.$transaction([
          prisma.payment.update({
            where: { id: payment.id },
            data: { status: 'paid' }
          }),
          prisma.order.update({
            where: { id: payment.order_id },
            data: { payment_status: 'paid', status: 'confirmed' }
          })
        ]);
      }
    }

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRazorpayOrder,
  verifyWebhook
};
