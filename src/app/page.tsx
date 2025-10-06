"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ArlaStory from "@/components/ArlaStory";
import BlockchainExplainer from "@/components/BlockchainExplainer";
import HowItWorks from "@/components/HowItWorks";
import MarketDepth from "@/components/MarketDepth";
import BenefitsGrid from "@/components/BenefitsGrid";
import Footer from "@/components/Footer";

export default function Home() {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ArlaStory />
        <BlockchainExplainer />
        <HowItWorks />
        <MarketDepth />
        <BenefitsGrid />
        {currentUrl && (
          <div className="p-4">
            <p>You&apos;re viewing: {currentUrl}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
