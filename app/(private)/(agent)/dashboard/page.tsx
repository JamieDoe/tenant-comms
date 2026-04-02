import { LogoutButton } from '@/components/shared/logout-button';
import { ThemeToggle } from '@/components/shared/theme-toggle';

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <LogoutButton />

      <ThemeToggle />
    </div>
  );
}
