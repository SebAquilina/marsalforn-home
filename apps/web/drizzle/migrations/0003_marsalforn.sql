-- Marsalforn Home — Premium tier (e-com) on top of skill base (0001_init + 0002_analytics)

CREATE TABLE IF NOT EXISTS collections (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  hero_md TEXT NOT NULL,           -- 2-3 paragraph editorial intro
  active INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  hero_image TEXT
);

CREATE TABLE IF NOT EXISTS workshops (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  founded TEXT,
  craft TEXT NOT NULL,
  story_md TEXT NOT NULL,
  hero_image TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  sku TEXT PRIMARY KEY,
  collection_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  hook TEXT NOT NULL,                       -- one-line marketing copy
  description_md TEXT NOT NULL,             -- full prose
  materials TEXT NOT NULL,                  -- e.g. "1.5mm copper, tin lining, brass handle"
  dimensions TEXT,                          -- e.g. "24cm diameter, 8cm depth"
  weight_g INTEGER,
  country_of_origin TEXT,
  workshop_slug TEXT,
  price_cents INTEGER NOT NULL,             -- VAT-inclusive
  is_made_to_order INTEGER NOT NULL DEFAULT 0,
  lead_time_days_min INTEGER,
  lead_time_days_max INTEGER,
  in_stock_qty INTEGER NOT NULL DEFAULT 50,
  active INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (collection_slug) REFERENCES collections(slug),
  FOREIGN KEY (workshop_slug) REFERENCES workshops(slug)
);
CREATE INDEX IF NOT EXISTS idx_products_collection ON products(collection_slug, sort_order);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);

CREATE TABLE IF NOT EXISTS sale_items (
  sku TEXT PRIMARY KEY,
  was_price_cents INTEGER NOT NULL,         -- 30-day prior price (EU Omnibus)
  now_price_cents INTEGER NOT NULL,
  prior_price_from TEXT NOT NULL,           -- ISO date the prior price was effective from
  prior_price_to TEXT NOT NULL,             -- ISO date the prior price was effective until (sale start)
  active INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (sku) REFERENCES products(sku)
);

CREATE TABLE IF NOT EXISTS journal_posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body_md TEXT NOT NULL,
  hero_image TEXT,
  reading_min INTEGER,
  tag TEXT,                                 -- 'kitchen' | 'bath' | 'linen' | 'lighting' | 'brand'
  published INTEGER NOT NULL DEFAULT 1,
  published_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_journal_published ON journal_posts(published, published_at DESC);

-- Cookie-keyed cart (no auth)
CREATE TABLE IF NOT EXISTS carts (
  client_id TEXT PRIMARY KEY,
  items_json TEXT NOT NULL DEFAULT '[]',   -- [{sku, qty, price_cents_at_add}]
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Cookie-keyed save list (no auth)
CREATE TABLE IF NOT EXISTS save_lists (
  client_id TEXT PRIMARY KEY,
  items_json TEXT NOT NULL DEFAULT '[]',   -- [sku, sku, ...]
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Returns flow
CREATE TABLE IF NOT EXISTS return_requests (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  order_ref TEXT,                           -- visitor-provided
  reason TEXT NOT NULL,
  skus_json TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'requested', -- 'requested'|'approved'|'declined'|'completed'
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Wholesale flow
CREATE TABLE IF NOT EXISTS wholesale_inquiries (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  business_name TEXT,
  rooms_or_units INTEGER,
  estimated_value_cents INTEGER,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new',       -- 'new'|'quoted'|'won'|'lost'
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4 collections
INSERT OR REPLACE INTO collections (slug, name, hero_md, sort_order) VALUES
('kitchen', 'Kitchen', 'Cookware, boards, bowls, brass — the things that go in your hands every day. Copper from a Pyrenean workshop founded in 1834. Walnut boards in end-grain. Tuscan terracotta thrown by hand. The pieces that quietly outlast every other tool in the kitchen.', 1),
('bath', 'Bath', 'Linen towels that get better with every wash. Olive-oil soap in two scents. Limestone cut in Mġarr. Brass hooks forged in Florence. Everything in the bath we''d want in our own.', 2),
('linen', 'Linen', '100% Lithuanian linen, stonewashed for softness. Sheets in three sizes, throws, tablecloths, napkins, curtains, cushion covers. Linen breathes — it''s cool in summer, warm in winter, and softer at year ten than at year one.', 3),
('lighting', 'Lighting', 'Brushed brass and linen. Table lamps, pendants, sconces. Hardwired pieces are made-to-order from a Florentine workshop; the table lamp is in stock. Every electrical fitting carries a 12-month warranty.', 4);

-- 4 workshops
INSERT OR REPLACE INTO workshops (slug, name, country, founded, craft, story_md, sort_order) VALUES
('pyrenees-copper', 'Pyrenees Copper Works', 'France', '1834', 'Hand-spinning of 1.5mm copper cookware',
 'A family workshop in a village in the French Pyrenees, founded by a tin-smith in 1834 and now run by his great-great-grandchildren. They spin copper sheet over wooden forms by hand, line every piece with tin or stainless, and re-tin pieces returned 5 to 30 years later. Casal pans here are pre-tinned and re-tinnable for €60 — bring it back to us, we send it back to the Pyrenees.', 1),
('lithuania-linen', 'Lithuanian Linen Mill', 'Lithuania', '1962', 'Stonewashed linen weaving',
 'A mill in the Lithuanian countryside that has been weaving flax-grown linen since 1962 — the only one of its kind that still uses water-jet looms slow enough not to break the long-fibre yarn. We commission our linen there to a stonewashed finish that takes one wash off the customer''s side.', 2),
('tuscany-ceramics', 'Tuscan Ceramics Studio', 'Italy', NULL, 'Hand-thrown terracotta',
 'A small studio in the Tuscan hill country, two potters, one wheel, food-safe glazes only. Each piece is thrown by hand which means each one is slightly different. We don''t correct the variation — that''s the point.', 3),
('florence-brass', 'Florentine Brass', 'Italy', '1948', 'Cast and forged brass hardware',
 'A Florentine brass workshop in continuous operation since 1948, supplying hardware to design houses across Europe. Our pepper mills, brass hooks, lamp bases and pendants all come from there. Brass patinas — that''s expected; if you want it shiny, Brasso once a quarter.', 4);

-- 32 products across 4 collections
INSERT OR REPLACE INTO products (sku, collection_slug, name, hook, description_md, materials, dimensions, weight_g, country_of_origin, workshop_slug, price_cents, is_made_to_order, lead_time_days_min, lead_time_days_max, sort_order) VALUES
-- Kitchen (10)
('k01', 'kitchen', 'Copper Sauté Pan, 24cm', 'Hand-spun in the Pyrenees. Pre-tinned, re-tinnable.',
 'A 24cm sauté pan in 1.5mm copper, hand-spun from a single sheet. Lined with food-safe tin (re-tinnable for €60). Solid brass handle, riveted not welded. Use for sauces, two-egg pan-poaches, a single sole fillet. Wipe immediately if simmering acidic. Hot water and a soft cloth — never a dishwasher.',
 '1.5mm copper, tin lining, solid brass handle', '24cm diameter, 8cm depth', 1900, 'France', 'pyrenees-copper', 31000, 0, 2, 5, 1),
('k02', 'kitchen', 'Copper Saucepan, 18cm', 'Sized for a single sauce or two-egg pan-poach.',
 'A small copper saucepan for the small-batch tasks: one cup of milk, two eggs in poaching water, a hollandaise. 1.5mm copper with tin lining, riveted brass handle. The saucepan you''ll reach for first.',
 '1.5mm copper, tin lining, brass handle', '18cm diameter, 9cm depth', 1100, 'France', 'pyrenees-copper', 24000, 0, 2, 5, 2),
('k03', 'kitchen', 'Copper Frying Pan, 28cm', 'The all-rounder. Stainless lining for utility.',
 'A 28cm copper frying pan, lined with stainless steel rather than tin so you can cook acidic foods and use metal utensils. Brass handle, riveted. The everyday cook-with-it pan; pair with the 24cm sauté for two-burner work.',
 '1.5mm copper, stainless lining, brass handle', '28cm diameter, 5cm depth', 1750, 'France', 'pyrenees-copper', 34000, 0, 2, 5, 3),
('k04', 'kitchen', 'Walnut Cutting Board, large', 'End-grain walnut. 50 × 35 × 4cm.',
 'A large end-grain walnut cutting board. Heavy enough not to slide on the counter, large enough for a whole roast chicken. End-grain construction means knives self-heal between strokes — the wood absorbs the cut and rebounds. Oil monthly with food-safe mineral oil.',
 'American black walnut, oiled', '50 × 35 × 4cm', 4200, 'Italy', NULL, 12000, 0, 2, 5, 4),
('k05', 'kitchen', 'Walnut Cutting Board, medium', 'End-grain walnut. 35 × 25 × 3cm.',
 'The everyday board — fits beside the sink, large enough for an onion-garlic-herb prep but small enough to wash easily. Same end-grain walnut construction as the large board.',
 'American black walnut, oiled', '35 × 25 × 3cm', 2400, 'Italy', NULL, 8800, 0, 2, 5, 5),
('k06', 'kitchen', 'Hand-thrown Bowl, set of 4', 'Each thrown by hand — they vary slightly.',
 'A set of four pasta-or-soup bowls in Tuscan terracotta with a food-safe glaze. Each thrown by hand at the Tuscan workshop — they vary slightly in profile by 1-2mm, which is the point. Dishwasher-safe though we hand-wash ours.',
 'Tuscan terracotta, food-safe glaze', '~22cm diameter, 6cm depth', 600, 'Italy', 'tuscany-ceramics', 14800, 0, 2, 5, 6),
('k07', 'kitchen', 'Hand-thrown Pasta Bowl', 'The single bowl that does everything.',
 'The do-everything terracotta bowl — pasta, salad, ramen, a long breakfast. Same Tuscan workshop as the set of four; same food-safe glaze; same hand-thrown variation.',
 'Tuscan terracotta, food-safe glaze', '~22cm diameter, 6cm depth', 600, 'Italy', 'tuscany-ceramics', 3800, 0, 2, 5, 7),
('k08', 'kitchen', 'Brass Pepper Mill', 'Made in a Florentine workshop. Will patina.',
 'A solid brass pepper mill with a ceramic grinding burr. Made in Florence by a workshop in continuous operation since 1948. Brass patinas — that''s expected; if you want it shiny, Brasso once a quarter. The grind is adjustable from coarse to fine via the top dial.',
 'Solid brass, ceramic burr', '6cm diameter, 18cm tall', 480, 'Italy', 'florence-brass', 7600, 0, 2, 5, 8),
('k09', 'kitchen', 'Olive-Wood Spoons, set of 3', '25cm, 28cm, 30cm. From Mġarr offcuts.',
 'A set of three olive-wood spoons turned from offcuts at a Mġarr workshop. Beeswax-finished, never varnished. Hand-wash; oil with food-safe mineral oil twice a year.',
 'Olive wood, beeswax-finished', '25cm, 28cm, 30cm', 280, 'Malta', NULL, 5400, 0, 2, 5, 9),
('k10', 'kitchen', 'Linen Apron', 'Adjustable cross-back. Stonewashed.',
 'A stonewashed linen apron with adjustable cross-back straps. One large front pocket, one chest pocket. Long enough to cover most clothes; short enough to move in. Machine-washable cold; line-dry.',
 '100% Lithuanian linen, stonewashed', 'One size — adjusts S to XL', 480, 'Lithuania', 'lithuania-linen', 6800, 0, 2, 5, 10),
-- Bath (8)
('b01', 'bath', 'Linen Bath Sheet', 'The towel that gets better with age.',
 'A 100×180cm linen bath sheet in stonewashed Lithuanian linen. Linen absorbs without holding water — it''s why the Romans used it. Soft straight out of the box, softer at year three. Machine-wash cold, tumble-dry low or line-dry.',
 '100% linen, stonewashed', '100 × 180cm', 880, 'Lithuania', 'lithuania-linen', 8800, 0, 2, 5, 1),
('b02', 'bath', 'Linen Hand Towel, set of 2', 'Pair them with the bath sheet.',
 'Two 50×75cm linen hand towels in the same stonewashed linen as the bath sheet. The set is sized for a guest bath where you''d hang one to air and have the second on standby.',
 '100% linen, stonewashed', '50 × 75cm each', 360, 'Lithuania', 'lithuania-linen', 5200, 0, 2, 5, 2),
('b03', 'bath', 'Bristle Body Brush', 'Long handle. Replaces the loofah.',
 'A long-handled body brush with natural plant bristles set in beech. Replaces the loofah for dry-brushing or in-shower exfoliation. The bristles soften with use; replace every 2-3 years.',
 'Beech wood, natural plant bristles', '40cm length', 220, 'Italy', NULL, 3800, 0, 2, 5, 3),
('b04', 'bath', 'Olive-Oil Soap, bar', 'The bar in every Marsalforn bath.',
 'A 200g bar of saponified olive oil — no fragrance, no surfactants beyond what the oil itself does. The bar in every Marsalforn bath; useful for hands, body, and (yes) shaving. Lasts about three weeks of daily use.',
 'Saponified olive oil, no fragrance', '8 × 5 × 3cm, 200g', 200, 'Italy', NULL, 1400, 0, 2, 5, 4),
('b05', 'bath', 'Lavender Soap, bar', 'Same base, scented for evening.',
 'The same olive-oil base as our unscented bar, with organic lavender essential oil added. Calming for the evening bath. 200g.',
 'Saponified olive oil, organic lavender essential oil', '8 × 5 × 3cm, 200g', 200, 'Italy', NULL, 1600, 0, 2, 5, 5),
('b06', 'bath', 'Brass Hook, set of 2', 'Forged in Florence. Patinas warm.',
 'A pair of solid brass coat-or-towel hooks, forged in Florence (same workshop as the pepper mill). Screws included; mounts to wood, plaster, or tile (via wall-anchor, not included). Brass patinas; that''s expected.',
 'Solid brass, screws included', '6cm projection × 4cm wide', 220, 'Italy', 'florence-brass', 4200, 0, 2, 5, 6),
('b07', 'bath', 'Stone Soap Dish', 'Hand-cut in Mġarr. Drains naturally.',
 'A hand-cut Maltese limestone soap dish. Limestone is mildly absorbent, so it draws water away from the bar — your soap lasts longer. Hand-cut in Mġarr; each piece varies slightly in shape.',
 'Maltese limestone', '12 × 8 × 2cm', 380, 'Malta', NULL, 2800, 0, 2, 5, 7),
('b08', 'bath', 'Linen Robe', 'Belt and pockets. Sized S/M/L.',
 'A stonewashed linen robe — knee-length, two patch pockets, fabric belt. The robe to throw on after a swim, after a bath, in the morning. Machine-wash cold; tumble-dry low or line-dry. Sized S, M, L; the body is generous so size down if between.',
 '100% linen, stonewashed', 'S/M/L', 720, 'Lithuania', 'lithuania-linen', 14800, 0, 2, 5, 8),
-- Linen (8)
('l01', 'linen', 'Sheet Set, single', 'Fitted, flat, 1 pillowcase.',
 'A single linen sheet set: 1 fitted, 1 flat, 1 pillowcase. 100% Lithuanian linen, stonewashed for softness. Linen sheets are cooler than cotton in summer and warmer in winter — the fibre breathes and regulates.',
 '100% Lithuanian linen', 'Single bed (90×190cm)', 1600, 'Lithuania', 'lithuania-linen', 17500, 0, 2, 5, 1),
('l02', 'linen', 'Sheet Set, double', '1 fitted, 1 flat, 2 pillowcases.',
 'A double linen sheet set: fitted, flat, 2 pillowcases. Same stonewashed Lithuanian linen as the single. Replace every 8-10 years; ours has lasted 12 with weekly washing.',
 '100% Lithuanian linen', 'Double bed (140×190cm)', 2200, 'Lithuania', 'lithuania-linen', 23500, 0, 2, 5, 2),
('l03', 'linen', 'Sheet Set, king', 'Made to order — 4-6 weeks.',
 'A king linen sheet set, made to order from the Lithuanian mill. 4-6 weeks lead time because the king fitted is woven in long-fibre runs the mill schedules rather than stocks. 1 fitted, 1 flat, 2 pillowcases.',
 '100% Lithuanian linen', 'King bed (180×200cm)', 2800, 'Lithuania', 'lithuania-linen', 29500, 1, 28, 42, 3),
('l04', 'linen', 'Linen Throw', 'Fringed. The sofa throw.',
 'A 130×180cm fringed linen throw — large enough for one person on a couch, two if you''re close. Stonewashed and softer than it looks. Hand-fringed at the mill.',
 '100% linen, stonewashed', '130 × 180cm', 720, 'Lithuania', 'lithuania-linen', 12800, 0, 2, 5, 4),
('l05', 'linen', 'Linen Tablecloth', 'Seats 6-8.',
 'A 140×220cm hemmed linen tablecloth. Seats 6-8 at a standard dining table. Wine and oil come out with cold water and time. We don''t iron ours — the wrinkle is part of the linen.',
 '100% linen, hemmed', '140 × 220cm', 880, 'Lithuania', 'lithuania-linen', 9200, 0, 2, 5, 5),
('l06', 'linen', 'Linen Napkins, set of 4', '45 × 45cm each.',
 'A set of four 45×45cm linen napkins. Hemmed on all four sides. The set we use at home; replace every 8 years.',
 '100% linen, hemmed', '45 × 45cm each', 320, 'Lithuania', 'lithuania-linen', 5600, 0, 2, 5, 6),
('l07', 'linen', 'Linen Curtain Panel', 'Made to order. Two needed for a window.',
 'A 140×260cm linen curtain panel with header tape. Made to order from the Lithuanian mill (4-6 weeks). Two panels per standard window. Linen filters light without blacking it out — the morning glow is the whole point.',
 '100% linen, with header tape', '140 × 260cm', 1100, 'Lithuania', 'lithuania-linen', 16500, 1, 28, 42, 7),
('l08', 'linen', 'Linen Cushion Cover', '50 × 50cm. Insert sold separately.',
 'A 50×50cm linen cushion cover with a hidden zip. Insert sold separately (any 50×50 feather or down insert fits). Stonewashed; softer at year three.',
 '100% linen, hidden zip', '50 × 50cm', 240, 'Lithuania', 'lithuania-linen', 5800, 0, 2, 5, 8),
-- Lighting (6)
('lt01', 'lighting', 'Brass Table Lamp', 'EU plug, dimmer included.',
 'A solid brass table lamp with a linen shade and a 2-meter EU-plug cord with an in-line dimmer. In stock. Patinas with age — same warm finish as our pepper mill and brass hooks. Pair with our linen lampshade as a replacement option in 5 years.',
 'Solid brass, linen shade, EU plug', '40cm tall, 25cm shade diameter', 2200, 'Italy', 'florence-brass', 29500, 0, 2, 5, 1),
('lt02', 'lighting', 'Pendant — Single', 'Hardwired install.',
 'A brushed brass pendant with a linen shade and 1.5m flex. Hardwired install — your electrician needs 15 minutes per pendant. Made to order in Florence; 4-6 weeks lead time. 12-month warranty on all electrical fittings.',
 'Brushed brass, linen shade', '30cm shade diameter, 1.5m flex', 1100, 'Italy', 'florence-brass', 42000, 1, 28, 42, 2),
('lt03', 'lighting', 'Pendant — Triple', 'Three pendants on a single bar.',
 'Three brushed brass pendants on a single 90cm bar — fits a kitchen island or a long dining table. Each pendant is dimmable independently. Made to order; 4-6 weeks. 12-month warranty.',
 'Brushed brass, linen shades, 90cm bar', '90cm bar, 30cm shades', 3300, 'Italy', 'florence-brass', 82000, 1, 28, 42, 3),
('lt04', 'lighting', 'Brass Sconce', 'Hardwired wall mount.',
 'A solid brass wall sconce with a linen shade. Hardwired install (a junction box is required). Made to order in Florence; 4-6 weeks. 12-month warranty.',
 'Solid brass, linen shade', '20cm projection, 25cm shade', 1800, 'Italy', 'florence-brass', 18500, 1, 28, 42, 4),
('lt05', 'lighting', 'Linen Lampshade only', 'Replacement / upgrade for table lamps.',
 'A standalone linen drum lampshade — fits our table lamp or any lamp with an E27 fitting and ≤30cm shade ring. Same stonewashed linen as the bath sheets and bedding.',
 '100% linen, drum form, E27 fitting', '25cm diameter, 18cm tall', 220, 'Lithuania', 'lithuania-linen', 8800, 0, 2, 5, 5),
('lt06', 'lighting', 'Beeswax Candle, set of 6', '20cm tapers. The honest candle.',
 'A set of six 20cm beeswax tapers. Pure beeswax (no paraffin), cotton wick. Burn time: ~6 hours per taper. Beeswax burns cleaner and slower than paraffin and has a faint honey smell.',
 '100% beeswax, cotton wick', '20cm tall, 1.8cm diameter, set of 6', 480, 'Italy', NULL, 3600, 0, 2, 5, 6);

-- 5 sale items with EU Omnibus 30-day prior price
INSERT OR REPLACE INTO sale_items (sku, was_price_cents, now_price_cents, prior_price_from, prior_price_to) VALUES
('k04', 12000, 9600, '2026-04-01', '2026-05-01'),
('b05', 1600, 1200, '2026-04-01', '2026-05-01'),
('lt05', 8800, 6800, '2026-04-01', '2026-05-01'),
('l05', 9200, 7400, '2026-04-01', '2026-05-01'),
('k08', 7600, 6000, '2026-04-01', '2026-05-01');

-- 8 journal posts
INSERT OR REPLACE INTO journal_posts (slug, title, excerpt, body_md, tag, reading_min, published_at) VALUES
('why-copper', 'Why copper, still', 'The case for cookware that lasts 60 years.',
 '# Why copper, still

When my grandfather died in 2018 he left me a copper saucepan. It had been bought in 1962, used by his mother, my mother, and him. The tin lining had been replaced twice. The brass handle still rivets to the body the way it did the day it was hammered.

That pan is the reason Marsalforn Home sells copper cookware.

Copper is the most thermally responsive metal in a domestic kitchen — it heats faster than any pan you can buy at any price. That responsiveness is why French restaurant kitchens switched to copper in the 17th century and why Michelin kitchens haven''t switched away. You set the hob to 4, the pan is at the right temperature in 30 seconds, you turn the hob off, the pan stops cooking. It''s the closest thing a domestic cook gets to the precision of a chef''s induction range.

The trade-off is care. Copper hates the dishwasher. Copper hates being left to simmer tomato sauce overnight. Copper requires re-tinning every 5 to 30 years (mostly closer to 30 if you don''t scrub the lining). And copper is expensive: a 24cm sauté is €310. A serviceable steel one is €40.

The maths only works if you keep it. We have customers using our pans daily who bought them five years ago. The same pan, properly cared for, will outlast every pan most cooks buy in their lifetime.

If you''re going to buy one piece, the 24cm sauté is the right one. Sauces, two-egg pan-poaches, sole fillets, ragùs slow-cooked at low temperature. If you have one copper pan, that''s the one.

Mateo', 'kitchen', 7, '2026-04-08T09:00:00'),
('lithuanian-linen-photos', 'Lithuanian linen, in 9 photos', 'Workshop visit.',
 '# Lithuanian linen, in 9 photos

Last September I drove from Vilnius to a small mill in the Lithuanian countryside that has been weaving linen since 1962. I went because I''d had three years of correspondence with their head weaver, Algimantas, and we were about to commission three new fabric weights for the spring collection.

What follows is nine photos and what I learned.

## The flax fields

The mill is surrounded by flax fields they don''t own. They source from a co-operative of about 30 farms within an hour''s drive. Flax has to be retted (rotted, controlled) in the field for two to three weeks after harvest before the fibres release. The retting is what gives Lithuanian linen its slight irregularity that the cheaper Belgian and Chinese mills don''t reproduce.

## The looms

Algimantas runs three water-jet looms — slow looms, by industry standard. They weave at maybe 70% of the speed of a modern shuttle loom. The reason is the long-fibre yarn we asked them to use. Faster looms break it. Slower looms thread it.

## The stonewash

After weaving, every piece of cloth is stonewashed in industrial drums with pumice stones. This is what makes our linen feel soft on first contact rather than after a year of wash cycles. It also slightly fades the cloth, which is the look we want.

## What I learned

If you''ve never seen a linen mill operating, the thing that stays with you is the sound. A water-jet loom doesn''t clatter — it whispers. The whole mill room sounds like a long exhale.

Mateo', 'linen', 9, '2026-04-15T09:00:00'),
('1834-pyrenean-spinner', 'The 1834 Pyrenean copper-spinner who makes our pans', 'Family workshop, sixth generation.',
 '# The 1834 Pyrenean copper-spinner who makes our pans

Marc-Antoine''s great-great-great-grandfather was a tin-smith who started making copper pans in 1834 because the village was getting too small to support a tin-smith and copper was the obvious adjacent business. Six generations later, Marc-Antoine and his wife Hélène run the workshop with two apprentices, and the workshop is exactly where it was in 1834.

I met Marc-Antoine at a trade show in 2019 when I was still designing kitchen tools in Copenhagen. We talked for two hours about lead times. When I started Marsalforn Home four years later, his workshop was the first I called.

## How they make a pan

Each pan starts as a flat copper disc, 1.5mm thick. Marc-Antoine spins the disc on a wooden form by hand, working the metal up to shape with a steel rod. The whole spinning process for one pan is about 25 minutes. The brass handles are forged separately and riveted on by hand — never welded, never glued. The tin lining is wiped on by hand using a torch and a tow of cotton, exactly the way it''s been done since 1834.

## Why we re-tin

After 5 to 30 years of use, the tin lining wears through. (Some customers manage decades, others wear it through in a few years if they cook acidically often.) When that happens, you send the pan back to us, we send it to Marc-Antoine, he re-tins it, we send it back to you. €60 plus shipping. The pan keeps going.

I bought my own first sauté in 2020. It''s due for its first re-tin around 2050, on current usage.

Mateo', 'kitchen', 8, '2026-04-22T09:00:00'),
('on-living-with-patina', 'On living with patina', 'Brass that gets better.',
 '# On living with patina

The first email I get from a customer who bought a brass pepper mill or a pair of hooks usually says something like: "It''s gone darker. Is that supposed to happen?"

Yes. That''s what brass does.

Brass is an alloy of copper and zinc. Copper oxidises in contact with oxygen, water vapour, and the natural oils on your hands. The oxidation forms a thin, mostly invisible layer that we call patina. The patina darkens the metal slightly and protects what''s underneath. It''s a feature, not a defect.

If you want it shiny, you can Brasso it. Most people do, the first six months. Most people stop doing it around month seven, after they realise the warm darker brass looks better.

Our pepper mills, brass hooks, lamp bases, sconces and pendants all develop the patina at the same rate. After a year they look about 20% darker than the day you bought them. After five years they look about 30% darker. Past 10 years the rate of change slows to almost nothing — the metal has reached its natural equilibrium.

If you genuinely don''t want patina, don''t buy brass. Buy chrome or stainless. Both are designed to stay the way they leave the factory.

But brass that''s been allowed to do its thing is, to my eye, more beautiful than the day-one version.

Mateo', 'brand', 5, '2026-04-29T09:00:00'),
('three-things-saute-pan', 'Three things to make in the 24cm sauté pan', 'A recipe trio.',
 '# Three things to make in the 24cm sauté pan

If you''ve just unboxed the 24cm sauté and you don''t know where to start, three things in increasing complexity.

## 1. Pan-poached eggs

Bring 2cm of water to a low simmer in the pan. Crack two eggs straight in (no vinegar, no swirling). Cover. After three minutes, lift them out with a slotted spoon onto buttered toast. Done.

The reason this works in this pan is the heat response — copper holds the simmer tightly, neither boiling the whites to leather nor dropping below set point and refusing to cook them. Three minutes, every time.

## 2. Sauce normande for white fish

Sweat one finely-chopped shallot in butter until translucent (5 min). Add a glass of dry white wine and reduce by half. Add 200ml fish stock and reduce by half again. Off the heat, mount with cold butter cube by cube — 6 cubes is plenty. A few drops of lemon. Salt.

Pour over a piece of poached or grilled white fish. The pan''s tin lining handles the wine and lemon without reacting; you couldn''t do this in an unlined copper pan.

## 3. Slow-cooked ragù alla bolognese

500g minced beef chuck, 100g pancetta, one onion, one carrot, one celery stalk, all finely chopped. Brown the beef in olive oil, set aside. Sweat the soffritto, return the beef, add 200ml white wine and reduce off. Add 200ml whole milk and reduce off (sounds wrong, isn''t). Add 400g passata and 200ml stock. Cover, simmer on the lowest heat for 4 hours, stirring every 30 min.

The pan''s thermal mass means once you set it to a low simmer, it stays there — no hot spots, no scorching. By hour four the sauce is the right colour.

Mateo', 'kitchen', 8, '2026-05-06T09:00:00'),
('stopped-selling-cotton', 'Why we stopped selling cotton sheets', 'Linen does it better.',
 '# Why we stopped selling cotton sheets

For our first six months we sold cotton sateen sheets alongside the linen ones. Same Lithuanian mill, same stonewashed finish, both single-fibre.

We stopped selling cotton in May 2024 because every customer who bought linen for the first time stopped buying cotton from anyone, ours or otherwise. The linen sheets did three things the cotton sheets didn''t do as well:

1. **They stayed cool in summer.** Linen breathes. Cotton sateen, however high the thread count, doesn''t breathe — it shines, which is its other selling point, but the smoothness comes from the weave being airtight. Linen''s slight irregularity is what makes the airflow.
2. **They got softer with use.** Cotton sateen is at its softest the day you take it out of the box. Year three it''s slightly less soft. Linen is at its softest at year three.
3. **They lasted.** Our linen sheets are designed to be replaced after 8-10 years of weekly washing. Our cotton sheets, at the same thread count and same finish, were lasting more like 4-5 years.

We could have kept the cotton in the catalogue and let customers choose. We chose to take it out because it muddied the message. Linen is what we recommend; selling cotton next to it implied the choice was a matter of preference. It isn''t — for a sheet that''s going to live with you for a decade, linen is better.

Mateo', 'linen', 6, '2026-05-13T09:00:00'),
('limestone-soap-dishes', 'Limestone soap dishes — what we learned in Mġarr', 'Hand-cut, slightly absorbent.',
 '# Limestone soap dishes — what we learned in Mġarr

The stone soap dish is one of our smallest pieces. A 12×8×2cm slab of Maltese limestone, hand-cut in a Mġarr workshop. €28.

The reason we sell it: limestone is mildly absorbent. A bar of olive-oil soap sat on a glass or steel dish dies in three weeks because the bar sits in its own dissolution puddle. On a limestone dish, the puddle gets wicked away — the bar lasts about five weeks.

We didn''t know any of this when we started. The reason we have a Maltese limestone soap dish at all is that I have a friend who runs a stone-cutting workshop in Mġarr (mostly headstones and worktops), and one day I asked him whether limestone offcuts would work as soap dishes. He cut me three from offcuts and gave them to me to test.

Three months later one of the dishes had a faint dark stain from the soap on it. Three months after that, the stain had become a uniform warm patina that I liked. Three years on, all of mine look like that.

That''s the case for the limestone — it lasts (it''s stone), it makes the soap last, and it changes appearance with use in a way that I find appealing.

What we learned: don''t over-engineer it. The dish is just a slab. We don''t carve a drainage channel because the stone does the draining. We don''t glaze it because the glaze would defeat the absorbency. We don''t polish the back because the rough surface grips the counter.

Some products want to be left alone.

Mateo', 'bath', 5, '2026-05-20T09:00:00'),
('pendant-electrician-guide', 'Hardwiring a Marsalforn pendant — what to ask your electrician', 'A 5-minute briefing.',
 '# Hardwiring a Marsalforn pendant — what to ask your electrician

The single Marsalforn pendant ships with a 1.5m brass-finish flex and a screw terminal block. Hardwiring it takes a competent electrician about 15 minutes. Here''s what to ask them, and what they should already know.

## What to ask

1. **Is there a junction box at the ceiling location?** If yes, the install is straightforward. If no, your electrician needs to add one. (Most kitchen islands and dining areas have an existing junction box from a previous fitting.)
2. **Does the existing circuit support the additional load?** A single Marsalforn pendant draws ~9W on LED. Negligible — almost any circuit handles it.
3. **What''s the height from ceiling to the desired bottom of the shade?** You probably want 80cm above a kitchen island, 90-100cm above a dining table. The flex is 1.5m, so we have headroom for any standard ceiling.

## What they should already know

- Earth conductor goes to the brass earth pin (yellow-green wire if they''re working in EU; green if UK).
- Live and neutral go to the screw terminal block in the canopy. The block is labelled.
- The shade is held to the brass collar by a single grub screw. They''ll spot it immediately.

## Tools they''ll need

A short Phillips screwdriver. A 2.5mm Allen key for the canopy bracket. A junction-box ladder. Their own ladder.

## What''s in the box

The pendant, a 12-month warranty card, a Marsalforn-branded wiring slip with the same instructions, and a small spare grub screw.

That''s it. The pendant is designed to be installed in 15 minutes. If your electrician has questions, email me — I''ll respond within 24 hours.

Mateo', 'lighting', 6, '2026-05-27T09:00:00');
