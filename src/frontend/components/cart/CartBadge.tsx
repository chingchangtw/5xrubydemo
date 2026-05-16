"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartBadge() {
  const { totalCount } = useCart();
  return (
    <Link href="/cart" className="relative inline-flex items-center p-2">
      <span className="text-2xl">🛒</span>
      {totalCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1">
          {totalCount > 99 ? "99+" : totalCount}
        </span>
      )}
    </Link>
  );
}
