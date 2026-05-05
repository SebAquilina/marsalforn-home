import type { D1Database } from "@cloudflare/workers-types";

export type Product = {
  sku: string; collection_slug: string; name: string; hook: string;
  description_md: string; materials: string; dimensions: string | null;
  weight_g: number | null; country_of_origin: string | null;
  workshop_slug: string | null; price_cents: number; is_made_to_order: number;
  lead_time_days_min: number | null; lead_time_days_max: number | null;
  in_stock_qty: number; active: number; sort_order: number;
};
export type Collection = { slug: string; name: string; hero_md: string; sort_order: number; hero_image: string | null };
export type Workshop = { slug: string; name: string; country: string; founded: string | null; craft: string; story_md: string; sort_order: number };
export type SaleItem = { sku: string; was_price_cents: number; now_price_cents: number; prior_price_from: string; prior_price_to: string };

function db(): D1Database | null {
  const env = process.env as unknown as { DB?: D1Database };
  const g = globalThis as unknown as { DB?: D1Database };
  return env.DB ?? g.DB ?? null;
}

export async function listCollections(): Promise<Collection[]> {
  const d = db(); if (!d) return [];
  const r = await d.prepare("SELECT * FROM collections WHERE active = 1 ORDER BY sort_order").all<Collection>();
  return r.results ?? [];
}
export async function listWorkshops(): Promise<Workshop[]> {
  const d = db(); if (!d) return [];
  const r = await d.prepare("SELECT * FROM workshops ORDER BY sort_order").all<Workshop>();
  return r.results ?? [];
}
export async function listProducts(opts: { collection?: string; activeOnly?: boolean } = {}): Promise<Product[]> {
  const d = db(); if (!d) return [];
  const conds: string[] = []; const args: unknown[] = [];
  if (opts.activeOnly !== false) conds.push("active = 1");
  if (opts.collection) { conds.push("collection_slug = ?"); args.push(opts.collection); }
  const where = conds.length ? `WHERE ${conds.join(" AND ")}` : "";
  const r = await d.prepare(`SELECT * FROM products ${where} ORDER BY sort_order`).bind(...args).all<Product>();
  return r.results ?? [];
}
export async function getProduct(sku: string): Promise<Product | null> {
  const d = db(); if (!d) return null;
  return await d.prepare("SELECT * FROM products WHERE sku = ?").bind(sku).first<Product>() ?? null;
}
export async function listSaleItems(): Promise<Array<SaleItem & Product>> {
  const d = db(); if (!d) return [];
  const r = await d.prepare(`
    SELECT s.*, p.collection_slug, p.name, p.hook, p.description_md, p.materials, p.dimensions, p.weight_g, p.country_of_origin, p.workshop_slug, p.price_cents AS regular_price_cents, p.is_made_to_order, p.lead_time_days_min, p.lead_time_days_max, p.in_stock_qty, p.active, p.sort_order
    FROM sale_items s JOIN products p ON s.sku = p.sku WHERE s.active = 1 AND p.active = 1
    ORDER BY p.sort_order
  `).all<SaleItem & Product & { regular_price_cents: number }>();
  return (r.results as any) ?? [];
}
