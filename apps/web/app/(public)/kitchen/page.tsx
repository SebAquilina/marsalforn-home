import { CollectionPage } from "@/components/site/CollectionPage";
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const metadata = { title: "kitchen — Marsalforn Home", alternates: { canonical: "/kitchen" } };
export default async function Page() { return <CollectionPage slug="kitchen" />; }
