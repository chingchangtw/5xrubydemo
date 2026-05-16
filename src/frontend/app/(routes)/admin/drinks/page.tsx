"use client";

import { useEffect, useState } from "react";
import { adminApi, menu, type Category, type Drink } from "@/services/api";
import OptionEditor from "@/components/menu/OptionEditor";

export default function AdminDrinksPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCat, setActiveCat] = useState<number | null>(null);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // New drink form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    menu.categories().then((cats) => {
      setCategories(cats);
      if (cats.length > 0) setActiveCat(cats[0].id);
    });
  }, []);

  useEffect(() => {
    if (activeCat == null) return;
    menu.drinksByCategory(activeCat).then(setDrinks);
  }, [activeCat]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!activeCat) return;
    const created = await adminApi.createDrink({
      category_id: activeCat,
      name,
      description: description || null,
      base_price: Number(price),
      image_url: null,
    });
    setDrinks((prev) => [...prev, created]);
    setName(""); setDescription(""); setPrice("");
  }

  async function handleToggleActive(drink: Drink) {
    const updated = await adminApi.updateDrink(drink.id, { active: !drink.active });
    setDrinks((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
  }

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">飲品管理</h1>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto mb-6">
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setActiveCat(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${activeCat === cat.id ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Add drink form */}
      <form onSubmit={handleCreate} className="bg-white rounded-xl border border-gray-100 p-4 mb-6 space-y-2">
        <p className="font-semibold text-sm text-gray-600 mb-2">新增飲品</p>
        <div className="flex gap-2 flex-wrap">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="飲品名稱" required
            className="flex-1 min-w-[120px] border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="售價" type="number" min="0" required
            className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
        </div>
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="描述（選填）"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
        <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg">
          新增
        </button>
      </form>

      {/* Drink list */}
      <ul className="space-y-3">
        {drinks.map((drink) => (
          <li key={drink.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className={`font-semibold ${!drink.active ? "text-gray-400 line-through" : ""}`}>{drink.name}</p>
                <p className="text-sm text-gray-400">{drink.description}</p>
                <p className="text-sm text-amber-600 font-medium mt-0.5">NT${drink.base_price}</p>
              </div>
              <button onClick={() => setExpandedId(expandedId === drink.id ? null : drink.id)}
                className="text-xs text-gray-400 hover:text-gray-700">
                {expandedId === drink.id ? "收起" : "選項"}
              </button>
              <button onClick={() => handleToggleActive(drink)}
                className={`text-xs font-semibold ${drink.active ? "text-red-400 hover:text-red-600" : "text-green-500"}`}>
                {drink.active ? "停用" : "啟用"}
              </button>
            </div>

            {expandedId === drink.id && (
              <OptionEditor
                drinkId={drink.id}
                options={drink.options}
                onChanged={(opts) =>
                  setDrinks((prev) => prev.map((d) => d.id === drink.id ? { ...d, options: opts } : d))
                }
              />
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
