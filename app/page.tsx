import { CaseStudies } from "@/components/CaseStudies";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { Offer } from "@/components/Offer";
import { Process } from "@/components/Process";
import { Transformation } from "@/components/Transformation";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Transformation />
        <Offer />
        <Process />
        <CaseStudies />
        <FinalCta />
      </main>
      <Footer />
      {/* Clearance so the fixed mobile CTA bar never covers footer content */}
      <div aria-hidden className="h-[84px] bg-ink md:hidden" />
      <MobileCtaBar />
    </>
  );
}
