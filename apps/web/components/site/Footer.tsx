import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="disclosure">
          © 2026 Marsalforn Home · Concept site by{" "}
          <a href="https://concierge.studio" target="_blank" rel="noreferrer">concierge.studio</a> ·
          this brand is a portfolio piece · modern Mediterranean goods, from Gozo ·
          checkout is disabled · contact form reaches a real inbox at portfolio@concierge.studio ·
          not a registered trader · no VAT/MBR
        </p>
        <div className="footer-cols">
          <div>
            <h4>Shop</h4>
            <Link href="/kitchen">Kitchen</Link>
            <Link href="/bath">Bath</Link>
            <Link href="/linen">Linen</Link>
            <Link href="/lighting">Lighting</Link>
            <Link href="/sale">Sale</Link>
          </div>
          <div>
            <h4>About</h4>
            <Link href="/brand">The brand</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <h4>Service</h4>
            <Link href="/shipping">Shipping</Link>
            <Link href="/returns">Returns</Link>
            <Link href="/faq">FAQ</Link>
          </div>
          <div>
            <h4>Concept</h4>
            <Link href="/concept">What this is</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href="https://concierge.studio" target="_blank" rel="noreferrer">concierge.studio →</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
