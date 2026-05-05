import { CollectionPage } from "@/components/site/CollectionPage";
export const runtime = "edge";
export const dynamic = "force-dynamic";
export const metadata = { title: "bath", alternates: { canonical: "/bath" } };
export default async function Page() { return <CollectionPage slug="bath" />; }
