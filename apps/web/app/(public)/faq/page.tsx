import Link from "next/link";
export const runtime = "edge"; export const dynamic = "force-static";
export const metadata = { title: "FAQ — Marsalforn Home", alternates: { canonical: "/faq" } };

const FAQS = [
  { cat: "Shipping", q: "Where do you ship?", a: "Malta, EU, UK, US, and rest of world. Quote on a country at /shipping or via Mateo." },
  { cat: "Shipping", q: "Free shipping threshold?", a: "Free over €150 within Malta. €12 EU, €25 UK, €35 US, €55 RoW." },
  { cat: "Shipping", q: "Lead time on a copper pan?", a: "In stock; ships within 24h of order. Malta 1-2 working days; EU 3-6 working days." },
  { cat: "Shipping", q: "Lead time on a pendant?", a: "Made to order in Florence; 4-6 weeks before it ships, then standard transit." },
  { cat: "Shipping", q: "Can I track my order?", a: "Yes. Tracking is emailed when the package leaves the warehouse or workshop." },
  { cat: "Lead times", q: "Why are sheets king-only made-to-order?", a: "The Lithuanian mill schedules king fitted in long-fibre runs rather than stocking it. 4-6 weeks." },
  { cat: "Lead times", q: "Can I cancel a made-to-order item?", a: "Yes — within 24h of order. After that the workshop has started; we can't cancel." },
  { cat: "Lead times", q: "Made-to-order ship from workshop or warehouse?", a: "Direct from the workshop. The warehouse only handles in-stock and re-tin returns." },
  { cat: "Materials", q: "Is the copper dishwasher-safe?", a: "No. Copper hates the dishwasher. Hot water and a soft cloth." },
  { cat: "Materials", q: "Linen feels stiff out of the box?", a: "Wash it once. It softens. By wash three it's where you want it." },
  { cat: "Materials", q: "Can the brass be re-polished?", a: "Brasso, once a quarter, if you want it shiny. Most people stop after the first year." },
  { cat: "Materials", q: "Re-tinning copper?", a: "€60 plus return shipping. Send to the warehouse, we send to the Pyrenees, you get it back ~6 weeks later." },
  { cat: "Returns", q: "Return window?", a: "14 days from receipt, unused, in original packaging. EU CRD." },
  { cat: "Returns", q: "Return shipping cost?", a: "Free pickup within Malta. €15 deduction from refund outside Malta." },
  { cat: "Returns", q: "Can I return made-to-order?", a: "Only if faulty. EU CRD permits this exception for personalised goods." },
  { cat: "Wholesale", q: "Wholesale terms?", a: "10% off above €1500 order. Above €5000 we quote per project — Mateo handles those." },
  { cat: "Gifts", q: "Gift wrapping?", a: "Free linen wrap on any order. Add a card with handwritten note at /cart." },
  { cat: "Concept", q: "Is this a real shop?", a: "No — Marsalforn Home is a concept site by concierge.studio. The brand is invented; the cart and contact form are real but no card is charged." },
];

export default function FAQ() {
  const cats = Array.from(new Set(FAQS.map((f) => f.cat)));
  return (
    <section>
      <div className="container container--narrow">
        <p className="eyebrow">FAQ</p>
        <h1>18 questions, in six categories.</h1>
        <p className="lead muted">For anything not here, talk to Mateo or write at <Link href="/contact">/contact</Link>.</p>
        {cats.map((c) => (
          <div key={c}>
            <h2 style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 500, marginTop: "var(--space-7)" }}>{c}</h2>
            <dl className="faq-list">
              {FAQS.filter((f) => f.cat === c).map((f) => (
                <div key={f.q} className="faq-item">
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}
