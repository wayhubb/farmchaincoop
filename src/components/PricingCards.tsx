"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

interface PricingOption {
  id: string;
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

interface PricingCardsProps {
  selectedOption: string;
  onSelectOption: (optionId: string) => void;
}

export default function PricingCards({ selectedOption, onSelectOption }: PricingCardsProps) {
  const options: PricingOption[] = [
    {
      id: "financing",
      title: "Zero-Interest Finance",
      price: "₦50,000",
      period: "per month for 12 months",
      description: "Own your cow from Day 1. No bank claims. Just a repayment schedule.",
      features: [
        "Cow is 100% yours from Day 1",
        "Minimum income: ₦180,000/month",
        "Total: ₦600,000 over 12 months",
        "NFT passport issued in your name",
        "70% profit share on sale"
      ],
      highlighted: true
    },
    {
      id: "outright",
      title: "Cash Purchase",
      price: "₦500,000",
      period: "one-time payment",
      description: "Pay upfront. Save ₦100,000. Immediate NFT minting.",
      features: [
        "One-time payment",
        "No income verification needed",
        "Instant NFT passport",
        "Save ₦100,000 vs financing",
        "70% profit share on sale"
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {options.map((option) => (
        <Card
          key={option.id}
          className={`p-6 cursor-pointer transition-all hover-elevate ${
            selectedOption === option.id
              ? "ring-2 ring-primary border-primary"
              : ""
          } ${option.highlighted ? "border-primary/30" : ""}`}
          onClick={() => onSelectOption(option.id)}
          data-testid={`card-pricing-${option.id}`}
        >
          {option.highlighted && (
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                Most Popular
              </span>
            </div>
          )}
          
          <h3 className="text-xl font-bold mb-2">{option.title}</h3>
          <div className="mb-4">
            <div className="text-3xl font-bold text-foreground">{option.price}</div>
            <div className="text-sm text-muted-foreground">{option.period}</div>
          </div>
          <p className="text-sm text-muted-foreground mb-6">{option.description}</p>
          
          <ul className="space-y-3 mb-6">
            {option.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            variant={selectedOption === option.id ? "default" : "outline"}
            className="w-full"
            data-testid={`button-select-${option.id}`}
          >
            {selectedOption === option.id ? "Selected" : "Select Option"}
          </Button>
        </Card>
      ))}
    </div>
  );
}
