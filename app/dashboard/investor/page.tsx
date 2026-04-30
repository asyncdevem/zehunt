import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Bookmark,
  ChartNoAxesCombined,
  Eye,
  Flame,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';
import { builders } from '@/app/lib/platform-data';

const watchlist = [builders[0], builders[2]];

const fundingPipeline = [
  { builder: 'minaforward', product: 'PulseDesk', stage: 'BETA', status: 'Interest Sent', fitScore: 84 },
  { builder: 'ayeshabuilds', product: 'FlowPilot', stage: 'GROWTH', status: 'In Review', fitScore: 92 },
];

const trendingSignals = [
  { label: 'Builders with 20+ day streaks', value: '12', trend: '+3 this week' },
  { label: 'Products entering GROWTH stage', value: '5', trend: '+2 this week' },
  { label: 'New builders this month', value: '34', trend: '+18% vs last month' },
  { label: 'Avg builder score (active)', value: '687', trend: '+4% this month' },
];

export default function InvestorDashboard() {
  return (
    <PlatformShell
      title="Investor Dashboard"
      subtitle="Discover talented builders through real progress, not pitches."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Investor</StickyLabel>
        <RoughPill>Real Progress Discovery</RoughPill>
        <div className="ml-auto">
          <Link href="/rankings">
            <WobblyButton variant="secondary">
              <span className="inline-flex items-center gap-2">
                <ChartNoAxesCombined className="h-4 w-4" strokeWidth={2.8} />
                View Rankings
              </span>
            </WobblyButton>
          </Link>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr,1fr]">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Execution Trends */}
          <WobblyCard className="bg-white" rotate={-1}>
            <div className="inline-flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
              <h3 className="text-2xl font-extrabold">Builder Trends</h3>
            </div>
            <div className="mt-3 space-y-3">
              {trendingSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="flex items-center justify-between border-[2px] border-[#2d2d2d] bg-[#fdfbf7] px-3 py-2"
                  style={{ borderRadius: '61% 39% 57% 43% / 40% 63% 37% 60%' }}
                >
                  <div>
                    <p className="font-bold">{signal.label}</p>
                    <p className="text-sm text-[#2d2d2d]/60">{signal.trend}</p>
                  </div>
                  <span className="text-2xl font-extrabold">{signal.value}</span>
                </div>
              ))}
            </div>
          </WobblyCard>

          {/* Rising Builders */}
          <WobblyCard className="bg-[#fff9c4]" rotate={1}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <Flame className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
                <h3 className="text-2xl font-extrabold">Rising Builders</h3>
              </div>
              <Link href="/builders" className="text-sm font-bold text-[#2d5da1] underline underline-offset-2">
                View All
              </Link>
            </div>
            <div className="mt-3 space-y-3">
              {builders.map((builder, index) => (
                <Link
                  key={builder.id}
                  href={`/builders/${builder.username}`}
                  className="flex items-center justify-between border-[2px] border-dashed border-[#2d2d2d] bg-white px-3 py-2 transition-colors hover:bg-[#fdfbf7]"
                  style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex h-7 w-7 items-center justify-center bg-[#2d2d2d] text-xs font-bold text-white"
                      style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    >
                      {index + 1}
                    </span>
                    <div
                      className="relative h-9 w-9 overflow-hidden border-[2px] border-[#2d2d2d]"
                      style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    >
                      <Image src={builder.avatar} alt={builder.name} fill sizes="36px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-extrabold">{builder.name}</p>
                      <p className="text-sm">{builder.focus}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <RoughPill>Score {builder.score}</RoughPill>
                    <RoughPill>{builder.momentum}</RoughPill>
                  </div>
                </Link>
              ))}
            </div>
          </WobblyCard>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Watchlist */}
          <WobblyCard className="bg-white" rotate={1}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <Eye className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
                <h3 className="text-2xl font-extrabold">Watchlist</h3>
              </div>
              <RoughPill>{watchlist.length} builders</RoughPill>
            </div>
            <div className="mt-3 space-y-3">
              {watchlist.map((builder) => (
                <Link
                  key={builder.id}
                  href={`/builders/${builder.username}`}
                  className="flex items-center justify-between border-[2px] border-dashed border-[#2d2d2d] bg-[#fdfbf7] px-3 py-2 transition-colors hover:bg-[#fff9c4]"
                  style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="relative h-9 w-9 overflow-hidden border-[2px] border-[#2d2d2d]"
                      style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    >
                      <Image src={builder.avatar} alt={builder.name} fill sizes="36px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-extrabold">{builder.name}</p>
                      <p className="text-sm">@{builder.username} · {builder.streak}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bookmark className="h-4 w-4 text-[#ff4d4d]" strokeWidth={2.8} />
                    <ArrowRight className="h-4 w-4 text-[#2d5da1]" strokeWidth={2.8} />
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-3 text-sm text-[#2d2d2d]/60">Follow builders to add them to your watchlist and track their execution over time.</p>
          </WobblyCard>

          {/* Funding Pipeline */}
          <WobblyCard className="bg-[#fdfbf7]" rotate={-1}>
            <div className="inline-flex items-center gap-2">
              <Wallet className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
              <h3 className="text-2xl font-extrabold">Funding Pipeline</h3>
            </div>
            <div className="mt-3 space-y-3">
              {fundingPipeline.map((item) => (
                <div
                  key={item.builder}
                  className="border-[2px] border-dashed border-[#2d2d2d] bg-white px-3 py-2"
                  style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-extrabold">{item.product}</p>
                      <p className="text-sm">@{item.builder}</p>
                    </div>
                    <div className="flex gap-2">
                      <RoughPill>{item.stage}</RoughPill>
                      <RoughPill>Fit {item.fitScore}</RoughPill>
                    </div>
                  </div>
                  <div className="mt-1">
                    <span
                      className={`inline-flex border-[2px] px-2.5 py-0.5 text-xs font-bold ${item.status === 'In Review' ? 'border-[#2d5da1] bg-[#2d5da1]/10 text-[#2d5da1]' : 'border-[#e5880a] bg-[#e5880a]/10 text-[#e5880a]'}`}
                      style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </WobblyCard>

          {/* Quick Stats */}
          <WobblyCard className="bg-[#fff9c4]" rotate={0.5}>
            <h3 className="text-xl font-extrabold">Your Activity</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                { label: 'Watching', value: '2' },
                { label: 'Interest Sent', value: '3' },
                { label: 'In Review', value: '1' },
                { label: 'Profiles Viewed', value: '28' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border-[2px] border-[#2d2d2d] bg-white px-3 py-2 text-center"
                  style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                >
                  <p className="text-2xl font-extrabold">{stat.value}</p>
                  <p className="text-sm font-bold text-[#2d2d2d]/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </WobblyCard>
        </div>
      </div>
    </PlatformShell>
  );
}
