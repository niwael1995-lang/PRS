import Hero from "@/components/Hero";

const Index = () => {
  // Home page should only show the Hero / primary home content.
  // Navigation and Footer are rendered by App so they remain persistent.
  return (
    <div className="min-h-screen">
      <Hero />
    </div>
  );
};

export default Index;
