'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { getStorePhotoByKey } from '@/lib/store-images';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <ShoppingBag className="mx-auto mb-6 h-24 w-24 text-aluminum/50" />
          <h1 className="mb-4 font-display text-3xl font-bold text-cable-white">
            Your Cart is Empty
          </h1>
          <p className="mb-8 text-aluminum">
            Add some products to get started
          </p>
          <Link href="/shop">
            <Button size="lg">Browse Products</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display mb-8 text-4xl font-bold text-cable-white"
      >
        Shopping Cart
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col gap-4 border border-aluminum/20 bg-background p-5 sm:flex-row"
            >
              <div className="relative w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={getStorePhotoByKey(item.product.id, item.product.image_url, item.product.brand)}
                  alt={item.product.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold text-cable-white">
                  {item.product.name}
                </h3>
                <p className="mb-4 text-sm text-aluminum">{item.product.category}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-aluminum/30">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 transition-colors hover:bg-aluminum/10"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 transition-colors hover:bg-aluminum/10"
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.product.id)}
                className="self-start p-2 transition-colors hover:bg-live-red/10"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-24 border border-aluminum/20 bg-background p-6">
          <h2 className="mb-6 font-display text-xl font-semibold text-cable-white">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-aluminum">Items</span>
                <span className="font-semibold text-cable-white">{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between border-t border-aluminum/15 pt-4">
                <span className="font-semibold text-cable-white">Subtotal</span>
                <span className="font-display text-xl font-bold text-cable-white">{formatPrice(total)}</span>
              </div>
            </div>

            <Link href="/checkout">
              <Button size="lg" className="w-full">
                Proceed to Checkout
              </Button>
            </Link>

            <Link href="/shop">
              <Button size="lg" variant="outline" className="w-full mt-3">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
