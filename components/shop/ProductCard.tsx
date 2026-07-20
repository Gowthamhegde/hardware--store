'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import toast from 'react-hot-toast';
import { getStorePhotoByKey } from '@/lib/store-images';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/product/${product.slug}`}>
        <Card className="group">
          <div className="relative h-64 overflow-hidden bg-gradient-to-b from-enclosure/30 to-enclosure/70">
            <Image
              src={getStorePhotoByKey(product.id, product.image_url)}
              alt={product.name}
              fill
              className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
            />
            {product.stock < 10 && product.stock > 0 && (
              <div className="absolute top-4 right-4 bg-live-red/20 text-live-red text-xs px-3 py-1 rounded-full border border-live-red/20 backdrop-blur-md">
                Only {product.stock} left
              </div>
            )}
            {product.stock === 0 && (
              <div className="absolute top-4 right-4 bg-aluminum/20 text-cable-white text-xs px-3 py-1 rounded-full border border-aluminum/20 backdrop-blur-md">
                Out of Stock
              </div>
            )}
          </div>

          <div className="p-5">
            <p className="font-mono text-[10px] text-aluminum mb-2 uppercase tracking-widest">{product.category}</p>
            <h3 className="font-semibold text-lg text-cable-white mb-2 line-clamp-2 group-hover:text-signal transition-colors uppercase">
              {product.name}
            </h3>
            <p className="text-sm text-aluminum mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-signal">
                {formatPrice(product.price)}
              </span>
              
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex items-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add</span>
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
