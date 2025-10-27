import { Card } from "@/components/ui/card";
import { Target, Eye, Heart, CheckCircle2 } from "lucide-react";
import aboutImage from "@/assets/about-partnership.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Ethical Recruitment",
      description: "Zero tolerance for exploitation. Every placement upholds worker rights and dignity.",
    },
    {
      icon: CheckCircle2,
      title: "Quality Assurance",
      description: "Rigorous vetting processes ensure only qualified candidates reach your workforce.",
    },
    {
      icon: Target,
      title: "Long-term Partnerships",
      description: "We build lasting relationships with employers and workers for sustained success.",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img
                src={aboutImage}
                alt="Global partnership and workforce collaboration"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-accent/10 rounded-full blur-3xl -z-10" />
          </div>

          {/* Content Side */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
              <span className="text-sm font-semibold text-accent-foreground">About Us</span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Building Bridges Between Talent and Opportunity
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We are a leading international workforce solutions provider, committed to connecting qualified workers with reputable overseas employers. Our mission is to facilitate seamless, ethical, and compliant recruitment that benefits both employers and workers.
            </p>

            {/* Mission & Vision */}
            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To deliver world-class recruitment services that prioritize transparency, worker protection, and operational excellence.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be the most trusted global recruitment partner, setting industry standards for ethical practices and quality placements.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="grid sm:grid-cols-3 gap-4">
              {values.map((value, index) => (
                <Card key={index} className="p-5 border-border/50 hover:shadow-medium transition-shadow">
                  <value.icon className="w-8 h-8 text-accent mb-3" />
                  <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
