import { NextResponse } from "next/server";
const GUIDES: Record<string, string> = {
  copper: "Hot water + soft cloth. Never dishwasher. Wipe immediately if simmering acidic. Re-tin every 5-30 years (€60). Brass handles patina; don't fight it.",
  brass: "Patinas with use. Brasso once a quarter for shiny; let it warm for slow. Wipe with damp cloth.",
  linen: "Machine-wash cold, tumble-dry low or line-dry. Softens with use. We don't iron ours.",
  terracotta: "Dishwasher-safe (we hand-wash). Don't soak overnight. Each piece varies — that's the point.",
  walnut: "Mineral oil monthly. Hand-wash, dry upright. Never dishwasher (cracks the grain).",
  "olive-wood": "Mineral oil twice a year. Hand-wash, air-dry upright.",
  limestone: "Rinse and air-dry. Will develop a soap-stain patina; expected.",
};
export const runtime = "edge"; export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const url = new URL(req.url); const m = url.searchParams.get("material") ?? "";
  const guide = GUIDES[m];
  if (!guide) return NextResponse.json({ ok: false, error: "unknown_material", known: Object.keys(GUIDES) }, { status: 404 });
  return NextResponse.json({ ok: true, material: m, guide }, { headers: { "Cache-Control": "no-store" } });
}
