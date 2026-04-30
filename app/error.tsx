'use client';

import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { WobblyButton, WobblyCard, StickyLabel, RoughPill } from '@/app/components/handdrawn';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-[#2d2d2d] selection:bg-[#ff4d4d] selection:text-white">
      <WobblyCard className="w-full max-w-xl bg-white text-center" rotate={-1}>
        <StickyLabel>Something went wrong</StickyLabel>

        <div className="mt-6 flex justify-center">
          <span
            className="inline-flex h-16 w-16 items-center justify-center border-[3px] border-[#2d2d2d] bg-[#ff4d4d] text-white"
            style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
          >
            <AlertTriangle className="h-8 w-8" strokeWidth={2.5} />
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold">Unexpected Error</h1>
        <p className="mt-2 text-lg">
          Something broke on this page. This has been logged and we&apos;ll look into it.
        </p>

        {error.digest && (
          <div className="mt-3 flex justify-center">
            <RoughPill>Error ID: {error.digest}</RoughPill>
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={reset}>
            <WobblyButton>
              <span className="inline-flex items-center gap-2">
                <RefreshCw className="h-4 w-4" strokeWidth={2.8} />
                Try Again
              </span>
            </WobblyButton>
          </button>
          <Link href="/">
            <WobblyButton variant="secondary">
              <span className="inline-flex items-center gap-2">
                <Home className="h-4 w-4" strokeWidth={2.8} />
                Go Home
              </span>
            </WobblyButton>
          </Link>
        </div>

        <p className="mt-4 text-sm font-semibold">
          Keep seeing this?{' '}
          <Link href="/feedback" className="underline decoration-2 underline-offset-2 hover:text-[#ff4d4d]">
            Report the issue
          </Link>
        </p>
      </WobblyCard>
    </div>
  );
}
