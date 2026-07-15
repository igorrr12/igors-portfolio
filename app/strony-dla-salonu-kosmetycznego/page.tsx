import { IndustryPage, industryMetadata } from "@/components/IndustryPage";

export const generateMetadata = () => industryMetadata("strony-dla-salonu-kosmetycznego");

export default function Page() {
  return <IndustryPage slug="strony-dla-salonu-kosmetycznego" />;
}
