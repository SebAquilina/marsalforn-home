import Link from "next/link";
import { FrontHero } from "@/components/front/FrontHero";
import { listCollections, listProducts, listWorkshops } from "@/lib/products/store";
import { listPosts } from "@/lib/journal/store";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const EUR = (c: number) => `€${(c / 100).toFixed(0)}`;

export default async function Home() {
  const [collections, products, workshops, posts] = await Promise.all([
    listCollections(), listProducts(), listWorkshops(), listPosts({ publishedOnly: true })
  ]);
  // Editor's pick: 3 hand-curated SKUs
  const pickSkus = ["k01", "l01", "lt01"];
  const picks = products.filter((p) => pickSkus.includes(p.sku));

  return (
    <>
      <FrontHero />

      <section id="collections" className="collection-strip">
        <div className="container">
          <p className="eyebrow">Four collections</p>
          <h2>Modern Mediterranean. Made slow.</h2>
          <div className="collection-grid">
            {collections.map((c) => (
              <Link key={c.slug} href={`/${c.slug}`} className="collection-card">
                <div className="collection-card-img" style={{ backgroundImage: `url(/lookbook/${c.slug}.svg)` }} aria-hidden="true" />
                <h3>{c.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="picks">
        <div className="container">
          <p className="eyebrow">Editor's pick</p>
          <h2>Three pieces, in Mateo's voice.</h2>
          <div className="oils-grid">
            {picks.map((p) => (
              <article key={p.sku} className="oil-card">
                <Link href={`/p/${p.sku}`} className="oil-card-img-link" style={{ backgroundImage: `url(/lookbook/${p.collection_slug}.svg)` }} aria-label={p.name}>
                  <span className="visually-hidden">{p.name}</span>
                </Link>
                <div className="oil-card-body">
                  <h3>{p.name}</h3>
                  <p className="muted">{p.hook}</p>
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

      <section id="workshops" style={{ background: "var(--color-surface)" }}>
        <div className="container">
          <p className="eyebrow">Four workshops</p>
          <h2>Where it's made.</h2>
          <div className="workshop-grid">
            {workshops.map((w) => (
              <article key={w.slug} className="workshop-card">
                <p className="meta">{w.country} · {w.founded ?? "—"}</p>
                <h3>{w.name}</h3>
                <p className="muted">{w.craft}</p>
                <p style={{ fontSize: "0.95rem" }}>{w.story_md.split(".").slice(0, 2).join(".")}.</p>
              </article>
            ))}
          </div>
          <div className="oils-cta-row">
            <Link href="/brand" className="btn btn-secondary">The full brand story →</Link>
          </div>
        </div>
      </section>

      <section id="journal-preview">
        <div className="container">
          <p className="eyebrow">Journal</p>
          <h2>Reading from Mateo.</h2>
          <div className="journal-preview-grid">
            {posts.slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/journal/${p.slug}`} className="journal-card">
                <h3>{p.title}</h3>
                <p className="muted">{p.excerpt}</p>
                <p className="meta">{new Date(p.published_at).toLocaleDateString("en-MT", { dateStyle: "long" })} · {p.reading_min ?? 5} min</p>
              </Link>
            ))}
          </div>
          <div className="oils-cta-row"><Link href="/journal" className="btn btn-secondary">All journal posts →</Link></div>
        </div>
      </section>

      <section id="save-teaser" style={{ background: "var(--color-surface)" }}>
        <div className="container container--narrow" style={{ textAlign: "center" }}>
          <p className="eyebrow">Save list</p>
          <h2>Save items as you browse — no account needed.</h2>
          <p className="muted">Your list lives in your browser. When you're ready, ask Mateo to email it to you.</p>
          <div className="hero-ctas" style={{ justifyContent: "center", marginTop: "var(--space-5)" }}>
            <Link href="/#concierge" className="btn btn-primary">Talk to Mateo →</Link>
            <Link href="/account/save-list" className="btn btn-secondary">View save list</Link>
          </div>
        </div>
      </section>
    </>
  );
}
