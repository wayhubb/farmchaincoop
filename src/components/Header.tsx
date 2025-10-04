"use client";

import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate rounded-lg px-3 py-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">FC</span>
              </div>
              <span className="font-bold text-lg">FarmChain</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" data-testid="button-nav-home">
                Home
              </Button>
            </Link>
            <Link href="/eligibility">
              <Button variant="ghost" data-testid="button-nav-eligibility">
                Check Eligibility
              </Button>
            </Link>
            <Link href="/application">
              <Button variant="ghost" data-testid="button-nav-application">
                Apply
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" data-testid="button-nav-admin">
                Admin Login
              </Button>
            </Link>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col gap-2 border-t">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start" data-testid="button-mobile-home">
                Home
              </Button>
            </Link>
            <Link href="/eligibility">
              <Button variant="ghost" className="w-full justify-start" data-testid="button-mobile-eligibility">
                Check Eligibility
              </Button>
            </Link>
            <Link href="/application">
              <Button variant="ghost" className="w-full justify-start" data-testid="button-mobile-application">
                Apply
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" className="w-full justify-start" data-testid="button-mobile-admin">
                Admin Login
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
