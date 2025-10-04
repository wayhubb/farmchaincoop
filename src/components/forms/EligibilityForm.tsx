"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgressIndicator from "@/components/ProgressIndicator";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import PricingCards from "@/components/PricingCards";
import EligibilityTestForm from "@/components/EligibilityTestForm";
import EligibilityResult from "@/components/EligibilityResult";
import { useLocation } from "wouter";

export default function Eligibility() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [leadData, setLeadData] = useState<Record<string, unknown> | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("financing");
  const [eligibilityResult, setEligibilityResult] = useState<Record<string, unknown> | null>(null);

  const steps = [
    { number: 1, title: "Lead Capture", description: "Your info" },
    { number: 2, title: "Purchase Option", description: "Choose plan" },
    { number: 3, title: "Eligibility Test", description: "Income check" },
    { number: 4, title: "Result", description: "Outcome" },
  ];

  const handleLeadCapture = (data: any) => {
  console.log("Lead captured:", data);
  setLeadData(data as Record<string, unknown>);
  setStep(2);
  };

  const handleOptionSelected = () => {
    console.log("Option selected:", selectedOption);
    setStep(3);
  };

  const handleEligibilityTest = async (data: any) => {
    console.log("Eligibility test result:", data);
    // Combine leadData and eligibility test data
    const formData = {
      ...(leadData ?? {}),
      monthlyIncome: (data as Record<string, unknown>).monthlyIncome,
      option: selectedOption,
    };
    try {
      const response = await fetch("/api/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setEligibilityResult({ ...(data as Record<string, unknown>), ...result });
      setStep(4);
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setEligibilityResult({ isEligible: false, error: errorMessage });
      setStep(4);
    }
  };

  const handleStartApplication = () => {
    setLocation("/application");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <ProgressIndicator currentStep={step} steps={steps} />

          <div className="mt-8">
            {step === 1 && <LeadCaptureForm onSubmit={handleLeadCapture} />}

            {step === 2 && (
              <div>
                <div className="max-w-4xl mx-auto mb-8 text-center">
                  <h2 className="text-3xl font-bold mb-2">
                    Choose Your Payment Option
                  </h2>
                  <p className="text-muted-foreground">
                    Select the payment method that works best for you
                  </p>
                </div>
                <PricingCards
                  selectedOption={selectedOption}
                  onSelectOption={setSelectedOption}
                />
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleOptionSelected}
                    className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover-elevate active-elevate-2"
                    data-testid="button-continue-to-test"
                  >
                    Continue to Eligibility Test
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <EligibilityTestForm
                purchaseOption={selectedOption}
                onSubmit={handleEligibilityTest}
              />
            )}

            {step === 4 && eligibilityResult && (
              <EligibilityResult
                isEligible={Boolean(eligibilityResult?.isEligible)}
                purchaseOption={selectedOption}
                onStartApplication={handleStartApplication}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
