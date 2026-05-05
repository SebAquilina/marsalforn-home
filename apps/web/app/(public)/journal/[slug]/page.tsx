import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/journal/store";
export const runtime = "edge"; export const dynamic = "force-dynamic";

function md(s: string): string {
  return s.split(/\n{2,}/).map((b) => {
    if (b.startsWith("# ")) return `<h2>${esc(b.slice(2))}</h2>`;
    if (b.startsWith("## ")) return `<h3>${esc(b.slice(3))}</h3>`;
    return `<p>${esc(b).replace(/\n/g,"<br/>").replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>")}</p>`;
  }).join("\n");
}
function esc(s: string) { return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = await getPost(params.slug);
  return p ? { title: `${p.title}`, description: p.excerpt, alternates: { canonical: `/journal/${p.slug}` } } : { title: "Journal" };
}

export default async function JournalPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post || !post.published) notFound();
  return (
    <article className="journal-post">
      <div className="container container--narrow">
        <p className="eyebrow"><Link href="/journal" className="muted">← Journal</Link></p>
        <p className="meta">{new Date(post.published_at).toLocaleDateString("en-MT", { dateStyle: "long" })} · {post.reading_min ?? 5} min read</p>
        <div dangerouslySetInnerHTML={{ __html: md(post.body_md) }} />
        <p className="meta muted" style={{ marginTop: "var(--space-7)" }}>— Mateo · founder, Marsalforn Home</p>
      </div>
    </article>
  );
}
