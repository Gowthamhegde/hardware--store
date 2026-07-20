import AdminProductForm from '@/components/AdminProductForm';
import { Database, Shield } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="font-mono text-[10px] text-aluminum hover:text-signal transition-colors uppercase tracking-widest mb-4 inline-block">
            ← RETURN_TO_SYSTEM
          </Link>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-signal/10 border border-signal/30 flex items-center justify-center text-signal">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-cable-white uppercase tracking-tight">Admin Override</h1>
              <p className="font-mono text-[10px] text-signal tracking-widest uppercase">
                System Clearance: Level 4 [GRANTED]
              </p>
            </div>
          </div>
          <p className="font-mono text-xs text-aluminum/80 mt-4 uppercase">
            Access authorized. Use this terminal to inject new hardware components directly into the main catalog database.
          </p>
        </div>

        {/* Database Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border border-aluminum/20 bg-[#111614] p-4">
            <div className="font-mono text-[9px] text-aluminum tracking-widest uppercase mb-2">Connection Status</div>
            <div className="flex items-center gap-2 font-mono text-xs text-signal font-bold uppercase">
              <span className="w-2 h-2 bg-signal animate-pulse-fast inline-block" />
              ONLINE (SUPABASE_SYNC)
            </div>
          </div>
          <div className="border border-aluminum/20 bg-[#111614] p-4">
            <div className="font-mono text-[9px] text-aluminum tracking-widest uppercase mb-2">Target Node</div>
            <div className="flex items-center gap-2 font-mono text-xs text-cable-white uppercase">
              <Database className="w-3 h-3 text-copper" />
              TABLE: products
            </div>
          </div>
          <div className="border border-aluminum/20 bg-[#111614] p-4">
            <div className="font-mono text-[9px] text-aluminum tracking-widest uppercase mb-2">Write Protocol</div>
            <div className="font-mono text-xs text-live-red uppercase">
              RESTRICTED_UPSERT
            </div>
          </div>
        </div>

        {/* Form Container */}
        <AdminProductForm />

      </div>
    </div>
  );
}
