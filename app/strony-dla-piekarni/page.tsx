import { IndustryPage, industryMetadata } from "@/components/IndustryPage";

export const generateMetadata = () => industryMetadata("strony-dla-piekarni");

export default function Page() {
  return <IndustryPage slug="strony-dla-piekarni" />;
}
