const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({ detail: res.statusText }));
    throw Object.assign(new Error(detail.detail ?? res.statusText), { status: res.status });
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export type Role = "staff" | "admin";

export interface LoginResponse {
  access_token: string;
  token_type: string;
  role: Role;
}

export const auth = {
  login: (username: string, password: string) =>
    request<LoginResponse>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  logout: () => request<void>("/api/v1/auth/logout", { method: "POST" }),
};

// ── Menu ──────────────────────────────────────────────────────────────────────

export type OptionType = "size" | "sugar" | "ice" | "topping";

export interface Option {
  id: number;
  type: OptionType;
  label: string;
  price_delta: number;
}

export interface Drink {
  id: number;
  category_id: number;
  name: string;
  description: string | null;
  base_price: number;
  image_url: string | null;
  active: boolean;
  options: Option[];
}

export interface Category {
  id: number;
  name: string;
  display_order: number;
  active: boolean;
}

export const menu = {
  categories: () => request<Category[]>("/api/v1/categories"),
  drinksByCategory: (categoryId: number) =>
    request<Drink[]>(`/api/v1/categories/${categoryId}/drinks`),
  drink: (drinkId: number) => request<Drink>(`/api/v1/drinks/${drinkId}`),
};

// ── Orders ────────────────────────────────────────────────────────────────────

export type OrderStatus = "pending" | "preparing" | "ready" | "completed";

export interface CartItem {
  drink_id: number;
  quantity: number;
  unit_price: number;
  customizations?: Record<string, unknown> | null;
}

export interface OrderItem {
  id: number;
  drink_id: number;
  quantity: number;
  unit_price: number;
  customizations: Record<string, unknown> | null;
}

export interface Order {
  id: number;
  status: OrderStatus;
  created_at: string;
  note: string | null;
  items: OrderItem[];
}

export const orders = {
  create: (items: CartItem[], note?: string) =>
    request<Order>("/api/v1/orders", {
      method: "POST",
      body: JSON.stringify({ items, note }),
    }),
  list: () => request<Order[]>("/api/v1/orders"),
  updateStatus: (orderId: number, newStatus: OrderStatus) =>
    request<Order>(`/api/v1/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
    }),
};

// ── Admin ─────────────────────────────────────────────────────────────────────

export const adminApi = {
  // Categories
  createCategory: (name: string, display_order = 0) =>
    request<Category>("/api/v1/admin/categories", {
      method: "POST",
      body: JSON.stringify({ name, display_order }),
    }),
  updateCategory: (id: number, patch: Partial<Category>) =>
    request<Category>(`/api/v1/admin/categories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),
  deleteCategory: (id: number) =>
    request<void>(`/api/v1/admin/categories/${id}`, { method: "DELETE" }),

  // Drinks
  createDrink: (body: Omit<Drink, "id" | "active" | "options">) =>
    request<Drink>("/api/v1/admin/drinks", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updateDrink: (id: number, patch: Partial<Drink>) =>
    request<Drink>(`/api/v1/admin/drinks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),
  deleteDrink: (id: number) =>
    request<void>(`/api/v1/admin/drinks/${id}`, { method: "DELETE" }),

  // Options
  createOption: (drinkId: number, option: Omit<Option, "id">) =>
    request<Option>(`/api/v1/admin/drinks/${drinkId}/options`, {
      method: "POST",
      body: JSON.stringify(option),
    }),
  updateOption: (drinkId: number, optionId: number, patch: Partial<Option>) =>
    request<Option>(`/api/v1/admin/drinks/${drinkId}/options/${optionId}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),
  deleteOption: (drinkId: number, optionId: number) =>
    request<void>(`/api/v1/admin/drinks/${drinkId}/options/${optionId}`, { method: "DELETE" }),
};
