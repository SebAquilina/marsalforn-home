export const KB = `# Marsalforn Home — site knowledge for Mateo

## The brand
Marsalforn Home is a sustainable home-goods brand from Marsalforn, Gozo,
founded late 2023 by Mateo Cassar after eight years as a senior product
designer in Copenhagen. Three new pieces a season. Production runs of
50-500 units. Designed in Gozo, made in small runs by four partner
workshops across Europe. Photography happens at the Marsalforn
warehouse, which is where Mateo lives.

## The four workshops
- **Pyrenees Copper Works** (France, 1834) — hand-spun 1.5mm copper
  cookware. Re-tin service: €60. Sixth generation.
- **Lithuanian Linen Mill** (Lithuania, 1962) — water-jet looms slow
  enough not to break long-fibre yarn. All linen products.
- **Tuscan Ceramics Studio** (Italy) — two potters, one wheel, food-safe
  glazes only. The terracotta bowls.
- **Florentine Brass** (Italy, 1948) — cast and forged brass hardware.
  Pepper mill, hooks, lamp bases, pendants, sconce.

## The 32 SKUs
(see system prompt for the full catalogue)

## Cart + save list (cookie-keyed, no auth)
The cart and save list both persist in the visitor's browser via a
client_id cookie (cc_cid). No account is needed. The save-list feature
("email me this list") emails the saved SKUs to portfolio@concierge.studio
on opt-in — that's the lead capture.

## Cancellation / cart abandonment
On a real Marsalforn build, abandoned carts trigger a Resend email at
24h. Concept site: that flow is wired but no real email is sent — the
event lands in /admin/leads as a note instead.

## Returns
14-day return window per EU Consumer Rights Directive (CRD). Items
unused, in original packaging. Free pickup within Malta; €15 deduction
otherwise. Made-to-order items (l03, l07, lt02-lt04) not returnable
unless faulty — this is permitted under EU CRD for personalised goods.
Returns flow: ask for email + order ref + reason → start_return
action → admin sees it in /admin/returns.

## EU compliance baked into pages
- /sale renders the 30-day prior price for every sale item (EU Omnibus
  Directive). Format: "was €X (price effective 1 Apr - 1 May 2026)".
- /cart shows EU CRD pre-contract information: trader identity, total
  inc. taxes, delivery cost, time of delivery, complaint procedure,
  right of withdrawal — even on the disabled checkout, because the
  demo has to be correct.

## Care guides per material
- **Copper**: hot water + soft cloth, never dishwasher. Re-tin every
  5-30 years (€60). Pepper-mill brass-finish pieces patina; we don't
  re-finish those.
- **Brass**: patinas. Brasso once a quarter if you want it shiny;
  most people stop at month seven and let it warm.
- **Linen**: machine-wash cold, tumble-dry low or line-dry. Softens
  with use. We don't iron ours.
- **Terracotta**: dishwasher-safe (we hand-wash). Don't soak overnight.
- **Walnut**: oil monthly with food-safe mineral oil. Hand-wash, dry
  upright. Never dishwasher (cracks the wood grain).
- **Olive wood**: same as walnut — mineral oil twice a year, hand-wash,
  air-dry upright.
- **Limestone**: rinse and air-dry. Will develop a soap-stain patina;
  that's expected.

## FAQs (sample)
- **Gift wrap?** Free linen wrap on request. Add a card with handwritten
  message at /cart.
- **Wholesale?** 10% off above €1500 order; over €5000 is a custom
  quote — Mateo handles those personally.
- **Sample fabric?** Yes — €5 returnable with order. Email request.
- **EU CRD pre-contract info?** Visible at /cart before any checkout
  step (which itself is disabled per concept).
`;
