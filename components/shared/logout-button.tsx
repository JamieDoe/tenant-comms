'use client';

import { logout } from '@/lib/auth/auth.service';

import { Button } from '@/components/ui/button';

export function LogoutButton() {
  function handleLogout() {
    logout();
  }

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
