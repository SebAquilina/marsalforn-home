import Link from "next/link";
export const dynamic = "force-static";
export const runtime = "edge";
export const metadata = { title: "Terms — Marsalforn Home", alternates: { canonical: "/terms" } };
export default function TermsPage() {
  return (
    <section>
      <div className="container container--narrow">
        <p className="eyebrow">Terms</p>
        <h1>Concept-site terms.</h1>
        <p>Marsalforn Home is a concept site by concierge.studio — a portfolio piece. No goods or services are sold. No order is shipped. The contact form sends an email to a real inbox.</p>
        <h2>EU CRD compliance (illustrative)</h2>
        <p>14-day right of withdrawal on in-stock goods. Made-to-order items not returnable unless faulty (Art. 16(c)). Pre-contract info shown at /cart.</p>
        <h2>Privacy</h2>
        <p>See <Link href="/privacy">/privacy</Link>.</p>
      </div>
    </section>
  );
}
