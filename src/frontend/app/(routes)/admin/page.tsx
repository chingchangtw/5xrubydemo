import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="max-w-md mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">管理後台</h1>
      <Link href="/admin/categories"
        className="block bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
        <p className="font-semibold">分類管理</p>
        <p className="text-sm text-gray-400 mt-1">新增、編輯、啟停用分類</p>
      </Link>
      <Link href="/admin/drinks"
        className="block bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
        <p className="font-semibold">飲品管理</p>
        <p className="text-sm text-gray-400 mt-1">新增飲品、管理選項、啟停用</p>
      </Link>
    </main>
  );
}
