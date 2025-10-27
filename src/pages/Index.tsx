import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Compliance from "@/components/Compliance";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Jobs from "@/components/Jobs";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
  <Jobs />
      <Compliance />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
