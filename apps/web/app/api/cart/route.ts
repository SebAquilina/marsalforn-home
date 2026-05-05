import { NextResponse } from "next/server";
import { z } from "zod";
import { getCart, setCart, type CartItem } from "@/lib/cart/store";
import { getProduct } from "@/lib/products/store";

export const runtime = "edge"; export const dynamic = "force-dynamic";

const PostBody = z.object({
  client_id: z.string().regex(/^[0-9a-f-]{20,40}$/i),
  action: z.enum(["add", "remove", "update", "clear"]),
  sku: z.string().optional(),
  qty: z.number().int().min(0).max(20).optional(),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cid = url.searchParams.get("client_id") ?? "";
  if (!/^[0-9a-f-]{20,40}$/i.test(cid)) return NextResponse.json({ ok: false, error: "bad_cid" }, { status: 400 });
  const cart = await getCart(cid);
  return NextResponse.json({ ok: true, cart }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 }); }
  const parsed = PostBody.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  const { client_id, action, sku, qty } = parsed.data;
  const cart = await getCart(client_id);
  let items = [...cart.items];
  if (action === "clear") items = [];
  else if (action === "add" && sku) {
    const product = await getProduct(sku);
    if (!product || !product.active) return NextResponse.json({ ok: false, error: "no_product" }, { status: 404 });
    const existing = items.find((i) => i.sku === sku);
    if (existing) existing.qty = Math.min(20, existing.qty + (qty ?? 1));
    else items.push({ sku, qty: qty ?? 1, price_cents_at_add: product.price_cents });
  } else if (action === "remove" && sku) {
    items = items.filter((i) => i.sku !== sku);
  } else if (action === "update" && sku && qty !== undefined) {
    const existing = items.find((i) => i.sku === sku);
    if (existing) {
      if (qty === 0) items = items.filter((i) => i.sku !== sku);
      else existing.qty = qty;
    }
  }
  await setCart(client_id, items);
  return NextResponse.json({ ok: true, cart: { ...cart, items } }, { headers: { "Cache-Control": "no-store" } });
}
