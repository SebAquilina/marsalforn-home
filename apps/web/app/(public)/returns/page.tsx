import Link from "next/link";
import { ClientIdField } from "@/components/analytics/ClientIdField";
export const runtime = "edge"; export const dynamic = "force-static";
export const metadata = { title: "Returns — Marsalforn Home", alternates: { canonical: "/returns" } };

export default function ReturnsPage() {
  return (
    <section>
      <div className="container container--narrow">
        <p className="eyebrow">Returns</p>
        <h1>14-day returns under EU CRD.</h1>

        <h2>What you can return</h2>
        <p>Any in-stock item, within 14 days of receipt, unused and in original packaging. Made-to-order items (king sheets, curtains, pendants, sconce) are not returnable unless faulty — this is permitted for personalised goods under EU Consumer Rights Directive Article 16(c).</p>

        <h2>How we handle the return</h2>
        <p>Within Malta we collect for free; outside Malta we deduct €15 from the refund to cover return shipping. Refund issued to the original payment method within 14 days of receiving the returned item.</p>

        <h2>Faulty items</h2>
        <p>Anything faulty within the warranty period (12 months for electrical fittings; lifetime structural warranty on copper) is replaced or refunded at our cost — including made-to-order items.</p>

        <h2>Start a return</h2>
        <form action="/api/returns" method="post" className="form-grid">
          <ClientIdField />
          <div className="form-row"><label>Email <input type="email" name="email" required autoComplete="email" /></label></div>
          <div className="form-row"><label>Order reference <input type="text" name="order_ref" placeholder="e.g. MH-1234" required /></label></div>
          <div className="form-row"><label>Items (comma-separated SKUs) <input type="text" name="skus" placeholder="e.g. l01, b01" required /></label></div>
          <div className="form-row"><label>Reason <textarea name="reason" rows={4} placeholder="Too small, faulty, didn't fit my space, etc." required /></label></div>
          <div className="form-row">
            <label className="checkbox">
              <input type="checkbox" name="consent" value="true" required />
              <span>OK to use my details to handle this return.</span>
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Send return request →</button>
        </form>
        <p className="muted" style={{ marginTop: "var(--space-5)" }}>
          Concept site — your request lands at portfolio@concierge.studio with a [Marsalforn Home returns] prefix. We respond within 30 days. <Link href="/concept">What this site is.</Link>
        </p>
      </div>
    </section>
  );
}
