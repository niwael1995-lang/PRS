import { Card } from "@/components/ui/card";
import { ShieldCheck, FileText, Users, Globe, Award, Lock } from "lucide-react";

const Compliance = () => {
  const commitments = [
    {
      icon: ShieldCheck,
      title: "International Labor Standards",
      description: "Full compliance with ILO conventions and international best practices for fair recruitment.",
    },
    {
      icon: FileText,
      title: "Transparent Contracts",
      description: "Clear, written employment agreements in languages workers understand, with no hidden fees.",
    },
    {
      icon: Users,
      title: "Worker Protection",
      description: "Zero tolerance for forced labor, debt bondage, or retention of identity documents.",
    },
    {
      icon: Globe,
      title: "Global Certifications",
      description: "Accredited by international labor organizations and certified for ethical recruitment.",
    },
  ];

  const certifications = [
    "International Recruitment Integrity System (IRIS)",
    "Ethical Recruitment Excellence Framework",
    "ISO 9001:2015 Quality Management",
    "Fair Recruitment Initiative Participant",
  ];

  return (
    <section id="compliance" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-sm font-semibold text-primary">Ethics & Compliance</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Ethical Recruitment at Our Core
          </h2>
          <p className="text-lg text-muted-foreground">
            We uphold the highest standards of integrity, transparency, and worker protection in every placement.
          </p>
        </div>

        {/* Commitments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {commitments.map((commitment, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-medium transition-all border-border/50 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                <commitment.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{commitment.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{commitment.description}</p>
            </Card>
          ))}
        </div>

        {/* Certifications & Standards */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gradient-primary rounded-2xl p-8 text-primary-foreground">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-8 h-8 text-accent" />
              <h3 className="text-2xl font-bold">Certifications & Accreditations</h3>
            </div>
            <ul className="space-y-3">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/95">{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary/50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Our Commitment to Workers</h3>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                <strong className="text-foreground">No Recruitment Fees:</strong> Workers never pay for job placement. All recruitment costs are borne by employers.
              </p>
              <p className="leading-relaxed">
                <strong className="text-foreground">Right to Information:</strong> Complete transparency about job terms, working conditions, and rights before departure.
              </p>
              <p className="leading-relaxed">
                <strong className="text-foreground">Grievance Mechanisms:</strong> Accessible channels for workers to report concerns and seek redress without fear of retaliation.
              </p>
              <p className="leading-relaxed">
                <strong className="text-foreground">Continuous Monitoring:</strong> Regular workplace audits and worker welfare checks to ensure ongoing compliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Compliance;
