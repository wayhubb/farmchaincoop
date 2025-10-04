import { Link } from "wouter";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-background py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
            Arla Started with 12 Farmers.<br />
            We&apos;re Starting with Cattle—and Blockchain.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join the member-run Common Facility Centre that fattens, traces and sells your whole cattle under one trusted brand—so you keep the profits, not middle-men.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/eligibility">
              <Button size="lg" className="gap-2" data-testid="button-cta-eligibility">
                See if I Qualify
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#profit-simulator">
              <Button size="lg" variant="outline" data-testid="button-learn-more">
                I'll Pay Cash
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="flex items-start gap-3 text-left">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">40% Export Premium</h3>
                <p className="text-sm text-muted-foreground">Dubai shelves pay more for blockchain-traced beef</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-left">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">NFT Passport</h3>
                <p className="text-sm text-muted-foreground">Every cow gets a digital passport you own</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-left">
              <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">120-Day Turnaround</h3>
                <p className="text-sm text-muted-foreground">From weaner to cash—90% faster than pastoral treks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
