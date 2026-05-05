import Link from "next/link";
import { requireAdminPage } from "@/lib/auth";
export const runtime = "edge";
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdminPage();
  return (
    <div className="admin-shell">
      <nav className="admin-nav" aria-label="Admin">
        <h2>marsalforn<span style={{ color: "var(--color-accent)", fontStyle: "italic" }}> home</span></h2>
        <Link href="/admin">Dashboard</Link>
        <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "1rem 0" }} />
        <p className="muted" style={{ fontSize: "0.7em", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 0.4rem" }}>Behavior</p>
        <Link href="/admin/live">Live View</Link>
        <Link href="/admin/analytics">Analytics</Link>
        <Link href="/admin/insights">Insights</Link>
        <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "1rem 0" }} />
        <p className="muted" style={{ fontSize: "0.7em", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 0.4rem" }}>Pipeline</p>
        <Link href="/admin/leads">Leads</Link>
        <Link href="/admin/returns">Returns</Link>
        <Link href="/admin/wholesale">Wholesale</Link>
        <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "1rem 0" }} />
        <p className="muted" style={{ fontSize: "0.7em", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 0.4rem" }}>Catalogue</p>
        <Link href="/admin/products">Products</Link>
        <Link href="/admin/collections">Collections</Link>
        <Link href="/admin/sales">Sales</Link>
        <Link href="/admin/journal">Journal</Link>
        <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "1rem 0" }} />
        <Link href="/admin/agent">Concierge</Link>
        <Link href="/admin/transcripts">Transcripts</Link>
        <Link href="/admin/settings">Settings</Link>
        <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "1rem 0" }} />
        <Link href="/" target="_blank">View site →</Link>
      </nav>
      <div className="admin-main">{children}</div>
    </div>
  );
}
