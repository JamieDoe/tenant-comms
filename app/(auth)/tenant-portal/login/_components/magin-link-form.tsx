'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import { MagicLinkSchema } from '@/lib/schemas/auth.schema';
import { cn } from '@/lib/utils/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { loginWithMagicLink } from '@/lib/auth/auth.service';
import { showToast } from '@/lib/utils/toast';

type MagicLinkFormData = z.infer<typeof MagicLinkSchema>;

export function MagicLinkForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<MagicLinkFormData>({
    resolver: zodResolver(MagicLinkSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: MagicLinkFormData) => {
    setServerError(null);

    const formData = new FormData();
    formData.append('email', data.email);

    const result = await loginWithMagicLink(formData);

    if (!result.success) {
      setServerError(result.error);

      showToast.error(result.error, {
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

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className={cn('w-full py-6')}
        >
          {form.formState.isSubmitting
            ? 'Sending magic link...'
            : 'Send Magic Link'}
        </Button>
      </FieldGroup>
    </form>
  );
}
