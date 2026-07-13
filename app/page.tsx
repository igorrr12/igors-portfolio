import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="gallery-frame flex min-h-screen flex-col justify-center gap-6">
        <p className="caption caption-dot">Wystawa stała · Warszawa 2026</p>
        <h1 className="font-display text-6xl font-medium">
          Zażółć gęślą jaźń — <em>zażółć gęślą jaźń</em>
        </h1>
        <span className="rule" />
      </main>
      <Footer />
    </>
  );
}
