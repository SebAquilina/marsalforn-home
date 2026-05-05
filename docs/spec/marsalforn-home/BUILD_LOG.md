# BUILD_LOG — Marsalforn Home

## 2026-05-05 — Day 1 (single-session compress of the 21-day plan)

- Cloned `casal-olives` as the structural base.
- Rebranded: palette `#a76a3c` brushed copper on `#fbf9f4` warm white. Display: EB Garamond italic.
- Brand assets via v1.18 scaffolder, mark = `arch` (Maltese architecture). Custom MH monogram in Header.tsx.
- D1 migration `0003_marsalforn.sql`: 8 tables (collections, workshops, products, sale_items, journal_posts, carts, save_lists, return_requests, wholesale_inquiries). Seeded 4 collections, 4 workshops, 32 products, 5 sale items with EU Omnibus prior price, 8 journal posts.
- Mateo's system prompt with 11 actions + ~80KB compiled KB. Basket-aware recommendation logic baked in.
- 17 page templates: home, /{kitchen,bath,linen,lighting}, /p/[sku], /sale, /journal[+slug], /brand, /contact, /faq, /shipping, /returns, /cart, /checkout, /account[+save-list].
- Admin: full Shopify-grade — /admin/{live,leads,leads/[id],transcripts,products,collections,journal,sales,returns,wholesale,insights,analytics,agent,settings}.
- EU compliance: Omnibus 30-day prior price on /sale + every /p/[sku]; CRD Article 6 pre-contract disclosures on /cart; CRD Article 16(c) made-to-order exclusion on /returns.
- Phase 6 audit gate v1.18: full Stage A blocking, Stage B blocking after 60s warm-up.

Defaults Cowork picked itself:
- Mark concept: `arch` (over `nest` which broke the favicon at 16px).
- Workshop count: 4 (per spec).
- Sale items: 5 (per spec).
- Cart + save list cookie-keyed (per spec — the save-list-without-auth pattern is on purpose).
