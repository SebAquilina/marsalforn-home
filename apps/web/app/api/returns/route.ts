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
  const order_ref = String(fd.get("order_ref") ?? "");
  const skus = String(fd.get("skus") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const reason = String(fd.get("reason") ?? "");
  const consent = String(fd.get("consent") ?? "") === "true";
  if (!email || !consent) return NextResponse.redirect(new URL("/returns?error=invalid", req.url), 303);
  const d = db();
  if (d) {
    try {
      const id = `rr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      await d.prepare("INSERT INTO return_requests (id, email, order_ref, reason, skus_json, status) VALUES (?, ?, ?, ?, ?, ?)")
        .bind(id, email, order_ref, reason, JSON.stringify(skus), "requested").run();
    } catch (e) { /* best-effort */ }
  }
  return NextResponse.redirect(new URL("/returns?ok=1", req.url), 303);
}
