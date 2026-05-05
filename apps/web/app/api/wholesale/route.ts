import { NextResponse } from "next/server";
import type { D1Database } from "@cloudflare/workers-types";
export const runtime = "edge"; export const dynamic = "force-dynamic";
function db(): D1Database | null {
  const env = process.env as unknown as { DB?: D1Database };
  const g = globalThis as unknown as { DB?: D1Database };
  return env.DB ?? g.DB ?? null;
}
export async function POST(req: Request) {
  const fd = await req.formData();
  const email = String(fd.get("email") ?? "");
  const business_name = String(fd.get("business_name") ?? "");
  const rooms = Number(fd.get("rooms_or_units") ?? "0");
  const value_eur = Number(fd.get("estimated_value_eur") ?? "0");
  const notes = String(fd.get("notes") ?? "");
  if (!email) return NextResponse.json({ ok: false }, { status: 422 });
  const d = db();
  if (d) {
    try {
      const id = `ws-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      await d.prepare("INSERT INTO wholesale_inquiries (id, email, business_name, rooms_or_units, estimated_value_cents, notes, status) VALUES (?, ?, ?, ?, ?, ?, ?)")
        .bind(id, email, business_name, rooms, Math.round(value_eur * 100), notes, "new").run();
    } catch (e) { /* best-effort */ }
  }
  return NextResponse.json({ ok: true });
}
