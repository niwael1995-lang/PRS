import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Clock, DollarSign, Shield, Award } from "lucide-react";

const WhyChooseUs = () => {
  const metrics = [
    {
      icon: TrendingUp,
      value: "95%",
      label: "Quality of Hire",
      description: "Candidates who meet or exceed performance expectations",
      color: "text-accent",
    },
    {
      icon: Users,
      value: "92%",
      label: "Retention Rate",
      description: "Workers who complete their full contract term",
      color: "text-primary",
    },
    {
      icon: Clock,
      value: "21 Days",
      label: "Average Time-to-Fill",
      description: "From job requisition to candidate deployment",
      color: "text-accent",
    },
    {
      icon: DollarSign,
      value: "30%",
      label: "Cost Efficiency",
      description: "Lower cost-per-hire vs. traditional recruitment",
      color: "text-primary",
    },
    {
      icon: Shield,
      value: "98%",
      label: "Compliance Rate",
      description: "Full adherence to international labor standards",
      color: "text-accent",
    },
    {
      icon: Award,
      value: "500+",
      label: "Employer Partners",
      description: "Trusted relationships across 25+ countries",
      color: "text-primary",
    },
  ];

  const advantages = [
    {
      title: "Proven Track Record",
      description: "Over a decade of successful placements with consistently high satisfaction rates from both employers and workers.",
    },
    {
      title: "Global Network",
      description: "Extensive recruitment channels across Asia, Africa, and Eastern Europe for diverse talent pools.",
    },
    {
      title: "Technology-Driven",
      description: "Advanced applicant tracking and candidate management systems ensure efficiency and transparency.",
    },
    {
      title: "Compliance Expertise",
      description: "In-depth knowledge of international labor laws, visa regulations, and ethical recruitment frameworks.",
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
            <span className="text-sm font-semibold text-accent-foreground">Why Choose Us</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Performance That Speaks for Itself
          </h2>
          <p className="text-lg text-muted-foreground">
            Data-driven results and proven excellence in international workforce recruitment.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-medium transition-all border-border/50 group"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <metric.icon className={`w-8 h-8 ${metric.color === 'text-accent' ? 'text-accent' : 'text-primary-foreground'}`} />
              </div>
              <div className={`text-4xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
              <div className="text-lg font-semibold text-foreground mb-2">{metric.label}</div>
              <p className="text-sm text-muted-foreground">{metric.description}</p>
            </Card>
          ))}
        </div>

        {/* Competitive Advantages */}
        <div className="bg-gradient-primary rounded-3xl p-8 lg:p-12 text-primary-foreground">
          <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-center">
            Our Competitive Advantages
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20"
              >
                <h4 className="text-xl font-semibold mb-3">{advantage.title}</h4>
                <p className="text-primary-foreground/90 leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
