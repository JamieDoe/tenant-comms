'use client';

import { Tick01Icon, MultiplicationSignIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { cn } from '@/lib/utils/utils';

const rules = [
  { label: 'At least 8 characters', test: (v: string) => v.length >= 8 },
  { label: 'One lowercase letter', test: (v: string) => /[a-z]/.test(v) },
  { label: 'One uppercase letter', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'One number', test: (v: string) => /[0-9]/.test(v) },
  {
    label: 'One special character',
    test: (v: string) => /[^a-zA-Z0-9]/.test(v),
  },
];

export function PasswordValidator({
  password,
  isFocused,
}: {
  password: string;
  isFocused: boolean;
}) {
  if (!isFocused && password.length === 0) return null;

  const hasStartedTyping = password.length > 0;

  return (
    <ul className="mt-2 space-y-1.5">
      {rules.map((rule) => {
        const passed = rule.test(password);
        return (
          <li
            key={rule.label}
            className={cn(
              'flex items-center gap-2 text-xs transition-colors',
              !hasStartedTyping
                ? 'text-muted-foreground'
                : passed
                  ? 'text-green-500'
                  : 'text-muted-foreground'
            )}
          >
            {hasStartedTyping && passed ? (
              <HugeiconsIcon icon={Tick01Icon} className="size-3.5" />
            ) : (
              <HugeiconsIcon
                icon={MultiplicationSignIcon}
                className={cn(
                  'size-3.5',
                  hasStartedTyping ? 'text-red-500' : 'text-muted-foreground/50'
                )}
              />
            )}
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}
