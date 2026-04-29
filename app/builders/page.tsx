import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyCard } from '@/app/components/handdrawn';
import { builders } from '@/app/lib/platform-data';

export default function BuildersPage() {
  return (
    <PlatformShell
      title="Builder Reputation Graph"
      subtitle="Zehunt tracks execution over time and ranks builders by measurable consistency, progression, and outcomes."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Rising Builders</StickyLabel>
        <RoughPill>Consistent Builders</RoughPill>
        <RoughPill>Breakout Builders</RoughPill>
      </div>

      <div className="grid gap-4">
        {builders.map((builder, index) => (
          <WobblyCard key={builder.id} className="bg-[#fdfbf7]" rotate={index % 2 === 0 ? 1 : -1}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-8 w-8 items-center justify-center bg-[#2d2d2d] text-xs font-bold text-white"
                  style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                >
                  {index + 1}
                </span>
                <div
                  className="relative h-12 w-12 overflow-hidden border-[2px] border-[#2d2d2d]"
                  style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                >
                  <Image src={builder.avatar} alt={builder.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold">{builder.name}</h2>
                  <p className="text-base">@{builder.username} - {builder.focus}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <RoughPill>Score {builder.score}</RoughPill>
                <RoughPill>{builder.streak}</RoughPill>
                <RoughPill>{builder.momentum}</RoughPill>
                <Link
                  href={`/builders/${builder.username}`}
                  className="inline-flex h-11 items-center gap-2 border-[3px] border-[#2d2d2d] bg-white px-4 font-bold transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#ff4d4d] hover:text-white"
                  style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', boxShadow: '4px 4px 0 0 #2d2d2d' }}
                >
                  View Profile
                  <ArrowRight className="h-4 w-4" strokeWidth={2.8} />
                </Link>
              </div>
            </div>
          </WobblyCard>
        ))}
      </div>

      <WobblyCard className="mt-8 bg-[#fff9c4]" rotate={-1}>
        <div className="flex items-start gap-3">
          <span
            className="inline-flex h-9 w-9 items-center justify-center border-[2px] border-[#2d2d2d] bg-white"
            style={{ borderRadius: '58% 42% 67% 33% / 42% 55% 45% 58%' }}
          >
            <TrendingUp className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
          </span>
          <div>
            <h3 className="text-2xl font-extrabold">Ranking Engine</h3>
            <p className="text-lg">
              Top cards reflect growth velocity, consistency over time, and completed lifecycle transitions.
            </p>
          </div>
        </div>
      </WobblyCard>
    </PlatformShell>
  );
}
