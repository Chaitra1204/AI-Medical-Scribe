"use client";

import { Check } from "lucide-react";
import clsx from "clsx";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        {steps.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isFuture = stepNum > currentStep;

          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              {/* Step circle + label */}
              <div className="flex flex-col items-center">
                <div
                  className={clsx(
                    "flex items-center justify-center h-9 w-9 rounded-full text-sm font-bold transition-all shrink-0",
                    isCompleted && "bg-accent text-white",
                    isCurrent && "bg-primary text-white ring-4 ring-primary/20",
                    isFuture && "bg-gray-200 text-gray-500"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    stepNum
                  )}
                </div>
                <span
                  className={clsx(
                    "mt-2 text-xs sm:text-sm whitespace-nowrap transition-colors",
                    isCompleted && "text-accent font-medium",
                    isCurrent && "text-primary font-bold",
                    isFuture && "text-gray-400"
                  )}
                >
                  {label}
                </span>
              </div>

              {/* Connector line (not after last step) */}
              {i < steps.length - 1 && (
                <div
                  className={clsx(
                    "flex-1 h-0.5 mx-2 sm:mx-4 mt-[-1.25rem] transition-colors",
                    stepNum < currentStep ? "bg-accent" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
