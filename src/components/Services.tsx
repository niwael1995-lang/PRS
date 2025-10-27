import { Card } from "@/components/ui/card";
import { Search, FileCheck, GraduationCap, Plane, HeartHandshake, Building2 } from "lucide-react";
import servicesImage from "@/assets/services-recruitment.jpg";

const Services = () => {
  const processes = [
    {
      icon: Search,
      title: "Strategic Sourcing",
      description: "We identify and attract qualified candidates through targeted recruitment campaigns across multiple channels and regions.",
    },
    {
      icon: FileCheck,
      title: "Comprehensive Vetting",
      description: "Rigorous screening including skills assessment, background checks, health examinations, and document verification.",
    },
    {
      icon: GraduationCap,
      title: "Pre-Departure Orientation",
      description: "Cultural training, language basics, workplace expectations, and legal rights education for smooth integration.",
    },
    {
      icon: Plane,
      title: "Deployment Support",
      description: "End-to-end deployment assistance including visa processing, travel arrangements, and arrival coordination.",
    },
    {
      icon: HeartHandshake,
      title: "Post-Placement Care",
      description: "Ongoing support for both employers and workers to ensure satisfaction, retention, and continuous improvement.",
    },
  ];

  const industries = [
    { name: "Construction & Engineering", icon: Building2 },
    { name: "Healthcare & Elderly Care", icon: HeartHandshake },
    { name: "Hospitality & Tourism", icon: Building2 },
    { name: "Manufacturing & Logistics", icon: Building2 },
    { name: "Agriculture & Food Processing", icon: Building2 },
    { name: "IT & Technical Services", icon: Building2 },
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-sm font-semibold text-primary">Our Services</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            End-to-End Recruitment Solutions
          </h2>
          <p className="text-lg text-muted-foreground">
            From initial sourcing to post-deployment support, we manage every step of the recruitment lifecycle with precision and care.
          </p>
        </div>

        {/* Process Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {processes.map((process, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-medium transition-all group border-border/50"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <process.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{process.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{process.description}</p>
            </Card>
          ))}
        </div>

        {/* Industry Specialization */}
        <div className="bg-secondary/50 rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-4xl font-bold text-foreground mb-6">
                Industry Expertise
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                We specialize in recruiting for diverse sectors, understanding the unique requirements and compliance standards of each industry.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {industries.map((industry, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-background rounded-lg shadow-soft"
                  >
                    <industry.icon className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="font-medium text-foreground">{industry.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={servicesImage}
                alt="Professional recruitment services"
                className="rounded-2xl shadow-strong w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
