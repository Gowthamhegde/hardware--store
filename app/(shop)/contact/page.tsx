'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { STORE_CONFIG } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ponytail: mock form submission — real implementation needs API route
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="font-heading text-5xl font-bold text-primary mb-6 text-center">
          Contact {STORE_CONFIG.name}
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Have questions about switches, cables, home theatre or electronic items? We’re here to help.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="font-semibold text-2xl mb-6 flex items-center">
              <MessageSquare className="w-6 h-6 mr-2 text-primary" />
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <Input
                label="Subject"
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="font-semibold text-2xl mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-gray-600">
                      {STORE_CONFIG.address.line1}<br />
                      {STORE_CONFIG.address.line2 && <>{STORE_CONFIG.address.line2}<br /></>}
                      {STORE_CONFIG.address.city}, {STORE_CONFIG.address.state} {STORE_CONFIG.address.zip}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <a href={`tel:${STORE_CONFIG.phone}`} className="text-gray-600 hover:text-primary">
                      {STORE_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a href={`mailto:${STORE_CONFIG.email}`} className="text-gray-600 hover:text-primary">
                      {STORE_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="font-semibold text-xl mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Business Hours
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>{STORE_CONFIG.hours.weekday}</p>
                <p>{STORE_CONFIG.hours.saturday}</p>
                <p>{STORE_CONFIG.hours.sunday}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
