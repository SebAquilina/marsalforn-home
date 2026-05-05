import { NextResponse } from "next/server";
import type { D1Database } from "@cloudflare/workers-types";
import { getSaveList } from "@/lib/savelist/store";
export const runtime = "edge"; export const dynamic = "force-dynamic";
function db(): D1Database | null {
  const env = process.env as unknown as { DB?: D1Database };
  const g = globalThis as unknown as { DB?: D1Database };
  return env.DB ?? g.DB ?? null;
}
export async function POST(req: Request) {
  const fd = await req.formData();
  const email = String(fd.get("email") ?? "");
  const cid = String(fd.get("cc_cid") ?? "");
  const consent = String(fd.get("consent") ?? "") === "true";
  if (!email || !cid || !consent) return NextResponse.redirect(new URL("/account/save-list?error=invalid", req.url), 303);
  const items = await getSaveList(cid);
  // Persist as a lead so admin can see it
  const d = db();
  if (d) {
    try {
      const id = `lead-savelist-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      await d.prepare("INSERT INTO leads (id, name, email, project_type, brief, consent_at, status, source, cc_cid, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(id, "Save list email", email, "save-list", `Save list (SKUs): ${items.join(", ") || "(empty)"}`, new Date().toISOString(), "new", "save-list-email", cid, new Date().toISOString())
        .run();
    } catch (e) { /* best-effort */ }
  }
  return NextResponse.redirect(new URL("/account/save-list?ok=1", req.url), 303);
}
