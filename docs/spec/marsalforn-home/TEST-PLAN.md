# TEST-PLAN — Marsalforn Home

## Suite A — User from Chrome
| # | Probe | Pass |
| --- | --- | --- |
| A1 | Open `/` | FrontHero first paint; H1 "Ask Mateo anything." |
| A2 | Click "Wedding gift €200" prompt | Mateo recommends 1-3 options at that budget across categories |
| A3 | Open `/kitchen` | 10 product cards rendered |
| A4 | Open `/p/k01` | Materials, dimensions, weight, workshop link, In-stock pill |
| A5 | Open `/p/lt02` | Made-to-order pill + 4-6 weeks lead time |
| A6 | Open `/sale` | Every item shows "was €X" + prior-price date range |
| A7 | Add k01 to bag via `/api/cart` | Cart row written |
| A8 | Save k01 via `/api/savelist` | Save list updated |
| A9 | Submit save-list email | Lead captured at /admin/leads |
| A10 | `/cart` | EU CRD pre-contract disclosures visible |
| A11 | `/checkout` | Disabled-state page |
| A12 | KB extraction prompt | Refusal + redirect line |

## Suite B — Admin
| # | Probe | Pass |
| --- | --- | --- |
| B1 | `/admin/live` no auth | 401 |
| B2 | with auth | KPIs render |
| B3 | `/admin/products` | 32 SKUs |
| B4 | `/admin/sales` | 5 active sale items |
| B5 | `/admin/journal` | 8 posts |
| B6 | `/admin/returns` | Submitted return_requests appear |
| B7 | `/admin/wholesale` | Submitted wholesale_inquiries appear |

## Suite C — Developer
| # | Probe | Pass |
| --- | --- | --- |
| C1 | `GET /api/agent/probe` | `{"ok":true,"probe":true}` |
| C2 | `GET /api/agent/recommend` | 32 products + 5 sales |
| C3 | `GET /api/agent/lead-time?sku=lt02` | Made-to-order, 28-42 days |
| C4 | `GET /api/agent/care-guide?material=copper` | Care text |
| C5 | `audit-static.ts` | 0 P0 |
| C6 | `audit-analytics/run.ts` + runtime | 15+38 green |
| C7 | `audit-brand-assets.sh` | 8 files present |
| C8 | `audit.ts $URL` (post-deploy) | 0 P0 |
