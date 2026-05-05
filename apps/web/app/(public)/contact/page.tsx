import Link from "next/link";
import { ClientIdField } from "@/components/analytics/ClientIdField";
export const runtime = "edge"; export const dynamic = "force-static";
export const metadata = { title: "Contact", alternates: { canonical: "/contact" } };
export default function ContactPage() {
  return (
    <>
      <section>
        <div className="container container--narrow">
          <p className="eyebrow">Contact</p>
          <h1>Talk to Mateo — or write.</h1>
          <p className="lead muted">For product questions, the concierge above answers fastest. For wholesale, press, partnerships, or returns, the form lands directly with us.</p>
          <Link href="/#concierge" className="btn btn-primary">Talk to Mateo →</Link>
        </div>
      </section>

      <section>
        <div className="container container--narrow">
          <h2>Or send a note</h2>
          <form action="/api/leads" method="post" className="form-grid">
            <ClientIdField />
            <div className="form-row"><label>Your name <input type="text" name="name" required autoComplete="name" /></label></div>
            <div className="form-row"><label>Email <input type="email" name="email" required autoComplete="email" /></label></div>
            <div className="form-row">
              <label>About
                <select name="project_type" required defaultValue="other">
                  <option value="wholesale">Wholesale (10% off above €1500; custom quote above €5000)</option>
                  <option value="press">Press / interviews</option>
                  <option value="partnership">Partnership / hire-the-photo-set</option>
                  <option value="returns">Returns query</option>
                  <option value="other">Something else</option>
                </select>
              </label>
            </div>
            <div className="form-row"><label>Notes <textarea name="brief" rows={5} placeholder="Anything else." /></label></div>
            <div className="form-row"><label className="checkbox"><input type="checkbox" name="consent" value="true" required /><span>OK to use my details to reply.</span></label></div>
            <button type="submit" className="btn btn-primary">Send →</button>
          </form>
          <p className="muted" style={{ marginTop: "var(--space-5)" }}>
            Form lands at <a href="mailto:portfolio@concierge.studio">portfolio@concierge.studio</a> with a [Marsalforn Home] prefix.
          </p>
        </div>
      </section>
    </>
  );
}
