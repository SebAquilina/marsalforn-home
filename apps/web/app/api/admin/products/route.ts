import { NextResponse } from "next/server";
import { listProducts, listCollections, listSaleItems } from "@/lib/products/store";
export const runtime = "edge"; export const dynamic = "force-dynamic";
export async function GET() {
  const [products, collections, sales] = await Promise.all([listProducts(), listCollections(), listSaleItems()]);
  return NextResponse.json({ ok: true, products, collections, sales });
}
export async function OPTIONS() { return new NextResponse(null, { status: 204, headers: { Allow: "GET, OPTIONS" } }); }
