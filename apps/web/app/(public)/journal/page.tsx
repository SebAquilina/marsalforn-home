import Link from "next/link";
import { listPosts } from "@/lib/journal/store";
export const runtime = "edge"; export const dynamic = "force-dynamic";
export const metadata = { title: "Journal", alternates: { canonical: "/journal" } };
export default async function JournalIndex() {
  const posts = await listPosts({ publishedOnly: true });
  return (
    <section>
      <div className="container container--narrow">
        <p className="eyebrow">Journal</p>
        <h1>Reading from Mateo.</h1>
        <p className="lead muted">{posts.length} posts. Materials, workshops, and how to use what we sell.</p>
        <ul className="journal-list">
          {posts.map((p) => (
            <li key={p.slug} className="journal-list-item">
              <Link href={`/journal/${p.slug}`}>
                <h2>{p.title}</h2>
                <p className="muted">{p.excerpt}</p>
                <p className="meta">{new Date(p.published_at).toLocaleDateString("en-MT", { dateStyle: "long" })} · {p.reading_min ?? 5} min read · {p.tag}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
