import TechnicalNav from '@/components/TechnicalNav';
import Footer from '@/components/Footer';
import CompareDrawer from '@/components/CompareDrawer';
import CartDrawer from '@/components/CartDrawer';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-enclosure relative overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-screen">
        <TechnicalNav />
        <main className="flex-grow pt-24 pb-12">
          {children}
        </main>
        <Footer />
        <CompareDrawer />
        <CartDrawer />
      </div>
    </div>
  );
}
