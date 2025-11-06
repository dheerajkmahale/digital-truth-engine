import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AnalysisUpload from "@/components/AnalysisUpload";
import HowItWorks from "@/components/HowItWorks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <AnalysisUpload />
      <HowItWorks />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
