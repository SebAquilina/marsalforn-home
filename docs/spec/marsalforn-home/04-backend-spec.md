# 04 — Backend spec

## Bindings
- `DB` (D1) — `marsalforn-home-db`
- `DEAD_LETTER` (KV) — last-resort lead capture

## Schema (`drizzle/migrations/0003_marsalforn.sql`)
- `collections` — 4 (kitchen, bath, linen, lighting)
- `workshops` — 4 (Pyrenees Copper Works 1834, Lithuanian Linen Mill 1962, Tuscan Ceramics, Florentine Brass 1948)
- `products` — 32 SKUs with full detail (materials, dimensions, weight, country, workshop FK, price_cents, is_made_to_order, lead_time_days_min/max, in_stock_qty)
- `sale_items` — 5 active rows with EU Omnibus prior price columns
- `journal_posts` — 8 long-form posts (4-9 min reading)
- `carts` (cookie-keyed by client_id; items_json)
- `save_lists` (cookie-keyed; items_json array of SKUs)
- `return_requests` — RR-flow (email + order_ref + skus + reason + status)
- `wholesale_inquiries` — WS-flow (email + business_name + rooms + estimated_value_cents + status)

## API routes
- `/api/agent/probe` sentinel
- `/api/agent/recommend` read-only catalogue + sales (basket-aware suggestions are computed in the system prompt)
- `/api/agent/lead-time` per-SKU lead time
- `/api/agent/care-guide` material-keyed care text
- `/api/cart` GET/POST add|remove|update|clear
- `/api/savelist` GET/POST add|remove|clear
- `/api/savelist/email` POST form (writes a save-list lead)
- `/api/returns` POST form (writes a return_request)
- `/api/wholesale` POST (writes a wholesale_inquiry)
- `/api/leads`, `/api/track`, `/api/privacy/request` standard

## Concierge actions (full premium set, 11)
`recommend`, `add_to_bag`, `remove_from_bag`, `view_bag`, `save`, `email_list`, `shipping_quote`, `lead_time`, `start_return`, `care_guide`, `contact`.
