import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
  description?: string;
}

interface ProgressIndicatorProps {
  currentStep: number;
  steps: Step[];
}

export default function ProgressIndicator({ currentStep, steps }: ProgressIndicatorProps) {
  return (
    <div className="w-full py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;

            return (
              <div key={step.number} className="flex flex-col items-center flex-1 relative">
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 h-0.5 w-full ${
                      isCompleted ? "bg-primary" : "bg-border"
                    }`}
                    style={{ zIndex: 0 }}
                  />
                )}
                
                <div
                  className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold text-sm ${
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isCurrent
                      ? "bg-background border-primary text-primary"
                      : "bg-background border-border text-muted-foreground"
                  }`}
                  data-testid={`progress-step-${step.number}`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.number}
                </div>
                
                <div className="mt-2 text-center">
                  <div
                    className={`text-sm font-medium ${
                      isCurrent ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
