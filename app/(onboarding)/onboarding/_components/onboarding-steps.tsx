'use client';

import { useOnboarding } from './onboarding-context';

const steps = [
  { label: 'Name your agency' },
  { label: 'Add a property' },
  { label: 'Invite a tenant' },
];

const headings = [
  "Let's set up your agency",
  'Looking good so far',
  'Almost there',
  'All done!',
];

const descriptions = [
  "Just a few details and you're ready to go.",
  'Add a property to get the most out of TenantComms.',
  "Invite a tenant and they'll get instant portal access.",
  'Your agency is set up and ready to go.',
];

export function OnboardingSteps() {
  const { step } = useOnboarding();

  return (
    <>
      {/* Progress dots */}
      <div className="mb-6 flex gap-1.5">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i < step
                ? 'bg-primary w-3'
                : i === step && step < steps.length
                  ? 'bg-primary w-7'
                  : 'w-7 bg-white/15'
            }`}
          />
        ))}
      </div>

      <h2 className="mb-2 text-2xl font-bold tracking-tight text-white xl:text-3xl">
        {headings[Math.min(step, headings.length - 1)]}
      </h2>
      <p className="mb-8 max-w-md text-sm text-white/70 xl:text-base">
        {descriptions[Math.min(step, descriptions.length - 1)]}
      </p>

      {/* Checklist */}
      <div className="flex flex-col gap-3">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            {i < step ? (
              <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-full">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6l3 3 5-5.5"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : i === step && step < steps.length ? (
              <div className="border-primary h-6 w-6 rounded-full border-2" />
            ) : (
              <div className="h-6 w-6 rounded-full border-[1.5px] border-white/20" />
            )}
            <span
              className={`text-sm ${
                i < step
                  ? 'text-white/50'
                  : i === step && step < steps.length
                    ? 'font-medium text-white'
                    : 'text-white/25'
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
