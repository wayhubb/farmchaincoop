"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const eligibilitySchema = z.object({
  purchaseOption: z.enum(["financing", "outright"]),
  monthlyIncome: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Monthly income must be a valid number",
  }),
});

type EligibilityFormData = z.infer<typeof eligibilitySchema>;

interface EligibilityTestFormProps {
  purchaseOption: string;
  onSubmit: (data: EligibilityFormData & { isEligible: boolean }) => void;
}

export default function EligibilityTestForm({ purchaseOption, onSubmit }: EligibilityTestFormProps) {
  const form = useForm<EligibilityFormData>({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      purchaseOption: purchaseOption as "financing" | "outright",
      monthlyIncome: "",
    },
  });

  const handleSubmit = (data: EligibilityFormData) => {
    const income = Number(data.monthlyIncome);
    const isEligible = data.purchaseOption === "outright" || income >= 180000;
    onSubmit({ ...data, isEligible });
  };

  const monthlyIncome = form.watch("monthlyIncome");
  const income = Number(monthlyIncome) || 0;
  const showWarning = purchaseOption === "financing" && income > 0 && income < 180000;
  const showSuccess = purchaseOption === "financing" && income >= 180000;

  return (
    <Card className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Check if You Can Claim a 2026 Tax-Rebate Cow</h2>
        <p className="text-muted-foreground">
          {purchaseOption === "financing"
            ? "Minimum ₦1.5M annual income (₦180k/month average) required for zero-interest financing"
            : "No income requirement for cash purchase"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="monthlyIncome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Income (₦) *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="180000"
                    {...field}
                    data-testid="input-monthly-income"
                  />
                </FormControl>
                <FormDescription>
                  {purchaseOption === "financing"
                    ? "Minimum ₦180,000 monthly income required for financing option"
                    : "For verification purposes only"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {showWarning && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your income (₦{income.toLocaleString()}) is below the minimum requirement of ₦180,000 for the financing option. Consider the outright purchase option instead.
              </AlertDescription>
            </Alert>
          )}

          {showSuccess && (
            <Alert className="border-primary/50 bg-primary/5">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                Great! Your income meets the minimum requirement for the financing option.
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" data-testid="button-submit-eligibility">
            Check Eligibility
          </Button>
        </form>
      </Form>
    </Card>
  );
}
