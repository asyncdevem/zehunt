import { MessageSquareQuote, Milestone, Rocket, ScrollText } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyCard } from '@/app/components/handdrawn';
import { updates } from '@/app/lib/platform-data';

const typeIcon: Record<string, typeof Rocket> = {
  'shipped feature': Rocket,
  'milestone reached': Milestone,
  'lesson learned': ScrollText,
};

export default function FeedPage() {
  return (
    <PlatformShell
      title="Activity Feed"
      subtitle="See what builders are working on. Real progress updates, not social posts."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Real Work Only</StickyLabel>
        <RoughPill>No popularity contests</RoughPill>
      </div>

      <div className="space-y-4">
        {updates.map((update, index) => {
          const Icon = typeIcon[update.type] ?? MessageSquareQuote;
          return (
            <WobblyCard key={update.id} className="bg-white" rotate={index % 2 ? 1 : -1}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-flex h-9 w-9 items-center justify-center border-[2px] border-[#2d2d2d] bg-[#fff9c4]"
                    style={{ borderRadius: '58% 42% 67% 33% / 42% 55% 45% 58%' }}
                  >
                    <Icon className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
                  </span>
                  <div>
                    <h2 className="text-2xl font-extrabold capitalize">{update.type}</h2>
                    <p className="text-base text-[#2d2d2d]">
                      @{update.builderUsername} on {update.product}
                    </p>
                    <p className="mt-2 text-lg">{update.content}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <RoughPill>{update.stage}</RoughPill>
                  <RoughPill>{update.time}</RoughPill>
                </div>
              </div>
            </WobblyCard>
          );
        })}
      </div>
    </PlatformShell>
  );
}
