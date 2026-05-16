"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { orders, type CartItem as ApiCartItem } from "@/services/api";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clear, subtotal } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedOrderId, setConfirmedOrderId] = useState<number | null>(null);
  const router = useRouter();

  async function handlePlaceOrder() {
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const payload: ApiCartItem[] = items.map((i) => ({
        drink_id: i.drink_id,
        quantity: i.quantity,
        unit_price: i.unit_price,
        customizations: i.customizations,
      }));
      const order = await orders.create(payload);
      clear();
      setConfirmedOrderId(order.id);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "下單失敗，請再試一次");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmedOrderId) {
    return (
      <main className="max-w-md mx-auto p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2">訂單已送出！</h2>
        <p className="text-gray-500 mb-1">訂單編號</p>
        <p className="text-3xl font-bold text-amber-500 mb-6">#{confirmedOrderId}</p>
        <button onClick={() => router.push("/menu")}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl">
          繼續點餐
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">購物車</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🧋</p>
          <p>購物車是空的</p>
          <button onClick={() => router.push("/menu")}
            className="mt-4 text-amber-500 underline text-sm">去點餐</button>
        </div>
      ) : (
        <>
          <ul className="space-y-3 mb-6">
            {items.map((item) => (
              <li key={item.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{item.drink_name}</p>
                    {item.customizations && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {Object.values(item.customizations).join(" / ")}
                      </p>
                    )}
                    <p className="text-amber-600 font-medium mt-1">NT${item.unit_price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 hover:bg-gray-100 text-sm">−</button>
                    <span className="w-4 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 hover:bg-gray-100 text-sm">+</button>
                    <button onClick={() => removeItem(item.id)}
                      className="ml-2 text-gray-300 hover:text-red-400 text-lg">×</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t pt-4 mb-4 flex justify-between font-semibold text-lg">
            <span>小計</span>
            <span>NT${subtotal.toFixed(0)}</span>
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            onClick={handlePlaceOrder}
            disabled={submitting}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {submitting ? "送出中…" : "確認下單"}
          </button>
        </>
      )}
    </main>
  );
}
