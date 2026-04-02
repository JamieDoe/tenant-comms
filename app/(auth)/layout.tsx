import { AuthLayoutImageContainer } from '@/components/auth/shared/layout-container';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full">
      <AuthLayoutImageContainer />
      <div className="w-full p-8 lg:w-1/2">{children}</div>
    </main>
  );
}
