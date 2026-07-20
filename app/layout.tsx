import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './providers';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-display'
});
const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500', '600'],
  subsets: ["latin"],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: "VIGNESH Electrical Power House",
  description: "Hardware, switches, cables, home theatre and electronic items with a practical local-store feel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} bg-enclosure text-cable-white antialiased`}>
        <ThemeProvider>
          <div className="bg-orb-1" />
          <div className="bg-orb-2" />
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
