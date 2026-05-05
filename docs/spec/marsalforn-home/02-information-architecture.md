# 02 — Information architecture

| URL | Purpose | Auth |
| --- | --- | --- |
| `/` | FrontHero (Mateo) + 4 collection cards + 3 picks + 4 workshops + journal preview + save-list teaser | public |
| `/kitchen`, `/bath`, `/linen`, `/lighting` | Collection page with product grid + journal posts tagged for that collection | public |
| `/p/[sku]` | Product detail — gallery + materials/dimensions table + EU Omnibus prior price (if on sale) + 3 concept reviews + 4 related items | public |
| `/sale` | 5 active sale items with EU Omnibus 30-day prior price disclosure | public |
| `/journal` + `/journal/[slug]` | 8 published posts | public |
| `/brand` | Long-form 7-section about page + 4 workshops detail | public |
| `/contact` | Concierge anchor + form (Mateo handles wholesale > €5000) | public |
| `/faq` | 18 FAQs in 6 categories | public |
| `/shipping` | Full rate table + customs + tracking | public |
| `/returns` | EU CRD 14-day notice + return form | public |
| `/cart` | EU CRD pre-contract disclosures rendered | public |
| `/checkout` | Disabled-state explainer | public |
| `/account` | Placeholder ("save list only — no real auth") | public |
| `/account/save-list` | Cookie-keyed save list + "email me this list" form | public |
| `/concept`, `/privacy`, `/terms` | Framework defaults | public |
| `/admin/{live,leads,leads/[id],transcripts,products,collections,journal,sales,returns,wholesale,insights,analytics,agent,settings}` | Premium-tier admin | basic auth |
| `/api/agent`, `/api/agent/{probe,recommend,lead-time,care-guide}` | Mateo proxy + read-only catalogue | public |
| `/api/cart`, `/api/savelist`, `/api/savelist/email`, `/api/leads`, `/api/track`, `/api/privacy/request`, `/api/returns`, `/api/wholesale` | Public APIs | public |
| `/api/admin/{live,insights,products,collections,journal,sales,returns,wholesale,leads/[id]/{tags,notes},agent/regenerate-kb}` | Admin APIs | basic |
