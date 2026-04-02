import Link from 'next/link';
import { OAuthButton } from '@/components/auth/shared/oauth-button';
import { LoginForm } from '@/app/(auth)/login/_components/login-form';
import { FormAlert } from '@/components/auth/shared/form-alert';
import { PageContainer } from '@/components/auth/shared/page-container';

export default function LoginPage() {
  return (
    <PageContainer
      title="Welcome back! 👋"
      description="Log in to your account to get started!"
    >
      <div className="flex w-full flex-col items-center gap-6">
        <FormAlert />
        <LoginForm />

        <div className="relative flex w-full items-center gap-4">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <OAuthButton provider="google" />
        <OAuthButton provider="azure" />

        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </PageContainer>
  );
}
