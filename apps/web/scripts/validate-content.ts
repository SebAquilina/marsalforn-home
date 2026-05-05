import { readFileSync } from "node:fs";
import { resolve } from "node:path";
let issues = 0;
function check(file: string, mustContain: string[]) {
  let body: string;
  try { body = readFileSync(resolve(file), "utf8"); } catch { console.error(`✗ ${file} — not readable`); issues++; return; }
  for (const m of mustContain) {
    if (!body.includes(m)) { console.error(`✗ ${file} — missing: "${m}"`); issues++; }
  }
}
check("components/site/Footer.tsx", ["Concept site by", "concierge.studio", "VAT/MBR"]);
check("components/site/ConceptBanner.tsx", ["Marsalforn Home", "concierge.studio"]);
check("lib/agent/system-prompt.ts", ["Mateo", "Marsalforn Home", "EU Omnibus", "EU CRD", "wholesale"]);
check("lib/agent/kb.ts", ["Marsalforn", "Lithuanian", "Pyrenees", "Florentine"]);
check("components/front/FrontHero.tsx", ["Ask Mateo", "Mateo", "Marsalforn"]);
check("app/(public)/page.tsx", ["FrontHero"]);
check("drizzle/migrations/0003_marsalforn.sql", ["collections", "products", "sale_items", "journal_posts", "carts", "save_lists", "return_requests", "wholesale_inquiries"]);
if (issues === 0) { console.log("[validate-content] OK"); process.exit(0); }
console.error(`[validate-content] FAILED — ${issues} issues`); process.exit(1);
