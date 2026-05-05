export const dynamic = "force-static";
import Link from "next/link";
export const runtime = "edge";
export const metadata = { title: "Concept", alternates: { canonical: "/concept" } };
export default function ConceptPage() {
  return (
    <section>
      <div className="container container--narrow">
        <p className="eyebrow">Concept site</p>
        <h1>What you're looking at.</h1>
        <p>
          Marsalforn Home is a concept site by{" "}
          <a href="https://concierge.studio" target="_blank" rel="noreferrer">concierge.studio</a>. The brand,
          the founder, the workshops, the photography — all invented for this portfolio piece. Everything
          else is exactly what a real Marsalforn Home client would get on the <strong>Premium tier</strong>.
        </p>
        <p>
          What's <strong>real</strong>: the concierge (Mateo runs on Gemini Flash-Lite), the catalogue (32 SKUs
          in D1), the cart and save list (D1-backed, cookie-keyed), the EU compliance (Omnibus 30-day prior
          price on /sale, CRD pre-contract info on /cart, 14-day returns, made-to-order exclusion under Art. 16(c)),
          and the admin (Shopify-grade with /admin/{`{`}live, leads, products, journal, sales, returns, wholesale, insights, analytics, agent, settings{`}`}).
        </p>
        <p>
          What's <strong>not</strong>: no card is charged, no order is placed, no return is processed for
          real. The "workshops" are described in fictional-but-plausible detail — none are named brands.
          The "Marsalforn warehouse" is real to the extent that there's an address; no one ships from it.
        </p>
        <p>
          Want one of these for your own business? <Link href="https://concierge.studio">See pricing →</Link>
        </p>
      </div>
    </section>
  );
}
