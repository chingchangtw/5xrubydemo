"use client";

import { type Order, type OrderStatus, orders as ordersApi } from "@/services/api";

interface Props {
  order: Order;
  onUpdated: (updated: Order) => void;
}

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "待製作",
  preparing: "製作中",
  ready: "已完成",
  completed: "已取餐",
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  preparing: "bg-blue-100 text-blue-800",
  ready: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-500",
};

const NEXT_ACTION: Record<OrderStatus, { label: string; next: OrderStatus } | null> = {
  pending: { label: "開始製作", next: "preparing" },
  preparing: { label: "標記完成", next: "ready" },
  ready: { label: "已取餐", next: "completed" },
  completed: null,
};

export default function OrderCard({ order, onUpdated }: Props) {
  const action = NEXT_ACTION[order.status];

  async function advance() {
    if (!action) return;
    const updated = await ordersApi.updateStatus(order.id, action.next);
    onUpdated(updated);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-gray-900">#{order.id}</span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLOR[order.status]}`}>
          {STATUS_LABEL[order.status]}
        </span>
      </div>

      <ul className="space-y-1 mb-3">
        {order.items.map((item) => (
          <li key={item.id} className="text-sm text-gray-700 flex justify-between">
            <span>{item.quantity}× 飲品 #{item.drink_id}</span>
            <span className="text-gray-400">NT${item.unit_price}</span>
          </li>
        ))}
      </ul>

      {order.note && (
        <p className="text-xs text-gray-400 mb-3 italic">備註：{order.note}</p>
      )}

      <p className="text-xs text-gray-400 mb-3">
        {new Date(order.created_at).toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })}
      </p>

      {action && (
        <button
          onClick={advance}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-2 rounded-lg transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
