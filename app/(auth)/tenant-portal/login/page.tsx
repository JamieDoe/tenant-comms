import Link from 'next/link';
import { PageContainer } from '@/components/auth/shared/page-container';
import { MagicLinkForm } from './_components/magic-link-form';

export default function RegisterPage() {
  return (
    <PageContainer
      title="Login to your tenant portal"
      description="Log in to your tenant portal to manage your account and settings!"
    >
      <div className="flex w-full flex-col items-center gap-6">
        <MagicLinkForm />

        <p className="text-center text-sm text-gray-500">
          Having issues logging in?{' '}
          <Link
            href="/login"
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            Contact support
          </Link>
        </p>
      </div>
    </PageContainer>
  );
}
