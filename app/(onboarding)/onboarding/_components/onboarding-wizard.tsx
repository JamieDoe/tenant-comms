'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import confetti from 'canvas-confetti';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils/utils';
import { useOnboarding } from './onboarding-context';
import { showToast } from '@/lib/utils/toast';

import { createFirstProperty } from '@/lib/services/agents/properties.service';
import { createFirstTenant } from '@/lib/services/agents/tenants.service';
import { createAgency } from '@/lib/services/agents/agents.service';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

function ErrorBanner({ error }: { error: string | null }) {
  if (!error) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="bg-destructive/10 text-destructive border-destructive rounded-4xl border px-4 py-4 text-sm font-medium"
    >
      {error}
    </motion.div>
  );
}

export function OnboardingWizard() {
  const { step, setStep } = useOnboarding();
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [agencyId, setAgencyId] = useState<string | null>(null);
  const [propertyId, setPropertyId] = useState<string | null>(null);

  const [agencyName, setAgencyName] = useState('');
  const [agencyEmail, setAgencyEmail] = useState('');
  const [agencyPhone, setAgencyPhone] = useState('');

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [propertyType, setPropertyType] = useState('house');
  const [bedrooms, setBedrooms] = useState('2');

  const [tenantName, setTenantName] = useState('');
  const [tenantEmail, setTenantEmail] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');

  function goTo(next: number) {
    setServerError(null);
    setDirection(next > step ? 1 : -1);
    setStep(next);
  }

  async function handleCreateAgency() {
    setServerError(null);
    setSubmitting(true);

    try {
      const result = await createAgency({
        name: agencyName,
        email: agencyEmail || null,
        phone: agencyPhone || null,
      });
      if (!result.success) {
        setServerError(result.error);
        showToast.error(result.error);
        return;
      }
      setAgencyId(result.data.id);
      goTo(1);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCreateProperty() {
    if (!agencyId) return;
    setServerError(null);
    setSubmitting(true);

    const result = await createFirstProperty({
      agencyId,
      addressLine1: address,
      city,
      postcode,
      propertyType,
      bedrooms: parseInt(bedrooms),
    });
    setSubmitting(false);

    if (!result.success) {
      setServerError(result.error);
      showToast.error(result.error);
      return;
    }

    setPropertyId(result.data.id);
    goTo(2);
  }

  async function handleCreateTenant() {
    if (!agencyId) return;
    setServerError(null);
    setSubmitting(true);

    const result = await createFirstTenant({
      agencyId,
      fullName: tenantName,
      email: tenantEmail,
      phone: tenantPhone || undefined,
      propertyId: propertyId || undefined,
    });
    setSubmitting(false);

    if (!result.success) {
      setServerError(result.error);
      showToast.error(result.error);
      return;
    }

    fireConfetti();
    goTo(3);
  }

  function fireConfetti() {
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
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
  }

  return (
    <div className="relative w-full max-w-md">
      <AnimatePresence mode="wait" custom={direction}>
        {step === 0 && (
          <motion.div
            key="step-0"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative -m-1 p-1"
          >
            <p className="text-muted-foreground mb-4 text-xs tracking-widest">
              STEP 1 OF 3
            </p>
            <h1 className="mb-1 text-2xl font-semibold">
              What&apos;s your agency called?
            </h1>
            <p className="text-muted-foreground mb-8 text-sm">
              This is how tenants will see you.
            </p>

            <FieldGroup>
              <ErrorBanner error={serverError} />

              <Field>
                <FieldLabel>Agency name</FieldLabel>
                <Input
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  placeholder="e.g. Southcoast Lettings"
                  className="py-6"
                  autoFocus
                />
              </Field>
              <Field>
                <FieldLabel>
                  Agency email{' '}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </FieldLabel>
                <Input
                  value={agencyEmail}
                  onChange={(e) => setAgencyEmail(e.target.value)}
                  type="email"
                  placeholder="info@agency.com"
                  className="py-6"
                />
              </Field>
              <Field>
                <FieldLabel>
                  Phone{' '}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </FieldLabel>
                <Input
                  value={agencyPhone}
                  onChange={(e) => setAgencyPhone(e.target.value)}
                  type="tel"
                  placeholder="01234 567890"
                  className="py-6"
                />
              </Field>

              <Button
                onClick={handleCreateAgency}
                disabled={agencyName.trim().length < 2 || submitting}
                size="lg"
                className={cn('w-full py-6')}
              >
                {submitting ? 'Creating...' : 'Continue'}
              </Button>
            </FieldGroup>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative -m-1 p-1"
          >
            <p className="text-muted-foreground mb-4 text-xs tracking-widest">
              STEP 2 OF 3
            </p>
            <h1 className="mb-1 text-2xl font-semibold">
              Add your first property
            </h1>
            <p className="text-muted-foreground mb-8 text-sm">
              You can always add more from the dashboard.
            </p>

            <FieldGroup>
              <ErrorBanner error={serverError} />

              <Field>
                <FieldLabel>Address</FieldLabel>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 High Street"
                  className="py-6"
                  autoFocus
                />
              </Field>

              <div className="flex gap-3">
                <Field className="flex-1">
                  <FieldLabel>City</FieldLabel>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Southampton"
                    className="py-6"
                  />
                </Field>
                <Field className="flex-1">
                  <FieldLabel>Postcode</FieldLabel>
                  <Input
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="SO31 4AA"
                    className="py-6"
                  />
                </Field>
              </div>

              <div className="flex gap-3">
                <Field className="flex-1">
                  <FieldLabel>Type</FieldLabel>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="border-input bg-background w-full rounded-md border px-3 py-3.5 text-sm"
                  >
                    <option value="house">House</option>
                    <option value="flat">Flat</option>
                    <option value="hmo">HMO</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </Field>
                <Field className="flex-1">
                  <FieldLabel>Bedrooms</FieldLabel>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="border-input bg-background w-full rounded-md border px-3 py-3.5 text-sm"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                </Field>
              </div>

              <Button
                onClick={handleCreateProperty}
                disabled={
                  !address.trim() ||
                  !city.trim() ||
                  !postcode.trim() ||
                  submitting
                }
                size="lg"
                className={cn('w-full py-6')}
              >
                {submitting ? 'Adding...' : 'Continue'}
              </Button>
            </FieldGroup>

            <button
              onClick={() => goTo(2)}
              className="text-muted-foreground hover:text-foreground mt-3 w-full text-center text-sm transition-colors"
            >
              I&apos;ll do this later
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative -m-1 p-1"
          >
            <p className="text-muted-foreground mb-4 text-xs tracking-widest">
              STEP 3 OF 3
            </p>
            <h1 className="mb-1 text-2xl font-semibold">
              Invite your first tenant
            </h1>
            <p className="text-muted-foreground mb-8 text-sm">
              They&apos;ll get a magic link to access their portal.
            </p>

            <FieldGroup>
              <ErrorBanner error={serverError} />

              <Field>
                <FieldLabel>Full name</FieldLabel>
                <Input
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  placeholder="Sarah Johnson"
                  className="py-6"
                  autoFocus
                />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  value={tenantEmail}
                  onChange={(e) => setTenantEmail(e.target.value)}
                  type="email"
                  placeholder="tenant@email.com"
                  className="py-6"
                />
              </Field>
              <Field>
                <FieldLabel>
                  Phone{' '}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </FieldLabel>
                <Input
                  value={tenantPhone}
                  onChange={(e) => setTenantPhone(e.target.value)}
                  type="tel"
                  placeholder="07700 900000"
                  className="py-6"
                />
              </Field>

              <Button
                onClick={handleCreateTenant}
                disabled={
                  !tenantName.trim() || !tenantEmail.trim() || submitting
                }
                size="lg"
                className={cn('w-full py-6')}
              >
                {submitting ? 'Inviting...' : 'Go to dashboard'}
              </Button>
            </FieldGroup>

            <button
              onClick={() => {
                fireConfetti();
                goTo(3);
              }}
              className="text-muted-foreground hover:text-foreground mt-3 w-full text-center text-sm transition-colors"
            >
              I&apos;ll do this later
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="complete"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative -m-1 flex w-full flex-col items-center p-1 text-center"
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
              className="bg-primary/15 mb-6 flex h-20 w-20 items-center justify-center rounded-full"
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
              <h1 className="mb-2 text-2xl font-semibold">
                You&apos;re all set
              </h1>
              <p className="text-muted-foreground mb-8 text-sm">
                Your agency is ready. Let&apos;s get to work.
              </p>
            </motion.div>

            <Button
              onClick={() => (window.location.href = '/dashboard')}
              size="lg"
              className={cn('w-full max-w-xs py-6')}
            >
              Open dashboard
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
