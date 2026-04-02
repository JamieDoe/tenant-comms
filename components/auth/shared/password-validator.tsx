'use client';

import { AnimatePresence, motion } from 'motion/react';
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
  const isVisible = isFocused || password.length > 0;
  const hasStartedTyping = password.length > 0;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="mt-2 space-y-1.5">
            {rules.map((rule, index) => {
              const passed = rule.test(password);
              return (
                <motion.li
                  key={rule.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 15,
                    delay: index * 0.05,
                  }}
                  className={cn(
                    'flex items-center gap-2 text-xs transition-colors',
                    !hasStartedTyping
                      ? 'text-muted-foreground'
                      : passed
                        ? 'text-green-500'
                        : 'text-muted-foreground'
                  )}
                >
                  <AnimatePresence mode="wait">
                    {hasStartedTyping && passed ? (
                      <motion.span
                        key="tick"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, transition: { duration: 0.08 } }}
                        transition={{
                          type: 'spring',
                          stiffness: 800,
                          damping: 15,
                        }}
                      >
                        <HugeiconsIcon icon={Tick01Icon} className="size-3.5" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="cross"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0, transition: { duration: 0.08 } }}
                        transition={{
                          type: 'spring',
                          stiffness: 800,
                          damping: 15,
                        }}
                      >
                        <HugeiconsIcon
                          icon={MultiplicationSignIcon}
                          className={cn(
                            'size-3.5',
                            hasStartedTyping
                              ? 'text-red-500'
                              : 'text-muted-foreground/50'
                          )}
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {rule.label}
                </motion.li>
              );
            })}
          </div>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
