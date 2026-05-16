"use client";

import { useEffect, useState } from "react";
import { menu, type Category, type Drink } from "@/services/api";
import DrinkDetailModal from "@/components/menu/DrinkDetailModal";

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCat, setActiveCat] = useState<number | null>(null);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    menu.categories()
      .then((cats) => {
        setCategories(cats);
        if (cats.length > 0) setActiveCat(cats[0].id);
      })
      .catch(() => setError("無法連接伺服器，請確認後端是否已啟動"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeCat == null) return;
    menu.drinksByCategory(activeCat).then(setDrinks).catch(() => {});
  }, [activeCat]);

  if (loading) return <main className="p-8 text-center">載入中…</main>;

  if (error) return (
    <main className="p-8 text-center">
      <p className="text-4xl mb-3">⚠️</p>
      <p className="text-red-500 font-medium">{error}</p>
      <button onClick={() => { setError(null); setLoading(true); menu.categories().then((cats) => { setCategories(cats); if (cats.length > 0) setActiveCat(cats[0].id); }).catch(() => setError("無法連接伺服器，請確認後端是否已啟動")).finally(() => setLoading(false)); }}
        className="mt-4 text-amber-500 underline text-sm">重試</button>
    </main>
  );

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">飲品菜單</h1>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${activeCat === cat.id
                ? "bg-amber-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Drink grid */}
      {drinks.length === 0 ? (
        <p className="text-gray-400 text-center py-12">此分類目前沒有飲品</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {drinks.map((drink) => (
            <button
              key={drink.id}
              onClick={() => setSelectedDrink(drink)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-left hover:shadow-md transition-shadow"
            >
              {drink.image_url && (
                <img src={drink.image_url} alt={drink.name} className="w-full h-32 object-cover rounded-lg mb-3" />
              )}
              <h3 className="font-semibold text-gray-900">{drink.name}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{drink.description}</p>
              <p className="mt-2 text-amber-600 font-bold">NT${drink.base_price}</p>
            </button>
          ))}
        </div>
      )}

      {selectedDrink && (
        <DrinkDetailModal drink={selectedDrink} onClose={() => setSelectedDrink(null)} />
      )}
    </main>
  );
}
