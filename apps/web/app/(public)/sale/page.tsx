import Link from "next/link";
import { listSaleItems } from "@/lib/products/store";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const metadata = { title: "Sale — Marsalforn Home", alternates: { canonical: "/sale" } };

const EUR = (c: number) => `€${(c / 100).toFixed(0)}`;

export default async function SalePage() {
  const items = await listSaleItems();
  return (
    <>
      <section>
        <div className="container">
          <p className="eyebrow">Sale</p>
          <h1>Five pieces, marked down.</h1>
          <p className="lead muted">EU Omnibus disclosure: every price below shows the prior 30-day price ("was €X") effective from the date stated. We don't run permanent sales — these are end-of-season markdowns.</p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="catalog-grid">
            {items.map((p: any) => (
              <article key={p.sku} className="catalog-card">
                <Link href={`/p/${p.sku}`} className="catalog-card-img" style={{ backgroundImage: `url(/lookbook/${p.collection_slug}.svg)` }} aria-hidden="true" />
                <div className="catalog-card-body">
                  <p className="meta">{p.collection_slug.toUpperCase()}</p>
                  <h3><Link href={`/p/${p.sku}`}>{p.name}</Link></h3>
                  <p className="muted">{p.hook}</p>
                  <div className="price-block">
                    <span className="price-now">{EUR(p.now_price_cents)}</span>
                    <span className="price-was">was {EUR(p.was_price_cents)}</span>
                  </div>
                  <p className="meta muted">
                    Prior price effective {new Date(p.prior_price_from).toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – {new Date(p.prior_price_to).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
