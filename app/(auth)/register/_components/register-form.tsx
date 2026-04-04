'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { AnimatePresence, motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { useState } from 'react';
import { z } from 'zod';

import { RegisterSchema } from '@/lib/schemas/auth.schema';
import { registerWithEmail } from '@/lib/auth/auth.service';
import { cn } from '@/lib/utils/utils';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { PasswordValidator } from '@/components/auth/shared/password-validator';
import { showToast } from '@/lib/utils/toast';

type RegisterFormData = z.infer<typeof RegisterSchema>;

export function RegisterForm() {
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);

    const result = await registerWithEmail(formData);

    if (!result.success) {
      setServerError(result.error);

      showToast.error(result.error, {
        description: 'Please try again.',
      });
      return;
    }

    setRegistered(true);

    const duration = 2000;
    let end: number;

    const frame = () => {
      if (end === undefined) {
        end = Date.now() + duration;
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#c4a44a', '#d4b95c', '#e0cc7a', '#f0e4a8'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#c4a44a', '#d4b95c', '#e0cc7a', '#f0e4a8'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  return (
    <div className="relative -m-1 w-[calc(100%+0.5rem)] overflow-hidden p-1">
      <AnimatePresence mode="wait">
        {registered ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-6 py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="bg-primary/15 flex h-20 w-20 items-center justify-center rounded-full"
            >
              <svg
                className="text-primary h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                />
              </svg>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="mb-2 text-2xl font-semibold">You&apos;re in!</h2>
              <p className="text-muted-foreground">
                Check your email for a confirmation link to activate your
                account.
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="mx-auto w-full"
            onSubmit={form.handleSubmit(onSubmit)}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <FieldGroup>
              {serverError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-destructive/10 text-destructive rounded-md px-4 py-3 text-sm"
                >
                  {serverError}
                </motion.div>
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
                      placeholder="Let's start with your email"
                      autoComplete="email"
                      className="py-6"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                      placeholder="Create a password"
                      autoComplete="new-password"
                      className="py-6"
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                    />
                    <PasswordValidator
                      password={field.value}
                      isFocused={passwordFocused}
                    />
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      className="py-6"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
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
                  ? 'Creating account...'
                  : 'Create Account'}
              </Button>
            </FieldGroup>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
