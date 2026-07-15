import { DistrictPage, districtMetadata } from "@/components/DistrictPage";
import { DISTRICTS } from "@/lib/districts";

export const dynamicParams = false;

export function generateStaticParams() {
  return DISTRICTS.map((d) => ({ dzielnica: d.slug }));
}

export function generateMetadata({ params }: { params: { dzielnica: string } }) {
  return districtMetadata(params.dzielnica);
}

export default function Page({ params }: { params: { dzielnica: string } }) {
  return <DistrictPage slug={params.dzielnica} />;
}
