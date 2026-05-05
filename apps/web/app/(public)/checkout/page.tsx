export const dynamic = "force-static";
import Link from "next/link";
export const runtime = "edge";
export const metadata = { title: "Checkout — Marsalforn Home", alternates: { canonical: "/checkout" } };
export default function CheckoutPage() {
  return (
    <section>
      <div className="container container--narrow" style={{ textAlign: "center", paddingTop: "var(--space-8)", paddingBottom: "var(--space-8)" }}>
        <p className="eyebrow">Checkout</p>
        <h1>Checkout is disabled.</h1>
        <p className="lead">Marsalforn Home is a concept site by concierge.studio — no card is charged, no order placed. The cart, the save list, the EU CRD pre-contract disclosures, the shipping rates: all real. Just the final payment step is intentionally turned off.</p>
        <div className="hero-ctas" style={{ justifyContent: "center", marginTop: "var(--space-6)" }}>
          <Link href="/#concierge" className="btn btn-primary">Talk to Mateo →</Link>
          <Link href="/concept" className="btn btn-secondary">What is this site?</Link>
        </div>
      </div>
    </section>
  );
}
