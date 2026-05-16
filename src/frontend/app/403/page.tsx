import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <p className="text-6xl mb-4">🚫</p>
      <h1 className="text-2xl font-bold mb-2">無存取權限</h1>
      <p className="text-gray-400 mb-6">您的帳號沒有存取此頁面的權限。</p>
      <Link href="/orders" className="text-amber-500 underline text-sm">返回訂單頁面</Link>
    </main>
  );
}
