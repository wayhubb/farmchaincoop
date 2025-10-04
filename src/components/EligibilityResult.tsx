import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, XCircle, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

interface EligibilityResultProps {
  isEligible: boolean;
  purchaseOption?: 'financing' | 'outright';
  onStartApplication?: () => void;
}

export default function EligibilityResult({ isEligible, onStartApplication }: EligibilityResultProps) {
  return (
    <Card className="p-8 max-w-2xl mx-auto text-center">
      {isEligible ? (
        <>
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Congratulations!</h2>
            <p className="text-lg text-muted-foreground">
              You&apos;ve passed the eligibility test
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold mb-3">Next Steps:</h3>
            <ol className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-primary">1.</span>
                <span>Complete the full membership application form</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-primary">2.</span>
                <span>Provide employment and BVN details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-primary">3.</span>
                <span>Submit for admin review</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-primary">4.</span>
                <span>Receive approval notification within 48 hours</span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {onStartApplication ? (
              <Button onClick={onStartApplication} size="lg" data-testid="button-start-application">
                Start Full Application
              </Button>
            ) : (
              <Link href="/application">
                <Button size="lg" data-testid="button-start-application">
                  Start Full Application
                </Button>
              </Link>
            )}
            <Link href="/">
              <Button variant="outline" size="lg" data-testid="button-back-home">
                Back to Home
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Almost There!</h2>
            <p className="text-lg text-muted-foreground">
              Your income doesn&apos;t quite meet the ₦180,000/month requirement for zero-interest financing
            </p>
          </div>

          <div className="bg-muted/50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold mb-3">Why?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The financing option requires a minimum monthly income of ₦180,000 to ensure you can comfortably make the ₦50,000 monthly payments.
            </p>
            <h3 className="font-semibold mb-3">What can you do?</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Consider the outright purchase option (₦500,000 one-time payment)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Contact our support team for alternative options</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Reapply when your income increases</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="font-semibold">We Can Still Help</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/2349088901234" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-primary">
                <Phone className="w-4 h-4" />
                <span>WhatsApp +234 908 890 1234</span>
              </a>
              <a href="mailto:ready@farmchain.ng" className="flex items-center gap-2 text-sm font-medium text-primary">
                <Mail className="w-4 h-4" />
                <span>ready@farmchain.ng</span>
              </a>
            </div>
            <p className="text-xs text-muted-foreground">We reply within 4 hours</p>
          </div>

          <Link href="/">
            <Button variant="outline" size="lg" data-testid="button-back-home">
              Back to Home
            </Button>
          </Link>
        </>
      )}
    </Card>
  );
}
