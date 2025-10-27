import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Users, Shield } from "lucide-react";
import heroImage from "@/assets/hero-workforce.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Global workforce professionals"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full border border-accent/30">
            <Globe className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">
              Connecting Global Talent with Opportunities
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Strategic Workforce Solutions for a{" "}
            <span className="text-accent">Global Economy</span>
          </h1>

          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            We specialize in sourcing, screening, and deploying skilled and semi-skilled workers to meet the evolving workforce needs of international employers. Built on ethics, efficiency, and excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow group"
            >
              Partner With Us
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("services")}
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Explore Our Services
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-foreground">50K+</div>
                <div className="text-sm text-primary-foreground/80">Workers Placed</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-foreground">25+</div>
                <div className="text-sm text-primary-foreground/80">Countries Served</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-foreground">98%</div>
                <div className="text-sm text-primary-foreground/80">Compliance Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
