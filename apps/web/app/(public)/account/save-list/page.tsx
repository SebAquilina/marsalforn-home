import Link from "next/link";
import { ClientIdField } from "@/components/analytics/ClientIdField";
export const runtime = "edge"; export const dynamic = "force-dynamic";
export const metadata = { title: "Save list — Marsalforn Home", alternates: { canonical: "/account/save-list" } };

export default function SaveListPage() {
  return (
    <section>
      <div className="container container--narrow">
        <p className="eyebrow">Save list</p>
        <h1>Items you've saved.</h1>
        <p className="lead muted">Cookie-keyed, no account needed. Your save list lives in your browser; if you clear cookies it's gone.</p>

        <div className="admin-card" style={{ background: "var(--color-surface)", marginTop: "var(--space-5)" }}>
          <p className="muted">Your save list is empty. Save items from any product page, or ask Mateo: "save the brass pepper mill". Then come back here to email the list to yourself.</p>
        </div>

        <h2 style={{ marginTop: "var(--space-7)" }}>Email me this list</h2>
        <form action="/api/savelist/email" method="post" className="form-grid">
          <ClientIdField />
          <div className="form-row"><label>Email <input type="email" name="email" required autoComplete="email" /></label></div>
          <div className="form-row">
            <label className="checkbox"><input type="checkbox" name="consent" value="true" required /><span>OK to send my save list and one follow-up email about the items.</span></label>
          </div>
          <button type="submit" className="btn btn-primary">Email my list →</button>
        </form>
        <p className="muted" style={{ marginTop: "var(--space-5)" }}>
          Concept site — your saved items + your email land at portfolio@concierge.studio so the operator can come back to you.
        </p>
      </div>
    </section>
  );
}
