import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WorkPreview from "@/components/WorkPreview";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-void">
      <Navbar />
      <Hero />
      <Services />
      <WorkPreview />
      <CtaBanner />
      <Footer />
    </main>
  );
}
