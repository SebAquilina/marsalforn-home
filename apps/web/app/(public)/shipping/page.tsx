import Link from "next/link";
export const runtime = "edge"; export const dynamic = "force-static";
export const metadata = { title: "Shipping — Marsalforn Home", alternates: { canonical: "/shipping" } };

export default function ShippingPage() {
  const RATES = [
    { dest: "Malta", in_stock: "1-2 working days", made_to_order: "4-6 weeks + 1-2 working days", rate: "Free over €150 / otherwise €5.50" },
    { dest: "EU", in_stock: "3-6 working days", made_to_order: "4-6 weeks + 3-6 working days", rate: "€12" },
    { dest: "UK", in_stock: "3-6 working days", made_to_order: "4-6 weeks + 3-6 working days", rate: "€25" },
    { dest: "US", in_stock: "5-9 working days", made_to_order: "4-6 weeks + 5-9 working days", rate: "€35" },
    { dest: "Rest of world", in_stock: "Custom quote", made_to_order: "Custom quote", rate: "From €55" },
  ];
  return (
    <section>
      <div className="container container--narrow">
        <p className="eyebrow">Shipping</p>
        <h1>Where we ship and how long it takes.</h1>
        <p className="lead muted">All rates include carbon-offset surcharge. Made-to-order items ship direct from the partner workshop. In-stock items ship from our Marsalforn warehouse within 24h of order.</p>
        <table className="rates-table" aria-label="Shipping rates">
          <thead><tr><th>Destination</th><th>In stock</th><th>Made to order</th><th>Rate</th></tr></thead>
          <tbody>
            {RATES.map((r) => (
              <tr key={r.dest}><th>{r.dest}</th><td className="muted">{r.in_stock}</td><td className="muted">{r.made_to_order}</td><td>{r.rate}</td></tr>
            ))}
          </tbody>
        </table>
        <h2 style={{ marginTop: "var(--space-7)" }}>Customs and duties</h2>
        <p>EU shipments are duty-paid (we cover all EU customs). UK, US, and RoW shipments may attract local duty/VAT on import — these are paid by the recipient. We can provide an estimate via the concierge.</p>
        <h2 style={{ marginTop: "var(--space-6)" }}>Tracking</h2>
        <p>Tracking emailed when the package leaves the warehouse or workshop. Most lost-package issues resolve within 5 working days; we replace at our cost if the carrier loses it.</p>
        <p className="muted" style={{ marginTop: "var(--space-7)" }}>
          Concept site — illustrative shipping policy. <Link href="/concept">What that means →</Link>
        </p>
      </div>
    </section>
  );
}
