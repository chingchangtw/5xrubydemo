"use client";

import { useState } from "react";
import { adminApi, type Option, type OptionType } from "@/services/api";

interface Props {
  drinkId: number;
  options: Option[];
  onChanged: (options: Option[]) => void;
}

const OPTION_TYPES: { value: OptionType; label: string }[] = [
  { value: "size", label: "大小" },
  { value: "sugar", label: "甜度" },
  { value: "ice", label: "冰量" },
  { value: "topping", label: "加料" },
];

export default function OptionEditor({ drinkId, options, onChanged }: Props) {
  const [type, setType] = useState<OptionType>("size");
  const [label, setLabel] = useState("");
  const [priceDelta, setPriceDelta] = useState("0");

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const created = await adminApi.createOption(drinkId, { type, label, price_delta: Number(priceDelta) });
    onChanged([...options, created]);
    setLabel("");
    setPriceDelta("0");
  }

  async function handleDelete(optionId: number) {
    await adminApi.deleteOption(drinkId, optionId);
    onChanged(options.filter((o) => o.id !== optionId));
  }

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      <h3 className="text-sm font-semibold text-gray-600 mb-3">選項管理</h3>

      {options.length > 0 && (
        <ul className="space-y-1 mb-3">
          {options.map((opt) => (
            <li key={opt.id} className="flex items-center gap-2 text-sm">
              <span className="text-gray-400 w-12">{OPTION_TYPES.find((t) => t.value === opt.type)?.label}</span>
              <span className="flex-1">{opt.label}</span>
              {Number(opt.price_delta) > 0 && <span className="text-amber-500">+${opt.price_delta}</span>}
              <button onClick={() => handleDelete(opt.id)} className="text-red-300 hover:text-red-500 text-xs">刪除</button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleAdd} className="flex flex-wrap gap-2">
        <select value={type} onChange={(e) => setType(e.target.value as OptionType)}
          className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm">
          {OPTION_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <input value={label} onChange={(e) => setLabel(e.target.value)}
          placeholder="選項名稱" required
          className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        <input type="number" value={priceDelta} onChange={(e) => setPriceDelta(e.target.value)}
          placeholder="加價" min="0"
          className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm w-20 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-3 py-1.5 rounded-lg">
          新增選項
        </button>
      </form>
    </div>
  );
}
