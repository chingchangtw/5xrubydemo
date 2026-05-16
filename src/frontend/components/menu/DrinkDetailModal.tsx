"use client";

import { useState } from "react";
import { type Drink, type Option } from "@/services/api";
import { useCart } from "@/components/cart/CartContext";

interface Props {
  drink: Drink;
  onClose: () => void;
}

type SelectedOptions = Record<string, Option>;

function groupOptions(options: Option[]): Record<string, Option[]> {
  return options.reduce<Record<string, Option[]>>((acc, opt) => {
    if (!acc[opt.type]) acc[opt.type] = [];
    acc[opt.type].push(opt);
    return acc;
  }, {});
}

const TYPE_LABELS: Record<string, string> = {
  size: "大小",
  sugar: "甜度",
  ice: "冰量",
  topping: "加料",
};

export default function DrinkDetailModal({ drink, onClose }: Props) {
  const grouped = groupOptions(drink.options);
  const { addItem } = useCart();

  // Pre-select first option in each group
  const defaultSelections = Object.fromEntries(
    Object.entries(grouped).map(([type, opts]) => [type, opts[0]])
  );

  const [selected, setSelected] = useState<SelectedOptions>(defaultSelections);
  const [quantity, setQuantity] = useState(1);

  const priceDelta = Object.values(selected).reduce((sum, o) => sum + Number(o.price_delta), 0);
  const unitPrice = Number(drink.base_price) + priceDelta;

  function handleAdd() {
    addItem({
      drink_id: drink.id,
      drink_name: drink.name,
      quantity,
      unit_price: unitPrice,
      customizations: Object.fromEntries(
        Object.entries(selected).map(([type, opt]) => [type, opt.label])
      ),
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-1">{drink.name}</h2>
        <p className="text-gray-500 text-sm mb-4">{drink.description}</p>

        {Object.entries(grouped).map(([type, opts]) => (
          <div key={type} className="mb-4">
            <p className="font-medium text-gray-700 mb-2">{TYPE_LABELS[type] ?? type}</p>
            <div className="flex flex-wrap gap-2">
              {opts.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelected((prev) => ({ ...prev, [type]: opt }))}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors
                    ${selected[type]?.id === opt.id
                      ? "bg-amber-500 text-white border-amber-500"
                      : "border-gray-200 text-gray-700 hover:border-amber-400"}`}
                >
                  {opt.label}
                  {Number(opt.price_delta) > 0 && (
                    <span className="ml-1 text-xs">+${opt.price_delta}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Quantity */}
        <div className="flex items-center gap-3 my-4">
          <span className="text-gray-700 font-medium">數量</span>
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-full border border-gray-300 text-lg leading-none hover:bg-gray-100">−</button>
          <span className="w-6 text-center font-semibold">{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)}
            className="w-8 h-8 rounded-full border border-gray-300 text-lg leading-none hover:bg-gray-100">+</button>
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          加入購物車 — NT${(unitPrice * quantity).toFixed(0)}
        </button>
      </div>
    </div>
  );
}
