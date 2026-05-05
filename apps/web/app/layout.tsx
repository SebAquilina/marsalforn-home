import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@/styles/brand-skin.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ConceptBanner } from "@/components/site/ConceptBanner";
import { Front } from "@/components/front/Front";
import { TrackingPixel } from "@/components/analytics/TrackingPixel";
import { ToastViewport } from "@/components/ui/Toast";
import { Suspense } from "react";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://marsalfornhome.concierge.studio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Marsalforn Home — Modern Mediterranean Goods, From Gozo",
    template: "%s — Marsalforn Home",
  },
  description:
    "Modern Mediterranean home goods — kitchen, bath, linen, lighting. Designed in Gozo, made in small runs by partner workshops across Europe. Concept site by concierge.studio.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  other: { "robots": "index,follow,noai" },
  openGraph: {
    type: "website",
    siteName: "Marsalforn Home",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Marsalforn Home" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-default.png"] },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf9f4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        <ConceptBanner />
        <a href="#main" className="skip-to-content">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Front />
        <Suspense fallback={null}><TrackingPixel /></Suspense>
        <ToastViewport />
      </body>
    </html>
  );
}
