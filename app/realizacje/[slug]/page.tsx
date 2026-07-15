import { WorkDetail, workMetadata } from "@/components/WorkDetail";
import { WORKS } from "@/lib/works";

export const dynamicParams = false;

export function generateStaticParams() {
  return WORKS.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return workMetadata(params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <WorkDetail slug={params.slug} />;
}
