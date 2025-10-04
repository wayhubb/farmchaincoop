import { Card } from "@/components/ui/card";
import { Coins, CreditCard, Globe, GraduationCap, Building2, Smartphone } from "lucide-react";

export default function BenefitsGrid() {
  const benefits = [
    {
      icon: Coins,
      title: "Whole-Cow Ownership",
      description: "NFT issued in your name. Legal bill of sale.",
    },
    {
      icon: CreditCard,
      title: "Zero-Interest Finance",
      description: "Pay ₦50k/month for 12 months. Cow is 100% yours from Day 1.",
    },
    {
      icon: Globe,
      title: "Export Premium",
      description: "8–12% more from Gulf & EU buyers who trust blockchain proof.",
    },
    {
      icon: GraduationCap,
      title: "Free Ranch Masterclasses",
      description: "Vet training, feed science, NFT management — live and on-demand.",
    },
    {
      icon: Building2,
      title: "Gov't Contract Access",
      description: "Co-op status unlocks public procurement tenders.",
    },
    {
      icon: Smartphone,
      title: "Blockchain Passport",
      description: "Scan your cow's QR. Show the world. Earn clout.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Member Benefits</h2>
          <p className="text-lg text-muted-foreground">
            No fluff. Just value you can touch, scan, and sell.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="p-6 hover-elevate">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
