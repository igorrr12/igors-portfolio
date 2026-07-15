import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Breadcrumbs } from "./Breadcrumbs";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";
import { MobileContactBar } from "./MobileContactBar";

/**
 * Shared chrome for every subpage. Structurally guarantees the two global
 * rules: the home link (Nav logo, breadcrumb root, Footer logo all → "/")
 * and direct contact everywhere (Nav "Kontakt", the ContactSection block,
 * Footer contact, MobileContactBar).
 */
export function SiteFrame({
  breadcrumbs,
  children,
}: {
  breadcrumbs?: { name: string; path: string }[];
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      <main className="relative">{children}</main>
      <ContactSection />
      <Footer />
      <MobileContactBar />
    </>
  );
}
