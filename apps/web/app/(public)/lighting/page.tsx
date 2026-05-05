import { CollectionPage } from "@/components/site/CollectionPage";
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const metadata = { title: "lighting — Marsalforn Home", alternates: { canonical: "/lighting" } };
export default async function Page() { return <CollectionPage slug="lighting" />; }
