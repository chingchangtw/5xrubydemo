"use client";

import { useEffect, useState } from "react";
import { adminApi, menu, type Category } from "@/services/api";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    menu.categories().then(setCategories);
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    const maxOrder = categories.reduce((m, c) => Math.max(m, c.display_order), 0);
    const created = await adminApi.createCategory(newName.trim(), maxOrder + 1);
    setCategories((prev) => [...prev, created]);
    setNewName("");
  }

  async function handleToggleActive(cat: Category) {
    const updated = await adminApi.updateCategory(cat.id, { active: !cat.active });
    setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  }

  async function handleRename(id: number) {
    if (!editName.trim()) return;
    const updated = await adminApi.updateCategory(id, { name: editName.trim() });
    setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setEditingId(null);
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">分類管理</h1>

      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="新增分類名稱"
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg">
          新增
        </button>
      </form>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <span className="text-gray-400 text-sm w-6">{cat.display_order}</span>
            {editingId === cat.id ? (
              <div className="flex-1 flex gap-2">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button onClick={() => handleRename(cat.id)} className="text-amber-500 text-sm font-semibold">儲存</button>
                <button onClick={() => setEditingId(null)} className="text-gray-400 text-sm">取消</button>
              </div>
            ) : (
              <span className={`flex-1 font-medium ${!cat.active ? "text-gray-400 line-through" : ""}`}>{cat.name}</span>
            )}
            <button onClick={() => { setEditingId(cat.id); setEditName(cat.name); }}
              className="text-xs text-gray-400 hover:text-gray-700">編輯</button>
            <button onClick={() => handleToggleActive(cat)}
              className={`text-xs font-semibold ${cat.active ? "text-red-400 hover:text-red-600" : "text-green-500 hover:text-green-700"}`}>
              {cat.active ? "停用" : "啟用"}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
