'use client';

import clsx from 'clsx';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen bg-background text-foreground">
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="relative max-w-lg w-full rounded-3xl border border-foreground/10 bg-background/80 px-6 py-8 shadow-xl backdrop-blur">
            <div className="absolute -left-6 -top-6 h-12 w-12 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold">!</span>
            </div>
            <h1 className="mb-4 text-2xl font-bold text-foreground">
              Something went wrong
            </h1>
            <p className="mb-6 text-sm text-foreground/80">
              An unexpected error occurred while rendering this page. You can
              try again or return later.
            </p>
            {error?.message && (
              <pre
                className="mb-6 max-h-40 overflow-auto rounded-xl bg-foreground/5 p-3 text-xs text-foreground/80"
                aria-label="Error message"
              >
                {error.message}
              </pre>
            )}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => reset()}
                className={clsx(
                  'rounded-full px-6 py-3 text-sm font-semibold',
                  'bg-foreground text-background',
                  'hover:bg-hovered active:bg-active',
                  'transition-colors'
                )}
              >
                Try again
              </button>
              <button
                type="button"
                onClick={() => (window.location.href = '/')}
                className={clsx(
                  'rounded-full px-6 py-3 text-sm font-semibold border',
                  'border-foreground/40 text-foreground',
                  'hover:border-hovered hover:text-hovered active:border-active active:text-active',
                  'transition-colors'
                )}
              >
                Go home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
