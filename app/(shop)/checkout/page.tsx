'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\-\d\s]{7,}$/;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  const total = getTotal();
  const shipping = total >= 100 ? 0 : 10;
  const finalTotal = total + shipping;

  useEffect(() => {
    if (items.length === 0) {
      router.replace('/cart');
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
  }

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.name.trim()) nextErrors.name = 'Name is required';
    if (!emailPattern.test(formData.email.trim())) nextErrors.email = 'Enter a valid email address';
    if (!phonePattern.test(formData.phone.trim())) nextErrors.phone = 'Enter a valid phone number';
    if (!formData.address.trim()) nextErrors.address = 'Address is required';
    if (!formData.city.trim()) nextErrors.city = 'City is required';
    if (!formData.state.trim()) nextErrors.state = 'State is required';
    if (!formData.zip.trim()) nextErrors.zip = 'ZIP code is required';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Check the highlighted fields');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalTotal,
          customer_email: formData.email,
          orderId: `order_${Date.now()}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to create payment intent');
      }

      await response.json();

      clearCart();
      toast.success('Order placed successfully!');
      router.push('/order-confirmation');
    } catch (error) {
      toast.error('Payment initialization failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-4xl md:text-5xl font-bold text-cable-white mb-8"
      >
        Checkout
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 md:p-8">
            <h2 className="font-display text-xl mb-6 text-cable-white">Shipping Information</h2>
            
            <div className="space-y-4 mb-8">
              <Input
                label="Full Name"
                type="text"
                required
                value={formData.name}
                error={errors.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  setErrors((current) => ({ ...current, name: '' }));
                }}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  required
                  value={formData.email}
                  error={errors.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setErrors((current) => ({ ...current, email: '' }));
                  }}
                />
                <Input
                  label="Phone"
                  type="tel"
                  required
                  value={formData.phone}
                  error={errors.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    setErrors((current) => ({ ...current, phone: '' }));
                  }}
                />
              </div>

              <Input
                label="Address"
                type="text"
                required
                value={formData.address}
                error={errors.address}
                onChange={(e) => {
                  setFormData({ ...formData, address: e.target.value });
                  setErrors((current) => ({ ...current, address: '' }));
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="City"
                  type="text"
                  required
                  value={formData.city}
                  error={errors.city}
                  onChange={(e) => {
                    setFormData({ ...formData, city: e.target.value });
                    setErrors((current) => ({ ...current, city: '' }));
                  }}
                />
                <Input
                  label="State"
                  type="text"
                  required
                  value={formData.state}
                  error={errors.state}
                  onChange={(e) => {
                    setFormData({ ...formData, state: e.target.value });
                    setErrors((current) => ({ ...current, state: '' }));
                  }}
                />
                <Input
                  label="ZIP Code"
                  type="text"
                  required
                  value={formData.zip}
                  error={errors.zip}
                  onChange={(e) => {
                    setFormData({ ...formData, zip: e.target.value });
                    setErrors((current) => ({ ...current, zip: '' }));
                  }}
                />
              </div>
            </div>

            <h2 className="font-semibold text-xl mb-6 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Method
            </h2>
            
            <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
              <p className="text-sm text-cable-white/70 mb-4">
                Payment processing via Stripe payment intent initialization.
              </p>
              <div className="flex items-center gap-2 text-sm text-aluminum">
                <ShieldCheck className="w-4 h-4 text-signal" />
                <span>Secure SSL encrypted payment</span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? 'Processing...' : `Place Order - ${formatPrice(finalTotal)}`}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass-panel rounded-3xl p-6 sticky top-24">
            <h2 className="font-display text-xl mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-cable-white/70">
                    {item.quantity}× {item.product.name}
                  </span>
                  <span className="font-medium text-cable-white">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-cable-white/70">Subtotal</span>
                <span className="font-semibold text-cable-white">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cable-white/70">Shipping</span>
                <span className="font-semibold text-cable-white">
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>Total</span>
                <span className="text-signal">{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
