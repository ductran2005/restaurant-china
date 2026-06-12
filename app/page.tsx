import { About } from "@/components/About";
import { CtaFooter } from "@/components/CtaFooter";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { OrderDialog } from "@/components/OrderDialog";
import { Process } from "@/components/Process";
import { UspBar } from "@/components/UspBar";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <UspBar />
      <About />
      <Process />
      <CtaFooter />
      <OrderDialog />
    </main>
  );
}
