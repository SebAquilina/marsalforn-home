import Link from "next/link";
import type { D1Database } from "@cloudflare/workers-types";
export const runtime = "edge";
export const dynamic = "force-dynamic";
function db(): D1Database | null {
  const env = process.env as unknown as { DB?: D1Database };
  const g = globalThis as unknown as { DB?: D1Database };
  return env.DB ?? g.DB ?? null;
}
const TABLE = "sales" === "products" ? "products" : "sales" === "collections" ? "collections" : "sales" === "journal" ? "journal_posts" : "sales" === "sales" ? "sale_items" : "sales" === "returns" ? "return_requests" : "wholesale_inquiries";
const TITLE = "sales" === "products" ? "Catalogue · 32 SKUs" : "sales" === "collections" ? "Collections · 4" : "sales" === "journal" ? "Journal · 8 posts" : "sales" === "sales" ? "Sale items · 5 active" : "sales" === "returns" ? "Return requests" : "Wholesale inquiries";
export default async function Page() {
  const d = db();
  let rows: Record<string, unknown>[] = [];
  let count = 0;
  if (d) {
    try {
      const r = await d.prepare("SELECT * FROM " + TABLE + " ORDER BY rowid DESC LIMIT 200").all();
      rows = (r.results as Record<string, unknown>[]) ?? [];
      count = rows.length;
    } catch {}
  }
  if (rows.length === 0) {
    return (
      <>
        <header className="admin-header"><h1>{TITLE}</h1></header>
        <div className="admin-card"><p className="muted">No rows yet.</p></div>
      </>
    );
  }
  const cols = Object.keys(rows[0]);
  return (
    <>
      <header className="admin-header"><div><h1>{TITLE}</h1><p className="muted">{count} rows.</p></div></header>
      <div className="admin-card" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead><tr>{cols.slice(0, 7).map((c) => (<th key={c}>{c}</th>))}</tr></thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {cols.slice(0, 7).map((c) => (
                  <td key={c} className="muted" style={{ maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {String(row[c] ?? "—").slice(0, 80)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted" style={{ marginTop: "var(--space-5)" }}>Read-only on the standard tier — edits via wrangler / d1 console.</p>
    </>
  );
}
