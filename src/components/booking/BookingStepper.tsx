import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { StepNumber } from '../../types/booking.ts';

interface BookingStepperProps {
  currentStep: StepNumber;
  onStepClick?: (step: StepNumber) => void;
  onBack?: () => void;
  canGoBack?: boolean;
}

interface StepItem {
  number: StepNumber;
  title: string;
}

export const STEPS: StepItem[] = [
  { number: 1, title: 'Service' },
  { number: 2, title: 'Professional & Time' },
  { number: 3, title: 'Details' },
  { number: 4, title: 'Confirmation' },
];

export const BookingStepper: React.FC<BookingStepperProps> = ({
  currentStep,
  onStepClick,
  onBack,
  canGoBack = true,
}) => {
  return (
    <div className="w-full bg-[#121824]/80 backdrop-blur-md border-b border-slate-800/80 py-4 px-4 sm:px-8 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Back / Reset Action */}
        <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
          {canGoBack && currentStep > 1 && currentStep < 4 ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-[#E5B56A]" />
              <span>Back</span>
            </button>
          ) : currentStep === 4 ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#E5B56A] bg-[#E5B56A]/10 hover:bg-[#E5B56A]/20 border border-[#E5B56A]/30 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>New Booking</span>
            </button>
          ) : (
            <div className="text-xs font-medium text-slate-400">
              <span>Step 1 of 4</span>
            </div>
          )}
        </div>

        {/* Stepper Steps Component */}
        <nav aria-label="Booking Progress" className="w-full md:w-auto">
          <ol className="flex items-center justify-between sm:justify-center gap-2 sm:gap-6 md:gap-8">
            {STEPS.map((step, index) => {
              const isCompleted = currentStep > step.number;
              const isActive = currentStep === step.number;
              const isClickable = step.number < currentStep && onStepClick;

              return (
                <li key={step.number} className="flex items-center gap-2 sm:gap-4">
                  {/* Step Button / Badge */}
                  <button
                    type="button"
                    disabled={!isClickable}
                    onClick={() => isClickable && onStepClick(step.number)}
                    className={`flex items-center gap-2 sm:gap-2.5 transition-all text-left ${
                      isClickable ? 'cursor-pointer group' : 'cursor-default'
                    }`}
                  >
                    {/* Circle Indicator */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        isCompleted
                          ? 'bg-[#E5B56A] text-[#0B0E14] shadow-[0_0_12px_rgba(229,181,106,0.4)]'
                          : isActive
                            ? 'bg-[#E5B56A] text-[#0B0E14] ring-4 ring-[#E5B56A]/20 shadow-[0_0_15px_rgba(229,181,106,0.5)] scale-105'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <span>{step.number}</span>
                      )}
                    </div>

                    {/* Step Label (Hidden on small mobile for inactive steps) */}
                    <span
                      className={`text-xs font-medium transition-colors ${
                        isActive
                          ? 'text-[#E5B56A] font-semibold block'
                          : isCompleted
                            ? 'text-slate-200 group-hover:text-[#E5B56A] hidden sm:block'
                            : 'text-slate-400 hidden sm:block'
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>

                  {/* Connecting Line */}
                  {index < STEPS.length - 1 && (
                    <div
                      className={`w-6 sm:w-10 md:w-12 h-[2px] rounded-full transition-colors duration-300 ${
                        currentStep > step.number
                          ? 'bg-[#E5B56A]'
                          : 'bg-slate-800'
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Empty placeholder for balance on desktop */}
        <div className="hidden md:block w-24" />
      </div>
    </div>
  );
};
