import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
      <h1 className="text-4xl font-bold text-amber-500">🧋 飲料訂購</h1>
      <p className="text-gray-500">新鮮現調，快速取餐</p>
      <Link href="/menu"
        className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-xl text-lg transition-colors">
        立即點餐
      </Link>
    </main>
  );
}
