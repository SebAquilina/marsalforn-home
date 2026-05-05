import Link from "next/link";
export const runtime = "edge"; export const dynamic = "force-static";
export const metadata = { title: "Account — Marsalforn Home", alternates: { canonical: "/account" } };
export default function AccountPage() {
  return (
    <section>
      <div className="container container--narrow">
        <p className="eyebrow">Account</p>
        <h1>No account, no problem.</h1>
        <p className="lead muted">Marsalforn Home doesn't ask for an account. Your bag and save list both persist in your browser via cookies — they survive a browser restart but not a cookie clear.</p>
        <div className="hero-ctas" style={{ justifyContent: "center", marginTop: "var(--space-5)" }}>
          <Link href="/account/save-list" className="btn btn-primary">My save list →</Link>
          <Link href="/cart" className="btn btn-secondary">My bag →</Link>
        </div>
      </div>
    </section>
  );
}
