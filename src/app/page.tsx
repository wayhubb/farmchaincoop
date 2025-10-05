"use client";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ArlaStory from "@/components/ArlaStory";
import BlockchainExplainer from "@/components/BlockchainExplainer";
import HowItWorks from "@/components/HowItWorks";
import MarketDepth from "@/components/MarketDepth";
import BenefitsGrid from "@/components/BenefitsGrid";
import Footer from "@/components/Footer";

export default function Home() {
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
      </main>
      <Footer />
    </div>
  );
}
