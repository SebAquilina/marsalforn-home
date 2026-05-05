import type { D1Database } from "@cloudflare/workers-types";
function db(): D1Database | null {
  const env = process.env as unknown as { DB?: D1Database };
  const g = globalThis as unknown as { DB?: D1Database };
  return env.DB ?? g.DB ?? null;
}
export async function getSaveList(clientId: string): Promise<string[]> {
  const d = db(); if (!d) return [];
  const r = await d.prepare("SELECT items_json FROM save_lists WHERE client_id = ?").bind(clientId).first<{ items_json: string }>();
  if (!r) return [];
  try { return JSON.parse(r.items_json); } catch { return []; }
}
export async function setSaveList(clientId: string, items: string[]): Promise<void> {
  const d = db(); if (!d) return;
  await d.prepare(`INSERT INTO save_lists (client_id, items_json, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
                   ON CONFLICT(client_id) DO UPDATE SET items_json = excluded.items_json, updated_at = CURRENT_TIMESTAMP`)
   .bind(clientId, JSON.stringify(items)).run();
}
