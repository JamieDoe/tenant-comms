import { toast } from 'sonner';

const styles = {
  success: {
    '--normal-bg':
      'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
    '--normal-text':
      'light-dark(var(--color-green-600), var(--color-green-400))',
    '--normal-border':
      'light-dark(var(--color-green-600), var(--color-green-400))',
    '--normal-description':
      'light-dark(var(--color-green-600), var(--color-green-400))',
  } as React.CSSProperties,

  error: {
    '--normal-bg':
      'color-mix(in oklab, var(--destructive) 10%, var(--background))',
    '--normal-text': 'var(--destructive)',
    '--normal-border': 'var(--destructive)',
    '--normal-description': 'var(--destructive)',
  } as React.CSSProperties,

  warning: {
    '--normal-bg':
      'color-mix(in oklab, light-dark(var(--color-amber-600), var(--color-amber-400)) 10%, var(--background))',
    '--normal-text':
      'light-dark(var(--color-amber-600), var(--color-amber-400))',
    '--normal-border':
      'light-dark(var(--color-amber-600), var(--color-amber-400))',
    '--normal-description':
      'light-dark(var(--color-amber-600), var(--color-amber-400))',
  } as React.CSSProperties,

  info: {
    '--normal-bg':
      'color-mix(in oklab, light-dark(var(--color-sky-600), var(--color-sky-400)) 10%, var(--background))',
    '--normal-text':
      'light-dark(var(--color-sky-600), var(--color-sky-400))',
    '--normal-border':
      'light-dark(var(--color-sky-600), var(--color-sky-400))',
    '--normal-description':
      'light-dark(var(--color-sky-600), var(--color-sky-400))',
  } as React.CSSProperties,
};

type ToastOptions = {
  description?: string;
  duration?: number;
};

export const showToast = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, { style: styles.success, ...options }),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, { style: styles.error, ...options }),

  warning: (message: string, options?: ToastOptions) =>
    toast.warning(message, { style: styles.warning, ...options }),

  info: (message: string, options?: ToastOptions) =>
    toast.info(message, { style: styles.info, ...options }),

  loading: (message: string, options?: ToastOptions) =>
    toast.loading(message, { ...options }),

  dismiss: (id?: string | number) => toast.dismiss(id),

  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) =>
    toast.promise(promise, {
      loading: messages.loading,
      success: () => {
        return { message: messages.success, style: styles.success };
      },
      error: () => {
        return { message: messages.error, style: styles.error };
      },
    }),
};