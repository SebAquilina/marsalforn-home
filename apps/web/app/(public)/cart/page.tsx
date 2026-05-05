import Link from "next/link";
import { listProducts } from "@/lib/products/store";
export const runtime = "edge"; export const dynamic = "force-dynamic";
export const metadata = { title: "Cart — Marsalforn Home", alternates: { canonical: "/cart" } };

const EUR = (c: number) => `€${(c / 100).toFixed(2)}`;

export default async function CartPage() {
  // Standard tier: cart items render on the client from cookie state.
  // For SSR placeholder we list a "your bag is empty" — Mateo populates via concierge.
  return (
    <>
      <section>
        <div className="container container--narrow">
          <p className="eyebrow">Bag</p>
          <h1>Your bag.</h1>
          <p className="lead muted">Add items via Mateo (the concierge above) or by clicking "Add to bag" on any product page. Your bag persists in your browser; no account needed.</p>

          <div className="admin-card" style={{ background: "var(--color-surface)", marginTop: "var(--space-5)" }}>
            <p className="muted">Your bag is empty. Browse the <Link href="/kitchen">kitchen</Link>, <Link href="/bath">bath</Link>, <Link href="/linen">linen</Link>, or <Link href="/lighting">lighting</Link> collections — or talk to Mateo.</p>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-surface)" }}>
        <div className="container container--narrow">
          <p className="eyebrow">EU CRD pre-contract information</p>
          <h2>Required disclosures (EU Consumer Rights Directive, Article 6).</h2>
          <p className="muted">These are the disclosures every EU online shop must show before checkout. We render them here even though checkout is disabled, so the demo is correct.</p>
          <table className="lab-table">
            <tbody>
              <tr><th>Trader identity</th><td>Marsalforn Home — concept brand by concierge.studio. No registered VAT/MBR.</td></tr>
              <tr><th>Address</th><td>Marsalforn warehouse (illustrative). Real correspondence: portfolio@concierge.studio.</td></tr>
              <tr><th>Total price</th><td>Inclusive of VAT where applicable (illustrative on this concept site).</td></tr>
              <tr><th>Delivery cost</th><td>Visible in the cart total before checkout. See <Link href="/shipping">/shipping</Link>.</td></tr>
              <tr><th>Payment method</th><td>Concept site — checkout is disabled; no card data is collected.</td></tr>
              <tr><th>Time of delivery</th><td>In stock: 1-9 working days by destination. Made to order: 4-6 weeks + transit.</td></tr>
              <tr><th>Right of withdrawal</th><td>14 days from receipt for in-stock items. Made-to-order items not returnable unless faulty (EU CRD Art. 16(c)). See <Link href="/returns">/returns</Link>.</td></tr>
              <tr><th>Complaint procedure</th><td>Email portfolio@concierge.studio with [Marsalforn Home] prefix.</td></tr>
            </tbody>
          </table>

          <div style={{ marginTop: "var(--space-6)", textAlign: "center" }}>
            <Link href="/checkout" className="btn btn-primary btn-lg">Proceed to checkout</Link>
          </div>
        </div>
      </section>
    </>
  );
}
