import { LayoutImageContainer } from '@/components/auth/shared/layout-container';
import { OnboardingSteps } from './onboarding/_components/onboarding-steps';
import { OnboardingProvider } from './onboarding/_components/onboarding-context';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingProvider>
      <main className="flex min-h-screen w-full">
        <LayoutImageContainer>
          <OnboardingSteps />
        </LayoutImageContainer>
        <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
          {children}
        </div>
      </main>
    </OnboardingProvider>
  );
}
