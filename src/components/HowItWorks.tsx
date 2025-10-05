"use client";
import { Card } from "@/components/ui/card";
import { FileText, CheckCircle, UserCheck, Award } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: "Check Eligibility",
      description: "2-minute eligibility gate. Choose finance (₦50k/mo) or cash purchase.",
    },
    {
      icon: UserCheck,
      title: "NFT Passport Minted",
      description: "Cow arrives at CFC. Data hashed on Binance Smart Chain. NFT issued in your name.",
    },
    {
      icon: CheckCircle,
      title: "Fattening & Tracking",
      description: "120-day feeding program. Daily logs, vet visits, GPS tracking—all recorded on-chain.",
    },
    {
      icon: Award,
      title: "Earn Premium",
      description: "Buyer scans QR, sees your data. Pays 8-12% premium. You get 70% profit share.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How FarmChain Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re the first cooperative in Africa to mint every living cow as a digital passport
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-semibold text-primary mb-2">Step {index + 1}</div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm italic text-muted-foreground">
            You didn&apos;t just raise a cow. You raised a digital asset with real-world cash value.
          </p>
        </div>
      </div>
    </section>
  );
}
