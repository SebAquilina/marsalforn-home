import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, listProducts, listSaleItems } from "@/lib/products/store";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const EUR = (c: number) => `€${(c / 100).toFixed(0)}`;

function md(s: string): string {
  return s.split(/\n{2,}/).map((b) => {
    if (b.startsWith("# ")) return `<h2>${esc(b.slice(2))}</h2>`;
    if (b.startsWith("## ")) return `<h3>${esc(b.slice(3))}</h3>`;
    return `<p>${esc(b).replace(/\n/g,"<br/>")}</p>`;
  }).join("\n");
}
function esc(s: string) { return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

export async function generateMetadata({ params }: { params: { sku: string } }) {
  const p = await getProduct(params.sku);
  if (!p) return { title: "Marsalforn Home" };
  return { title: `${p.name} — Marsalforn Home`, description: p.hook, alternates: { canonical: `/p/${p.sku}` } };
}

export default async function ProductPage({ params }: { params: { sku: string } }) {
  const product = await getProduct(params.sku);
  if (!product || !product.active) notFound();

  const [allProducts, sales] = await Promise.all([listProducts(), listSaleItems()]);
  const sale = sales.find((s) => s.sku === params.sku);
  const related = allProducts.filter((p) => p.collection_slug === product.collection_slug && p.sku !== product.sku).slice(0, 4);
  const REVIEWS = [
    { name: "K., Sliema", body: "Bought this six months ago. Use it weekly. No regrets." },
    { name: "M., Mosta", body: "Lasts. Heavy. Looks better with use." },
    { name: "R., London", body: "Shipped clean. Packaged carefully. Better in person than the photos." },
  ];

  return (
    <>
      <section>
        <div className="container">
          <p className="eyebrow"><Link href={`/${product.collection_slug}`} className="muted">← {product.collection_slug}</Link></p>
          <div className="product-detail">
            <div className="product-images">
              <div className="product-image-main" style={{ backgroundImage: `url(/lookbook/${product.collection_slug}.svg)` }} aria-hidden="true" />
              <div className="product-image-thumbs">
                {[1,2,3].map((n) => (
                  <div key={n} className="product-image-thumb" style={{ backgroundImage: `url(/lookbook/${product.collection_slug}.svg)` }} aria-hidden="true" />
                ))}
              </div>
            </div>
            <div className="product-info">
              <h1>{product.name}</h1>
              <p className="meta muted">{product.materials}</p>

              {sale ? (
                <div className="price-block">
                  <span className="price-now">{EUR(sale.now_price_cents)}</span>
                  <span className="price-was">was {EUR(sale.was_price_cents)}</span>
                  <p className="meta muted" style={{ marginTop: "var(--space-2)" }}>
                    Prior price effective {new Date(sale.prior_price_from).toLocaleDateString("en-GB", { dateStyle: "medium" })} – {new Date(sale.prior_price_to).toLocaleDateString("en-GB", { dateStyle: "medium" })} (EU Omnibus disclosure).
                  </p>
                </div>
              ) : (
                <p className="price">{EUR(product.price_cents)}</p>
              )}

              {product.is_made_to_order ? (
                <p className="pill pill--mto">Made to order · {product.lead_time_days_min}–{product.lead_time_days_max} days lead time</p>
              ) : (
                <p className="pill pill--in-stock">In stock · ships within 24h</p>
              )}

              <p>{product.hook}</p>
              <div className="product-actions">
                <Link href="/cart" className="btn btn-primary">Add to bag</Link>
                <Link href="/account/save-list" className="btn btn-secondary">♡ Save</Link>
                <Link href="/#concierge" className="btn btn-secondary">Ask Mateo about this →</Link>
              </div>

              <table className="lab-table">
                <tbody>
                  {product.dimensions && <tr><th>Dimensions</th><td>{product.dimensions}</td></tr>}
                  {product.weight_g && <tr><th>Weight</th><td>{product.weight_g}g</td></tr>}
                  {product.country_of_origin && <tr><th>Country of origin</th><td>{product.country_of_origin}</td></tr>}
                  {product.workshop_slug && <tr><th>Workshop</th><td><Link href="/brand">{product.workshop_slug.replace("-", " ")}</Link></td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-surface)" }}>
        <div className="container container--narrow">
          <p className="eyebrow">The story</p>
          <div dangerouslySetInnerHTML={{ __html: md(product.description_md) }} />
        </div>
      </section>

      <section>
        <div className="container container--narrow">
          <p className="eyebrow">Concept reviews</p>
          <ul className="reviews-list">
            {REVIEWS.map((r) => (
              <li key={r.name} className="review">
                <p>"{r.body}"</p>
                <p className="meta">— {r.name} <span className="muted">· concept review</span></p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <div className="container">
            <p className="eyebrow">Related from {product.collection_slug}</p>
            <div className="oils-grid">
              {related.map((r) => (
                <article key={r.sku} className="oil-card">
                  <Link href={`/p/${r.sku}`} className="oil-card-img-link" style={{ backgroundImage: `url(/lookbook/${r.collection_slug}.svg)` }} aria-label={r.name}>
                    <span className="visually-hidden">{r.name}</span>
                  </Link>
                  <div className="oil-card-body">
                    <h3>{r.name}</h3>
                    <p className="muted">{r.hook}</p>
                    <div className="oil-card-foot">
                      <span className="price">{EUR(r.price_cents)}</span>
                      <Link href={`/p/${r.sku}`} className="btn btn-secondary btn-sm">Open →</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
