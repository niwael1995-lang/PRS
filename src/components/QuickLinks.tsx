import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const QuickLinks = () => {
  const { pathname } = useLocation();

  const items: Array<{ label: string; path: string }> = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Jobs", path: "/jobs" },
    { label: "Compliance", path: "/compliance" },
    { label: "Why Choose Us", path: "/why-choose-us" },
    { label: "About", path: "/about" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <div className="quick-links block lg:hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center gap-3">
          {items.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Button
                key={item.path}
                asChild
                size="lg"
                className={`btn-accent ${isActive ? "btn-accent-active" : ""}`}
              >
                <Link to={item.path} aria-current={isActive ? "page" : undefined}>
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
