import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products/store";
export const runtime = "edge"; export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const url = new URL(req.url); const sku = url.searchParams.get("sku");
  if (!sku) return NextResponse.json({ ok: false }, { status: 400 });
  const p = await getProduct(sku);
  if (!p) return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  return NextResponse.json({
    ok: true, sku, name: p.name,
    is_made_to_order: !!p.is_made_to_order,
    lead_time_days: p.is_made_to_order ? `${p.lead_time_days_min}-${p.lead_time_days_max}` : "in stock, ships within 24h"
  }, { headers: { "Cache-Control": "no-store" } });
}
