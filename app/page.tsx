import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProgressLine } from "@/components/ProgressLine";
import { WallLabel } from "@/components/WallLabel";

export default function Home() {
  return (
    <>
      <Header />
      <ProgressLine />
      <main>
        <section id="test-a" data-gallery-stop="Test A" className="gallery-frame flex min-h-screen flex-col justify-center">
          <WallLabel caption="Sekcja testowa" title="Zażółć gęślą jaźń" />
        </section>
        <section id="test-b" data-gallery-stop="Test B" className="gallery-frame min-h-screen pt-24">
          <WallLabel caption="Druga sekcja" title="Rytm i linia" />
        </section>
      </main>
      <Footer />
    </>
  );
}
