"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">FarmChain</h3>
            <p className="text-sm text-muted-foreground">
              Africa&apos;s first blockchain cattle cooperative. We mint every cow as an NFT, unlock export premiums, and put profits in farmers&apos; hands—not middlemen&apos;s.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <a href="/eligibility" className="text-muted-foreground hover:text-foreground">
                  Check Eligibility
                </a>
              </li>
              <li>
                <a href="/application" className="text-muted-foreground hover:text-foreground">
                  Apply Now
                </a>
              </li>
              <li>
                <a href="/admin" className="text-muted-foreground hover:text-foreground">
                  Admin Portal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5" />
                <span>+234 908 890 1234 (WhatsApp)</span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5" />
                <span>hello@farmchain.ng</span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Wudil CFC, Kano | Abuja Office</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                We reply to every email within 4 hours.
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p className="mb-2">&copy; {new Date().getFullYear()} FarmChain Multipurpose Cooperative Society Ltd. All rights reserved.</p>
          <p className="text-xs">FarmChain is not an investment company. All transactions are purchases of live cattle and cooperative services.</p>
        </div>
      </div>
    </footer>
  );
}
