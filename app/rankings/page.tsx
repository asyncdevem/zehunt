import { Bolt, CalendarClock, Flame, Trophy } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyCard } from '@/app/components/handdrawn';
import { builders } from '@/app/lib/platform-data';

const rankingLanes = [
  {
    title: 'Rising Builders',
    hint: '7-day score growth',
    icon: Bolt,
    score: (b: (typeof builders)[number]) => b.score,
  },
  {
    title: 'Consistent Builders',
    hint: '30-day consistency',
    icon: CalendarClock,
    score: (b: (typeof builders)[number]) => b.consistency,
  },
  {
    title: 'Breakout Builders',
    hint: 'rapid growth + results',
    icon: Flame,
    score: (b: (typeof builders)[number]) => b.outcomes + b.execution,
  },
];

export default function RankingsPage() {
  return (
    <PlatformShell
      title="Builder Rankings"
      subtitle="See top builders ranked by real progress, not hype."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Builder Rankings</StickyLabel>
        <RoughPill>No popularity contests</RoughPill>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {rankingLanes.map((lane, laneIndex) => {
          const Icon = lane.icon;
          const ranked = [...builders].sort((a, b) => lane.score(b) - lane.score(a));

          return (
            <WobblyCard key={lane.title} className="bg-white" rotate={laneIndex % 2 ? 1 : -1}>
              <div className="inline-flex items-center gap-2">
                <Icon className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
                <h2 className="text-2xl font-extrabold">{lane.title}</h2>
              </div>
              <p className="mt-1 text-base">{lane.hint}</p>
              <div className="mt-4 space-y-3">
                {ranked.map((builder, idx) => (
                  <div
                    key={`${lane.title}-${builder.id}`}
                    className="flex items-center justify-between border-[2px] border-dashed border-[#2d2d2d] bg-[#fdfbf7] px-3 py-2"
                    style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                  >
                    <div>
                      <p className="font-extrabold">#{idx + 1} {builder.name}</p>
                      <p className="text-sm">@{builder.username}</p>
                    </div>
                    <RoughPill>{lane.score(builder)}</RoughPill>
                  </div>
                ))}
              </div>
            </WobblyCard>
          );
        })}
      </div>

      <WobblyCard className="mt-6 bg-[#fff9c4]" rotate={1}>
        <div className="inline-flex items-center gap-2">
          <Trophy className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
          <h3 className="text-2xl font-extrabold">Platform Principle</h3>
        </div>
        <p className="mt-2 text-lg">
          Rankings show real progress and growth, not social hype.
        </p>
      </WobblyCard>
    </PlatformShell>
  );
}
