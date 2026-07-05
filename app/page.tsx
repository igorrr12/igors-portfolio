import { BeforeAfter } from "@/components/BeforeAfter";
import { CaseStudies } from "@/components/CaseStudies";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LeadForm } from "@/components/LeadForm";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { Offer } from "@/components/Offer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BeforeAfter />
        <Offer />
        <CaseStudies />
        <LeadForm />
        <FinalCta />
      </main>
      <Footer />
      {/* Clearance so the fixed mobile CTA bar never covers footer content */}
      <div aria-hidden className="h-[84px] bg-night md:hidden" />
      <MobileCtaBar />
    </>
  );
}
