import { NextResponse } from "next/server";
import { listProducts, listSaleItems } from "@/lib/products/store";
export const runtime = "edge"; export const dynamic = "force-dynamic";
export async function GET() {
  const [products, sales] = await Promise.all([listProducts(), listSaleItems()]);
  return NextResponse.json({ ok: true, products, sales }, { headers: { "Cache-Control": "no-store" } });
}
export async function OPTIONS() { return new NextResponse(null, { status: 204, headers: { Allow: "GET, OPTIONS" } }); }
