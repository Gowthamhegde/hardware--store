'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function OrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-16 h-16 text-green-600" />
        </motion.div>

        <h1 className="font-heading text-4xl font-bold text-primary mb-4">
          Order Confirmed!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your order. We&apos;ve received it and will process it shortly.
        </p>

        <div className="bg-white rounded-xl p-8 shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-primary flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold mb-1">Confirmation Email</h3>
                <p className="text-sm text-gray-600">
                  We&apos;ve sent order details to your email
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Package className="w-6 h-6 text-primary flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold mb-1">Shipping Updates</h3>
                <p className="text-sm text-gray-600">
                  You&apos;ll receive tracking information soon
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button size="lg">Continue Shopping</Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline">Back to Home</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
