import type { D1Database } from "@cloudflare/workers-types";

export type CartItem = { sku: string; qty: number; price_cents_at_add: number };
export type Cart = { client_id: string; items: CartItem[]; updated_at: string };

function db(): D1Database | null {
  const env = process.env as unknown as { DB?: D1Database };
  const g = globalThis as unknown as { DB?: D1Database };
  return env.DB ?? g.DB ?? null;
}

export async function getCart(clientId: string): Promise<Cart> {
  const d = db(); if (!d) return { client_id: clientId, items: [], updated_at: "" };
  const r = await d.prepare("SELECT * FROM carts WHERE client_id = ?").bind(clientId).first<{ client_id: string; items_json: string; updated_at: string }>();
  if (!r) return { client_id: clientId, items: [], updated_at: "" };
  let items: CartItem[] = [];
  try { items = JSON.parse(r.items_json); } catch {}
  return { client_id: clientId, items, updated_at: r.updated_at };
}
export async function setCart(clientId: string, items: CartItem[]): Promise<void> {
  const d = db(); if (!d) return;
  await d.prepare(`INSERT INTO carts (client_id, items_json, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
                   ON CONFLICT(client_id) DO UPDATE SET items_json = excluded.items_json, updated_at = CURRENT_TIMESTAMP`)
   .bind(clientId, JSON.stringify(items)).run();
}
