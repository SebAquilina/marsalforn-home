import { CollectionPage } from "@/components/site/CollectionPage";
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const metadata = { title: "linen", alternates: { canonical: "/linen" } };
export default async function Page() { return <CollectionPage slug="linen" />; }
