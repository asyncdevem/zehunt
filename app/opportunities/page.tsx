import { Briefcase, Handshake, Sparkles, Wallet } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyCard } from '@/app/components/handdrawn';
import { opportunities } from '@/app/lib/platform-data';

function iconForType(type: string) {
  if (type.includes('Hiring')) return Briefcase;
  if (type.includes('Collaboration')) return Handshake;
  if (type.includes('Funding')) return Wallet;
  return Sparkles;
}

export default function OpportunitiesPage() {
  return (
    <PlatformShell
      title="Opportunity Engine"
      subtitle="Builder reputation is converted into real hiring, collaboration, and funding opportunities."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Live Matches</StickyLabel>
        <RoughPill>Skills Graph + Activity</RoughPill>
        <RoughPill>Stage Maturity Signals</RoughPill>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {opportunities.map((item, index) => {
          const Icon = iconForType(item.type);
          return (
            <WobblyCard key={item.id} className="bg-[#fdfbf7]" rotate={index % 2 === 0 ? 1 : -1}>
              <div className="flex items-start gap-3">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center border-[2px] border-[#2d2d2d] bg-white"
                  style={{ borderRadius: '58% 42% 67% 33% / 42% 55% 45% 58%' }}
                >
                  <Icon className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
                </span>
                <div className="flex-1">
                  <h2 className="text-2xl font-extrabold">{item.type}</h2>
                  <p className="text-base">Builder: @{item.builderUsername}</p>
                  <p className="mt-2 text-lg">{item.detail}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <RoughPill>Fit Score {item.fitScore}</RoughPill>
                    <RoughPill>Status {item.status}</RoughPill>
                  </div>
                </div>
              </div>
            </WobblyCard>
          );
        })}
      </div>
    </PlatformShell>
  );
}
