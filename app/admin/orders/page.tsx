'use client';

import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="font-heading text-4xl font-bold text-primary mb-8">
        Orders
      </h1>

      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-charcoal mb-2">No Orders Yet</h2>
        <p className="text-gray-600">
          Orders will appear here once customers start placing them
        </p>
      </div>
    </div>
  );
}
