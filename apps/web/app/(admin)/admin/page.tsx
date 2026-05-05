import Link from "next/link";
export const runtime = "edge"; export const dynamic = "force-dynamic";
export default function AdminIndex() {
  return (
    <>
      <header className="admin-header"><div><h1>Marsalforn Home admin</h1><p className="muted">Premium tier. 32 SKUs · 4 collections · 8 journal posts · cart + save lists + returns + wholesale.</p></div></header>
      <div className="admin-card">
        <ul>
          <li><Link href="/admin/live">Live</Link> — who's on the site, where, in which class.</li>
          <li><Link href="/admin/products">Products</Link> — 32 SKUs.</li>
          <li><Link href="/admin/leads">Leads</Link> + <Link href="/admin/returns">Returns</Link> + <Link href="/admin/wholesale">Wholesale</Link> — three pipelines.</li>
          <li><Link href="/admin/insights">Insights</Link> — Daily Pulse + Behavior reports.</li>
          <li><Link href="/admin/journal">Journal</Link> — 8 published.</li>
        </ul>
      </div>
    </>
  );
}
