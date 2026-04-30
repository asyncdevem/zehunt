import Image from 'next/image';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { WobblyButton, WobblyCard, StickyLabel, RoughPill } from '@/app/components/handdrawn';

export default function NotFound() {
  return (
    <div className="min-h-screen text-[#2d2d2d] selection:bg-[#ff4d4d] selection:text-white">
      <header className="border-b-[3px] border-[#2d2d2d] bg-[#fdfbf7]/95">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image src="/zehunt-logo.png" alt="Zehunt" width={104} height={34} className="h-7 w-auto object-contain" />
          </Link>
          <Link href="/builders" className="text-lg font-bold hover:text-[#ff4d4d]">
            Explore Builders
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <WobblyCard className="w-full max-w-xl bg-[#fff9c4] text-center" rotate={-1}>
          <StickyLabel>Lost in the graph</StickyLabel>

          <h1 className="mt-6 text-7xl font-extrabold tracking-tight">404</h1>
          <p className="mt-3 text-2xl font-extrabold">Page Not Found</p>
          <p className="mt-2 text-lg">
            This page doesn&apos;t exist in the builder graph. It might have been moved, deleted, or never built.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <RoughPill>No execution evidence found</RoughPill>
            <RoughPill>Score: 0</RoughPill>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/">
              <WobblyButton>
                <span className="inline-flex items-center gap-2">
                  <Home className="h-4 w-4" strokeWidth={2.8} />
                  Go Home
                </span>
              </WobblyButton>
            </Link>
            <Link href="/search">
              <WobblyButton variant="secondary">
                <span className="inline-flex items-center gap-2">
                  <Search className="h-4 w-4" strokeWidth={2.8} />
                  Search
                </span>
              </WobblyButton>
            </Link>
          </div>
        </WobblyCard>
      </main>
    </div>
  );
}
