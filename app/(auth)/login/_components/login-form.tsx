'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { z } from 'zod';

import { LoginSchema } from '@/lib/schemas/auth.schema';
import { cn } from '@/lib/utils/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { loginWithEmail } from '@/lib/auth/auth.service';

type LoginFormData = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    const result = await loginWithEmail(formData);

    if (!result.success) {
      setServerError(result.error);

      toast.error(result.error, {
        description: 'Please try again.',
      });
      return;
    }
  };

  return (
    <form className="mx-auto w-full" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {serverError && (
          <div className="bg-destructive/10 text-destructive rounded-md px-4 py-3 text-sm">
            {serverError}
          </div>
        )}

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Your Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="Please enter your email"
                autoComplete="email"
                className="py-6"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="py-6"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <Link
                href="/forgot-password"
                className="text-primary w-full text-sm hover:underline"
              >
                Forgot your password?
              </Link>
            </Field>
          )}
        />

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className={cn('w-full py-6')}
        >
          {form.formState.isSubmitting ? 'Logging in...' : 'Log In'}
        </Button>
      </FieldGroup>
    </form>
  );
}
