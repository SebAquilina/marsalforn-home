# Marsalforn Home — Blueprint (Premium tier, €9,200, 21 days)

> **Status:** as-built. Live at `https://marsalforn-home-web.pages.dev/`.
> Custom domain `marsalfornhome.concierge.studio` — pending parent zone.

## Project charter

The fourth and largest portfolio piece. Premium tier shows **everything**
the agency can do: full e-commerce shape (32 SKUs across 4 collections,
cart, save list, returns, wholesale), EU compliance (Omnibus + CRD),
basket-aware concierge with 11 actions and ~80KB knowledge base, full
Shopify-grade admin (Live, Leads, Returns, Wholesale, Products,
Collections, Sales, Journal, Insights, Analytics, Concierge, Transcripts,
Settings).

The bar: "would a Frama / HAY / Folk customer believe this is real?"

## Hard rule (verbatim per skill SKILL.md)

> No purchase, transfer, paid sign-up, paid plan upgrade, financial
> trade, or money movement is ever executed by an agent on the user's
> behalf without explicit confirmation in chat.

For Marsalforn Home: checkout disabled. Cart and save list are real
(D1-backed, cookie-keyed) — they email portfolio@concierge.studio when
the visitor opts in. No card data is ever collected.

## Concept-site disclosures (mandatory)

1. Concept site by `concierge.studio` (Premium tier).
2. Brand is invented — Marsalforn Home is not a registered Maltese
   business.
3. Workshops are described in fictional-but-plausible detail. No third-
   party brand names appear in product copy.
4. Checkout disabled — cart/save-list/returns/wholesale flows are real
   pipeline; the final payment step is intentionally turned off.

Implementation: footer disclosure on every page · first-visit
ConceptBanner · `/concept` page · `/checkout` returns disabled-state.

## v1.18 standards

- **Agent-first contract.** FrontHero on `/` first viewport. H1 "Ask
  Mateo anything." Block-on-fail audit probes.
- **Phase 6 audit non-negotiable.** No `continue-on-error` on gate
  stages. Stage-0 lint enforces.
- **Brand asset set generated.** Eight files via
  `generate-brand-assets.py --mark arch --accent #a76a3c
  --bg #fbf9f4 --portfolio-palettes "rust,stone,olive"
  --portfolio-slugs "kitchen,bath,linen"`.

## EU compliance baked into pages

- **Omnibus Directive:** every `/sale` row renders the prior 30-day
  price ("was €X, effective DD MMM – DD MMM YYYY"). Schema column
  `prior_price_from` + `prior_price_to` make this auditable.
- **Consumer Rights Directive:** `/cart` carries the Article 6
  pre-contract disclosures (trader identity, total inc. taxes, delivery
  cost, payment method, time of delivery, withdrawal right, complaint
  procedure). Disclosures render even though checkout is disabled — the
  demo has to be correct.
- **CRD Article 16(c):** made-to-order items not returnable unless
  faulty. Catalogue marks `is_made_to_order` for l03 (king sheets),
  l07 (curtains), lt02-lt04 (pendants + sconce).

## Verification gates

| Phase | Gate | Pass |
| --- | --- | --- |
| 4 build | `pnpm validate:seed` + `validate:zod-seed` | 0 issues |
| 4 build | `audit-static.ts ../..` | 0 P0 |
| 4 build | `audit-analytics/{run,runtime.test}.ts` | 15+38 green |
| 4 build | `audit-brand-assets.sh` | 8 files present |
| 4 build | `pnpm test:unit` | green |
| 5 deploy | `curl /` | 200 + invitational h1 + canonical |
| 5 deploy | `curl /api/agent/probe` | `{"ok":true,"probe":true}` |
| 6 audit | `audit.ts $URL` (probeAgentFirstHero) | 0 P0 |
