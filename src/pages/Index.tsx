import Hero from "@/components/Hero";
import QuickLinks from "@/components/QuickLinks";

const Index = () => {
  // Home page should only show the Hero / primary home content.
  // Navigation and Footer are rendered by App so they remain persistent.
  return (
    <div className="home-page min-h-screen">
      <QuickLinks />
      <Hero />
    </div>
  );
};

export default Index;
