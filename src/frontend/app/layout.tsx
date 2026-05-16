import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import CartBadge from "@/components/cart/CartBadge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "飲料訂購",
  description: "線上訂飲料",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="bg-gray-50 min-h-screen">
        <CartProvider>
          <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
              <Link href="/menu" className="font-bold text-lg text-amber-500">🧋 飲料訂購</Link>
              <CartBadge />
            </div>
          </header>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
