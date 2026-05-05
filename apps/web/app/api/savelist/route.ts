import { NextResponse } from "next/server";
import { z } from "zod";
import { getSaveList, setSaveList } from "@/lib/savelist/store";
import { getProduct } from "@/lib/products/store";
export const runtime = "edge"; export const dynamic = "force-dynamic";
const PostBody = z.object({
  client_id: z.string().regex(/^[0-9a-f-]{20,40}$/i),
  action: z.enum(["add", "remove", "clear"]),
  sku: z.string().optional(),
});
export async function GET(req: Request) {
  const url = new URL(req.url); const cid = url.searchParams.get("client_id") ?? "";
  if (!/^[0-9a-f-]{20,40}$/i.test(cid)) return NextResponse.json({ ok: false }, { status: 400 });
  return NextResponse.json({ ok: true, items: await getSaveList(cid) }, { headers: { "Cache-Control": "no-store" } });
}
export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const p = PostBody.safeParse(body);
  if (!p.success) return NextResponse.json({ ok: false }, { status: 422 });
  let items = await getSaveList(p.data.client_id);
  if (p.data.action === "clear") items = [];
  else if (p.data.action === "add" && p.data.sku) {
    const prod = await getProduct(p.data.sku);
    if (prod && !items.includes(p.data.sku)) items.push(p.data.sku);
  } else if (p.data.action === "remove" && p.data.sku) {
    items = items.filter((s) => s !== p.data.sku);
  }
  await setSaveList(p.data.client_id, items);
  return NextResponse.json({ ok: true, items }, { headers: { "Cache-Control": "no-store" } });
}
