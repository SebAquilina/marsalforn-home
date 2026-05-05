import Link from "next/link";
import { listWorkshops } from "@/lib/products/store";
export const runtime = "edge"; export const dynamic = "force-dynamic";
export const metadata = { title: "The brand — Marsalforn Home", alternates: { canonical: "/brand" } };

function md(s: string): string {
  return s.split(/\n{2,}/).map((b) => `<p>${b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\n/g,"<br/>")}</p>`).join("\n");
}

export default async function BrandPage() {
  const workshops = await listWorkshops();
  return (
    <article className="grove-article">
      <div className="container container--narrow">
        <p className="eyebrow">The brand</p>
        <h1>Modern Mediterranean. Made slow.</h1>
        <p className="lead muted">Designed in Gozo by Mateo Cassar, made in small runs by four partner workshops across Europe.</p>

        <h2>1. Mateo's story</h2>
        <p>I trained as a product designer at the Royal Danish Academy and spent eight years in a Copenhagen design studio working on kitchen tools and ceramics. In 2023 I moved back to Gozo where my family is from. Marsalforn Home was the obvious next move — I had a network of European workshops I'd built over a decade, and Malta had no brand making this kind of work. I started in late 2023 with five SKUs and a small warehouse a five-minute walk from the sea.</p>

        <h2>2. The Marsalforn warehouse</h2>
        <p>The Gozitan address is where I live and where the photography happens. It's not a production facility — every piece you buy is made in one of the four workshops below and shipped from there or from the warehouse depending on item. The photography is honest: the kitchen is my kitchen, the bathroom is my bathroom. When you see "ambient interior" on a collection page, it's actually that place.</p>

        <h2>3. Four workshops</h2>
        {workshops.map((w) => (
          <div key={w.slug} style={{ marginBottom: "var(--space-6)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 500, fontSize: "1.4rem" }}>{w.name}</h3>
            <p className="meta muted">{w.country} · {w.founded ?? "—"} · {w.craft}</p>
            <div dangerouslySetInnerHTML={{ __html: md(w.story_md) }} />
          </div>
        ))}

        <h2>4. How we choose what to make</h2>
        <p>Three rules: (1) the piece has to be one a working designer would want at home, (2) the workshop has to be one we already know personally, (3) the price has to be defensible against the alternatives at the same quality level. Most product ideas die at rule three. The ones that survive go into a small first run of 50–200 units; if it sells through in the season, we re-order; if not, we don't make it again.</p>

        <h2>5. Our materials</h2>
        <p>1.5mm copper, lined in tin or stainless. Solid brass, cast and forged. 100% Lithuanian linen, stonewashed. Tuscan terracotta with food-safe glaze. American black walnut, end-grain, oiled. Olive wood from Mġarr offcuts. Maltese limestone, hand-cut. Beeswax, pure. We don't use chrome, plastic-handle anything, MDF, particleboard, or composite.</p>

        <h2>6. Production runs and lead times</h2>
        <p>In stock: kitchen, bath, throws, napkins, cushions, candles, soaps, the table lamp, the linen lampshade. Made-to-order: king sheets, all curtains, all hardwired lighting (pendants, sconce). In-stock items ship within 24h of order. Made-to-order ships in 4–6 weeks direct from the workshop with tracking.</p>

        <h2>7. The team</h2>
        <p>Three of us. Mateo (founder, design, the chat). Anastasia (operations, packing, warehouse — moved from Vilnius in 2024). Nikol (photography, content, the journal — Gozitan, photographer at Times of Malta before us).</p>

        <p className="muted" style={{ marginTop: "var(--space-7)" }}>
          Concept site — founder + team biographies are illustrative.
          <Link href="/concept" style={{ marginLeft: "0.5rem" }}>What that means →</Link>
        </p>
      </div>
    </article>
  );
}
