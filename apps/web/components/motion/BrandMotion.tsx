"use client";
import { useEffect } from "react";

/**
 * Marsalforn Home — boutique-catalogue motion.
 * - Product cards lift on scroll-into-view (translateY + shadow grows)
 * - Copper underline DRAWS across H1 from 0 to 80px
 * - Collection grids stagger-children sequentially (50ms cascade)
 * - Sale-red badges pulse 3x then settle
 * - Numbers (32 SKUs, 4 collections) count up
 * - Lift feels like a magazine page turning
 */
export function BrandMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      document.documentElement.classList.add("mh-no-motion");
      return;
    }

    const reveals = document.querySelectorAll<HTMLElement>(
      "main section, main h1, main h2, main h3, main p.lead, main p.eyebrow, .collection-card-img, .catalog-card-img, .oil-card-img-link, .product-image-main, .work-card, .journal-card, .journal-row, .sale-badge, blockquote, ul, ol, table"
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((t) => io.observe(t));

    // Number count-up
    document.querySelectorAll<HTMLElement>("[data-count-up]").forEach((el) => {
      const target = Number(el.dataset.countUp ?? "0");
      const cio = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const start = performance.now();
            const duration = 1500;
            function tick(now: number) {
              const t = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              el.textContent = Math.round(target * eased).toLocaleString();
              if (t < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            cio.unobserve(e.target);
          }
        }
      }, { threshold: 0.5 });
      cio.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
