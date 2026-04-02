'use client';

import { MicrosoftIcon } from '@/components/auth/shared/icons/microsoft-icon';
import { GoogleIcon } from '@/components/auth/shared/icons/google-icon';
import { oAuthLogin } from '@/lib/auth/auth.service';
import { Provider } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils/utils';

type OAuthButtonProps = {
  provider: Provider;
} & React.ComponentProps<typeof Button>;

const authProviderMap: Partial<
  Record<
    Provider,
    {
      name: string;
      icon: React.ReactNode;
      action: () => Promise<void>;
    }
  >
> = {
  google: {
    name: 'Google',
    icon: <GoogleIcon />,
    action: async () => await oAuthLogin('google'),
  },
  azure: {
    name: 'Microsoft',
    icon: <MicrosoftIcon />,
    action: async () => await oAuthLogin('azure'),
  },
};

export function OAuthButton({ provider, ...props }: OAuthButtonProps) {
  async function handleOAuthSignIn() {
    await authProviderMap[provider]?.action();
  }

  return (
    <Button
      onClick={handleOAuthSignIn}
      {...props}
      size="lg"
      variant="outline"
      className={cn('w-full py-6')}
    >
      {authProviderMap[provider]?.icon}
      Continue with {authProviderMap[provider]?.name}
    </Button>
  );
}
