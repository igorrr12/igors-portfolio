import { Cover } from "@/components/Cover";
import { CuratorNote } from "@/components/CuratorNote";
import { Exhibition } from "@/components/Exhibition";
import { Footer } from "@/components/Footer";
import { GuestBook } from "@/components/GuestBook";
import { Header } from "@/components/Header";
import { Process } from "@/components/Process";
import { ProgressLine } from "@/components/ProgressLine";

export default function Home() {
  return (
    <>
      <Header />
      <ProgressLine />
      <main>
        <Cover />
        <Exhibition />
        <CuratorNote />
        <Process />
        <GuestBook />
      </main>
      <Footer />
    </>
  );
}
