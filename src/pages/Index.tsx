import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CriteriaBar from "@/components/CriteriaBar";
import ServiceBars from "@/components/ServiceBars";
import WeddingSection from "@/components/WeddingSection";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CriteriaBar />
        <ServiceBars />
        <WeddingSection />
        <Process />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
