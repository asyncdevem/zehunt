import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Activity, Award, ChartNoAxesCombined, Flame, UserRoundSearch } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyCard } from '@/app/components/handdrawn';
import { builders, opportunities, updates } from '@/app/lib/platform-data';

export default async function BuilderProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const builder = builders.find((item) => item.username === username);

  if (!builder) {
    notFound();
  }

  const builderUpdates = updates.filter((item) => item.builderUsername === builder.username);
  const builderOpportunities = opportunities.filter((item) => item.builderUsername === builder.username);

  return (
    <PlatformShell
      title={`${builder.name} (@${builder.username})`}
      subtitle="Execution timeline, reputation components, and unlocked opportunities."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Builder Profile</StickyLabel>
        <RoughPill>{builder.focus}</RoughPill>
        <RoughPill>{builder.location}</RoughPill>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr,1.1fr]">
        <WobblyCard className="bg-white" rotate={-1}>
          <div className="flex items-center gap-3">
            <div
              className="relative h-16 w-16 overflow-hidden border-[3px] border-[#2d2d2d]"
              style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
            >
              <Image src={builder.avatar} alt={builder.name} fill sizes="64px" className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold">Score {builder.score}</h2>
              <p className="text-lg">{builder.momentum}</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {[
              { label: 'Consistency', value: builder.consistency, icon: Flame },
              { label: 'Execution', value: builder.execution, icon: ChartNoAxesCombined },
              { label: 'Engagement', value: builder.engagement, icon: Activity },
              { label: 'Outcomes', value: builder.outcomes, icon: Award },
            ].map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="border-[2px] border-[#2d2d2d] bg-[#fdfbf7] px-3 py-2"
                  style={{ borderRadius: '61% 39% 57% 43% / 40% 63% 37% 60%' }}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 font-bold">
                      <Icon className="h-4 w-4 text-[#2d5da1]" strokeWidth={2.8} />
                      {metric.label}
                    </span>
                    <span className="font-bold">{metric.value}</span>
                  </div>
                  <div className="h-2 border border-[#2d2d2d] bg-white">
                    <div className="h-full bg-[#ff4d4d]" style={{ width: `${metric.value}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </WobblyCard>

        <div className="space-y-4">
          <WobblyCard className="bg-[#fff9c4]" rotate={1}>
            <h3 className="text-2xl font-extrabold">Recent Structured Updates</h3>
            <div className="mt-3 space-y-3">
              {builderUpdates.map((item) => (
                <article
                  key={item.id}
                  className="border-[2px] border-dashed border-[#2d2d2d] bg-white px-3 py-2"
                  style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                >
                  <p className="text-sm font-bold uppercase">{item.type}</p>
                  <p className="text-lg">{item.content}</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <RoughPill>{item.stage}</RoughPill>
                    <RoughPill>{item.time}</RoughPill>
                  </div>
                </article>
              ))}
            </div>
          </WobblyCard>

          <WobblyCard className="bg-white" rotate={-1}>
            <div className="inline-flex items-center gap-2">
              <UserRoundSearch className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
              <h3 className="text-2xl font-extrabold">Opportunity Status</h3>
            </div>
            <div className="mt-3 space-y-2">
              {builderOpportunities.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b-2 border-dashed border-[#2d2d2d] py-2">
                  <p className="font-bold">{item.type}</p>
                  <div className="flex gap-2">
                    <RoughPill>Fit {item.fitScore}</RoughPill>
                    <RoughPill>{item.status}</RoughPill>
                  </div>
                </div>
              ))}
            </div>
          </WobblyCard>
        </div>
      </div>
    </PlatformShell>
  );
}
