import Link from "next/link";
import { listCollections, listProducts } from "@/lib/products/store";
import { listPosts } from "@/lib/journal/store";

const EUR = (c: number) => `€${(c / 100).toFixed(0)}`;

export async function CollectionPage({ slug }: { slug: string }) {
  const [cols, products, posts] = await Promise.all([
    listCollections(),
    listProducts({ collection: slug, activeOnly: true }),
    listPosts({ tag: slug, publishedOnly: true }),
  ]);
  const col = cols.find((c) => c.slug === slug);
  if (!col) return <p>Unknown collection.</p>;

  return (
    <>
      <section>
        <div className="container">
          <p className="eyebrow">Collection</p>
          <h1>{col.name}</h1>
          <p className="lead muted" style={{ maxWidth: "60ch" }}>{col.hero_md}</p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="catalog-grid">
            {products.map((p) => (
              <article key={p.sku} className="catalog-card">
                <Link href={`/p/${p.sku}`} className="catalog-card-img" style={{ backgroundImage: `url(/lookbook/${p.collection_slug}.jpg)` }} aria-hidden="true" />
                <div className="catalog-card-body">
                  <p className="meta">{p.materials.split(",")[0].trim()}</p>
                  <h3><Link href={`/p/${p.sku}`}>{p.name}</Link></h3>
                  <p className="muted" style={{ minHeight: "3em" }}>{p.hook}</p>
                  {p.is_made_to_order ? <span className="pill pill--mto">Made to order · {p.lead_time_days_min}-{p.lead_time_days_max} days</span> : null}
                  <div className="oil-card-foot">
                    <span className="price">{EUR(p.price_cents)}</span>
                    <Link href={`/p/${p.sku}`} className="btn btn-secondary btn-sm">Open →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section style={{ background: "var(--color-surface)" }}>
          <div className="container container--narrow">
            <p className="eyebrow">Journal · {col.name.toLowerCase()}</p>
            <h2>Reading.</h2>
            <ul className="journal-list">
              {posts.map((p) => (
                <li key={p.slug} className="journal-list-item">
                  <Link href={`/journal/${p.slug}`}>
                    <h2>{p.title}</h2>
                    <p className="muted">{p.excerpt}</p>
                    <p className="meta">{new Date(p.published_at).toLocaleDateString("en-MT", { dateStyle: "long" })} · {p.reading_min ?? 5} min</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
