import Link from 'next/link';
import { OAuthButton } from '@/components/auth/shared/oauth-button';
import { RegisterForm } from '@/app/(auth)/register/_components/register-form';
import { PageContainer } from '@/components/auth/shared/page-container';

export default function RegisterPage() {
  return (
    <PageContainer
      title="Welcome to Tenant Comms"
      description="Create an account to get started!"
    >
      <div className="flex w-full flex-col items-center gap-6">
        <RegisterForm />
        <div className="relative flex w-full items-center gap-4">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>
        <OAuthButton provider="google" />
        <OAuthButton provider="azure" />
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </PageContainer>
  );
}
