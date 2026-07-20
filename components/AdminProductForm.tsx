'use client';

import { useState } from 'react';
import { CATEGORIES } from '@/lib/constants';
import { insertProduct } from '@/lib/supabase';
import { slugify } from '@/lib/utils';
import toast from 'react-hot-toast';
import { Plus, Check, Loader2 } from 'lucide-react';

export default function AdminProductForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    long_description: '',
    price: '',
    category: CATEGORIES[0].name,
    brand: '',
    image_url: '',
    stock: '10',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.image_url) {
      toast.error('Missing required fields (Name, Price, Image URL)');
      return;
    }

    setLoading(true);
    const slug = slugify(formData.name);

    try {
      await insertProduct({
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        slug,
      });

      toast.success(`SYSTEM UPDATED: ${formData.name} initialized`);
      setFormData({
        name: '',
        description: '',
        long_description: '',
        price: '',
        category: CATEGORIES[0].name,
        brand: '',
        image_url: '',
        stock: '10',
      });
    } catch (err: any) {
      console.error(err);
      toast.error('UPLOAD FAILED: Check system connection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-aluminum/20 bg-[#111614] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      <div className="border-b border-aluminum/20 bg-[#0a0d0c] p-4 flex items-center justify-between">
        <h2 className="font-mono text-xs text-signal tracking-widest uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-signal animate-pulse-fast inline-block" />
          Initialize New Component
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-6">
        {/* Name & Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] text-aluminum tracking-widest uppercase">
              Component Designation (Name) <span className="text-live-red">*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-[#0a0d0c] border border-aluminum/30 p-3 text-cable-white font-mono text-sm focus:outline-none focus:border-signal transition-colors"
              placeholder="e.g. TX-900 Amplifier"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] text-aluminum tracking-widest uppercase">
              Manufacturer (Brand)
            </label>
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="bg-[#0a0d0c] border border-aluminum/30 p-3 text-cable-white font-mono text-sm focus:outline-none focus:border-signal transition-colors"
              placeholder="e.g. Sony"
            />
          </div>
        </div>

        {/* Category & Price & Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] text-aluminum tracking-widest uppercase">
              Category <span className="text-live-red">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-[#0a0d0c] border border-aluminum/30 p-3 text-cable-white font-mono text-sm focus:outline-none focus:border-signal transition-colors appearance-none"
            >
              {CATEGORIES.map(c => (
                <option key={c.slug} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] text-aluminum tracking-widest uppercase">
              Base Value (INR) <span className="text-live-red">*</span>
            </label>
            <input
              name="price"
              type="number"
              min="0"
              step="1"
              value={formData.price}
              onChange={handleChange}
              className="bg-[#0a0d0c] border border-aluminum/30 p-3 text-cable-white font-mono text-sm focus:outline-none focus:border-signal transition-colors"
              placeholder="₹ 0.00"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[9px] text-aluminum tracking-widest uppercase">
              Initial Stock
            </label>
            <input
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              className="bg-[#0a0d0c] border border-aluminum/30 p-3 text-cable-white font-mono text-sm focus:outline-none focus:border-signal transition-colors"
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[9px] text-aluminum tracking-widest uppercase">
            Visual Asset (Image URL) <span className="text-live-red">*</span>
          </label>
          <input
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="bg-[#0a0d0c] border border-aluminum/30 p-3 text-cable-white font-mono text-sm focus:outline-none focus:border-signal transition-colors"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        {/* Descriptions */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[9px] text-aluminum tracking-widest uppercase">
            Brief Spec (Short Description)
          </label>
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="bg-[#0a0d0c] border border-aluminum/30 p-3 text-cable-white font-mono text-sm focus:outline-none focus:border-signal transition-colors"
            placeholder="A short summary of the component..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-mono text-[9px] text-aluminum tracking-widest uppercase">
            Full Schematic (Long Description)
          </label>
          <textarea
            name="long_description"
            value={formData.long_description}
            onChange={handleChange}
            rows={5}
            className="bg-[#0a0d0c] border border-aluminum/30 p-3 text-cable-white font-mono text-sm focus:outline-none focus:border-signal transition-colors resize-none"
            placeholder="Detailed technical specifications..."
          />
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-signal text-enclosure font-mono text-[11px] font-bold tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-signal/90 transition-colors shadow-[0_0_15px_rgba(111,231,196,0.3)] hover:shadow-[0_0_25px_rgba(111,231,196,0.5)]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                TRANSMITTING...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                EXECUTE INJECTION
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
