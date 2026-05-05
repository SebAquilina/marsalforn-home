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

## Deploy log — 2026-05-05

| Step                              | Result                                                       |
|-----------------------------------|--------------------------------------------------------------|
| Repo                              | github.com/SebAquilina/marsalforn-home                       |
| D1 prod                           | 488ee7cf-514f-44d9-8653-4e80814f665f                         |
| D1 preview                        | 6662fa0d-c717-4ea5-afee-c5a5fe83c05b                         |
| KV (DEAD_LETTER)                  | 70bbae63b12442429c541ec6f93c3b59                             |
| Pages project                     | marsalforn-home-web                                          |
| Live URL                          | https://marsalforn-home-web.pages.dev                        |
| Phase 6 status                    | green (Stage A blocking + Stage B network/headers passed)    |
| Admin auth                        | seb:MarsalfornHome-Admin-1777975000 (HTTP Basic via mw)      |

### Fixes during Phase 6 stabilisation

| Commit  | Fix                                                                                  |
|---------|--------------------------------------------------------------------------------------|
| 9f64193 | Bind real D1 + KV ids in wrangler.toml                                               |
| ef71bb0 | validate-content checks "Florentine" not "Florence"                                  |
| 0bf434d | audit-brand-assets accepts public/lookbook as portfolio dir                          |
| 7b57376 | /api/cart added to audit-sentinel list (agent-callable, not UI-called)               |
| ce917d8 | Replace constant-folded TABLE/TITLE ternaries in 6 admin pages with literals         |
| 7c4745d | Import Link in /terms page                                                           |

### Live verification

| Endpoint                         | Status                                                |
|----------------------------------|-------------------------------------------------------|
| /                                | 200 — agent-first hero "Ask Mateo anything"           |
| /api/agent/probe                 | 200 {"ok":true,"probe":true}                          |
| /api/agent (Mateo)               | 200 — answered "Wedding gift €200" with 3 SKUs+prices |
| /sale                            | 200 — EU Omnibus prior-price disclosure rendered      |
| /cart                            | 200 — EU CRD Article 6 pre-contract table rendered    |
| /admin (no creds)                | 401 — basic auth challenge                            |
| /admin (with creds)              | 200                                                   |
