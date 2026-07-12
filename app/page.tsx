import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Metrics from "@/components/Metrics";
import Transformation from "@/components/Transformation";
import DecisionStream from "@/components/DecisionStream";
import Services from "@/components/Services";
import Why from "@/components/Why";
import ProjectJourney from "@/components/ProjectJourney";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Clients />
      <Metrics />
      <Transformation />
      <DecisionStream />
      <Services />
      <Why />
      <ProjectJourney />
      <Process />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
