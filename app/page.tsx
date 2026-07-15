import { Cover } from "@/components/Cover";
import { GuideLine } from "@/components/GuideLine";
import { CuratorNote } from "@/components/CuratorNote";
import { Exhibition } from "@/components/Exhibition";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { MobileContactBar } from "@/components/MobileContactBar";
import { Nav } from "@/components/Nav";
import { Process } from "@/components/Process";
import { ProgressLine } from "@/components/ProgressLine";

export default function Home() {
  return (
    <>
      <Nav overlay />
      <ProgressLine />
      <main className="relative">
        <GuideLine />
        <Cover />
        <Exhibition />
        <CuratorNote />
        <Process />
        <ContactSection />
      </main>
      <Footer />
      <MobileContactBar />
    </>
  );
}
