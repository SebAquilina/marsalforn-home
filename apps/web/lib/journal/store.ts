import type { D1Database } from "@cloudflare/workers-types";
export type Post = { slug: string; title: string; excerpt: string; body_md: string; tag: string | null; reading_min: number | null; published: number; published_at: string };
function db(): D1Database | null {
  const env = process.env as unknown as { DB?: D1Database };
  const g = globalThis as unknown as { DB?: D1Database };
  return env.DB ?? g.DB ?? null;
}
export async function listPosts(opts: { tag?: string; publishedOnly?: boolean } = {}): Promise<Post[]> {
  const d = db(); if (!d) return [];
  const conds: string[] = ["1=1"]; const args: unknown[] = [];
  if (opts.publishedOnly !== false) conds.push("published = 1");
  if (opts.tag) { conds.push("tag = ?"); args.push(opts.tag); }
  const r = await d.prepare(`SELECT * FROM journal_posts WHERE ${conds.join(" AND ")} ORDER BY published_at DESC`).bind(...args).all<Post>();
  return r.results ?? [];
}
export async function getPost(slug: string): Promise<Post | null> {
  const d = db(); if (!d) return null;
  return await d.prepare("SELECT * FROM journal_posts WHERE slug = ?").bind(slug).first<Post>() ?? null;
}
