import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const goTo = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Reordered navigation per request: Home, Services, Jobs, Compliance, Why Choose Us, About, Contact Us
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Jobs", path: "/jobs" },
    { label: "Compliance", path: "/compliance" },
    { label: "Why Choose Us", path: "/why-choose-us" },
    { label: "About", path: "/about" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center">
            <h1 className="text-xl lg:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Professional Recruitment Services
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => goTo((item as any).path || "/")}
                className="text-foreground/80 hover:text-foreground font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button onClick={() => goTo("/contact")} className="bg-accent hover:bg-accent/90">
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => goTo((item as any).path || "/")}
                  className="text-left text-foreground/80 hover:text-foreground font-medium transition-colors px-2 py-1"
                >
                  {item.label}
                </button>
              ))}
              <Button onClick={() => goTo("/contact") } className="bg-accent hover:bg-accent/90">
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
