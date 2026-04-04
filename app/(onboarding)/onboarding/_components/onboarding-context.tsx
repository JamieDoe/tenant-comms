'use client';

import { createContext, useContext, useState } from 'react';

interface OnboardingContextType {
  step: number;
  setStep: (step: number) => void;
}

const OnboardingContext = createContext<OnboardingContextType>({
  step: 0,
  setStep: () => {},
});

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = useState(0);

  return (
    <OnboardingContext.Provider value={{ step, setStep }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  return useContext(OnboardingContext);
}
