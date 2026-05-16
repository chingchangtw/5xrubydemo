"use client";

import { useEffect, useRef, useState } from "react";
import { orders as ordersApi, type Order } from "@/services/api";
import OrderCard from "@/components/order/OrderCard";

export default function OrdersPage() {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Initial fetch of active orders
  useEffect(() => {
    ordersApi.list()
      .then((data) => setOrderList(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // SSE subscription for live updates
  useEffect(() => {
    const es = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/v1/orders/stream`,
      { withCredentials: true }
    );
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.event === "new_order" || data.event === "order_updated") {
          // Refresh full list on any change
          ordersApi.list().then(setOrderList);
        }
      } catch {
        // ignore parse errors
      }
    };

    return () => es.close();
  }, []);

  function handleUpdated(updated: Order) {
    setOrderList((prev) =>
      updated.status === "completed"
        ? prev.filter((o) => o.id !== updated.id)
        : prev.map((o) => (o.id === updated.id ? updated : o))
    );
  }

  if (loading) return <main className="p-8 text-center">載入中…</main>;

  const byStatus = {
    pending: orderList.filter((o) => o.status === "pending"),
    preparing: orderList.filter((o) => o.status === "preparing"),
    ready: orderList.filter((o) => o.status === "ready"),
  };

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">訂單佇列</h1>

      {orderList.length === 0 ? (
        <p className="text-center text-gray-400 py-16">目前沒有待處理訂單</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {(["pending", "preparing", "ready"] as const).map((status) => (
            <div key={status}>
              <h2 className="font-semibold text-gray-500 text-sm uppercase tracking-wide mb-3">
                {status === "pending" ? "待製作" : status === "preparing" ? "製作中" : "已完成"}
                {byStatus[status].length > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                    {byStatus[status].length}
                  </span>
                )}
              </h2>
              <div className="space-y-3">
                {byStatus[status].map((order) => (
                  <OrderCard key={order.id} order={order} onUpdated={handleUpdated} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
