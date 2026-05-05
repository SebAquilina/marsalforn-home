import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="wordmark wordmark--with-mark" aria-label="Marsalforn Home — home">
          <svg
            className="wordmark-mark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="32"
            height="32"
            aria-hidden="true"
          >
            {/* MH monogram inside a 1px border square — copper on warm white */}
            <rect x="6" y="6" width="52" height="52" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text
              x="32"
              y="44"
              textAnchor="middle"
              fontFamily="EB Garamond, Times New Roman, serif"
              fontSize="30"
              fontWeight="500"
              fill="currentColor"
              letterSpacing="-1"
            >MH</text>
          </svg>
          <span className="wordmark-text">Marsalforn Home</span>
        </Link>
        <nav className="header-nav" aria-label="Collections">
          <Link href="/kitchen">Kitchen</Link>
          <Link href="/bath">Bath</Link>
          <Link href="/linen">Linen</Link>
          <Link href="/lighting">Lighting</Link>
          <Link href="/sale" className="sale-link">Sale</Link>
        </nav>
        <div className="header-actions">
          <Link href="/account/save-list" aria-label="Save list">♡</Link>
          <Link href="/cart" aria-label="Cart">Bag</Link>
          <Link href="/#concierge" className="btn btn-primary btn-sm">Talk to Mateo →</Link>
        </div>
      </div>
    </header>
  );
}
