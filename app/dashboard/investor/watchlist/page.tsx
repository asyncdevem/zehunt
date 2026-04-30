import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bookmark, BookmarkX, Eye, TrendingUp } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';
import { builders } from '@/app/lib/platform-data';

const watchedBuilders = builders.map((b, i) => ({
  ...b,
  addedAt: ['2w ago', '1w ago', '3d ago'][i],
  notes: [
    'Strong AI/ML execution. Watch for GROWTH transition.',
    'Consistent shipping cadence. Good infra background.',
    'High engagement quality. Potential B2B SaaS fit.',
  ][i],
  scoreChange: ['+32', '+18', '+24'][i],
}));

export default function InvestorWatchlistPage() {
  return (
    <PlatformShell
      title="Watchlist"
      subtitle="Builders you're tracking. Monitor their execution, score changes, and lifecycle progression."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Investor</StickyLabel>
        <RoughPill>{watchedBuilders.length} builders watched</RoughPill>
        <div className="ml-auto">
          <Link href="/builders">
            <WobblyButton variant="secondary">
              <span className="inline-flex items-center gap-2">
                <Eye className="h-4 w-4" strokeWidth={2.8} />
                Discover Builders
              </span>
            </WobblyButton>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {watchedBuilders.map((builder, index) => (
          <WobblyCard key={builder.id} className="bg-white" rotate={index % 2 === 0 ? 0.5 : -0.5}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div
                  className="relative h-12 w-12 shrink-0 overflow-hidden border-[2px] border-[#2d2d2d]"
                  style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                >
                  <Image src={builder.avatar} alt={builder.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Link href={`/builders/${builder.username}`} className="text-xl font-extrabold hover:text-[#ff4d4d]">
                      {builder.name}
                    </Link>
                    <RoughPill>Score {builder.score}</RoughPill>
                    <span className="text-sm font-bold text-green-600">{builder.scoreChange} this week</span>
                  </div>
                  <p className="text-sm">@{builder.username} · {builder.focus} · {builder.streak}</p>
                  <p className="mt-1 text-base italic">&quot;{builder.notes}&quot;</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <RoughPill>Added {builder.addedAt}</RoughPill>
                <Link href={`/builders/${builder.username}`}>
                  <button
                    className="inline-flex h-9 w-9 items-center justify-center border-[2px] border-[#2d5da1] text-[#2d5da1] transition-colors hover:bg-[#2d5da1] hover:text-white"
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    aria-label="View profile"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={2.8} />
                  </button>
                </Link>
                <button
                  className="inline-flex h-9 w-9 items-center justify-center border-[2px] border-[#ff4d4d] text-[#ff4d4d] transition-colors hover:bg-[#ff4d4d] hover:text-white"
                  style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  aria-label="Remove from watchlist"
                >
                  <BookmarkX className="h-4 w-4" strokeWidth={2.8} />
                </button>
              </div>
            </div>

            {/* Score Components Mini */}
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[
                { label: 'Consistency', value: builder.consistency },
                { label: 'Execution', value: builder.execution },
                { label: 'Engagement', value: builder.engagement },
                { label: 'Outcomes', value: builder.outcomes },
              ].map((m) => (
                <div
                  key={m.label}
                  className="border-[2px] border-[#2d2d2d] bg-[#fdfbf7] px-2 py-1 text-center"
                  style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                >
                  <p className="text-lg font-extrabold">{m.value}</p>
                  <p className="text-xs font-bold text-[#2d2d2d]/60">{m.label}</p>
                </div>
              ))}
            </div>
          </WobblyCard>
        ))}
      </div>
    </PlatformShell>
  );
}
