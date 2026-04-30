import Link from 'next/link';
import Image from 'next/image';
import {
  Activity,
  ArrowRight,
  Award,
  ChartNoAxesCombined,
  Flame,
  Package,
  Pencil,
  Plus,
  TrendingUp,
} from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';
import { builders, updates, opportunities } from '@/app/lib/platform-data';

// Simulating the logged-in builder (first builder in mock data)
const me = builders[0];
const myUpdates = updates.filter((u) => u.builderUsername === me.username);
const myOpportunities = opportunities.filter((o) => o.builderUsername === me.username);

const scoreComponents = [
  { label: 'Consistency', value: me.consistency, icon: Flame, weight: '30%' },
  { label: 'Execution', value: me.execution, icon: ChartNoAxesCombined, weight: '25%' },
  { label: 'Engagement', value: me.engagement, icon: Activity, weight: '20%' },
  { label: 'Outcomes', value: me.outcomes, icon: Award, weight: '15%' },
];

export default function BuilderDashboard() {
  return (
    <PlatformShell
      title="Builder Dashboard"
      subtitle={`Welcome back, ${me.name}. Here's your progress overview.`}
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Builder</StickyLabel>
        <RoughPill>{me.streak}</RoughPill>
        <RoughPill>{me.momentum}</RoughPill>
        <div className="ml-auto flex gap-2">
          <Link href="/products/new">
            <WobblyButton variant="secondary">
              <span className="inline-flex items-center gap-2">
                <Plus className="h-4 w-4" strokeWidth={2.8} />
                New Product
              </span>
            </WobblyButton>
          </Link>
          <Link href="/updates/new">
            <WobblyButton>
              <span className="inline-flex items-center gap-2">
                <Pencil className="h-4 w-4" strokeWidth={2.8} />
                Post Update
              </span>
            </WobblyButton>
          </Link>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr,1fr]">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Score Overview */}
          <WobblyCard className="bg-white" rotate={-1}>
            <div className="flex items-center gap-3">
              <div
                className="relative h-14 w-14 overflow-hidden border-[3px] border-[#2d2d2d]"
                style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
              >
                <Image src={me.avatar} alt={me.name} fill sizes="56px" className="object-cover" />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold">Score {me.score}</h2>
                <p className="text-base">@{me.username} · {me.focus}</p>
              </div>
              <div className="ml-auto">
                <Link href={`/builders/${me.username}`}>
                  <RoughPill>View Public Profile</RoughPill>
                </Link>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {scoreComponents.map((metric) => {
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
                        <span className="text-xs text-[#2d2d2d]/50">({metric.weight})</span>
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

          {/* Products */}
          <WobblyCard className="bg-[#fdfbf7]" rotate={1}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <Package className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
                <h3 className="text-2xl font-extrabold">Your Products</h3>
              </div>
              <Link href="/products/new" className="text-sm font-bold text-[#2d5da1] underline underline-offset-2">
                + Add
              </Link>
            </div>
            <div className="mt-3">
              <Link
                href="/products/flowpilot"
                className="flex items-center justify-between border-[2px] border-dashed border-[#2d2d2d] bg-white px-3 py-3 transition-colors hover:bg-[#fff9c4]"
                style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
              >
                <div>
                  <p className="text-lg font-extrabold">FlowPilot</p>
                  <p className="text-sm">AI workflow engine for startup ops teams.</p>
                </div>
                <div className="flex items-center gap-2">
                  <RoughPill>GROWTH</RoughPill>
                  <ArrowRight className="h-4 w-4 text-[#2d5da1]" strokeWidth={2.8} />
                </div>
              </Link>
            </div>
          </WobblyCard>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Recent Updates */}
          <WobblyCard className="bg-[#fff9c4]" rotate={1}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-extrabold">Recent Updates</h3>
              <Link href="/feed" className="text-sm font-bold text-[#2d5da1] underline underline-offset-2">
                View Feed
              </Link>
            </div>
            <div className="mt-3 space-y-3">
              {myUpdates.map((item) => (
                <article
                  key={item.id}
                  className="border-[2px] border-dashed border-[#2d2d2d] bg-white px-3 py-2"
                  style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                >
                  <p className="text-sm font-bold uppercase">{item.type}</p>
                  <p className="text-base">{item.content}</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <RoughPill>{item.stage}</RoughPill>
                    <RoughPill>{item.time}</RoughPill>
                  </div>
                </article>
              ))}
              {myUpdates.length === 0 && (
                <p className="text-base text-[#2d2d2d]/60">No updates yet. Post your first execution update.</p>
              )}
            </div>
          </WobblyCard>

          {/* Opportunities */}
          <WobblyCard className="bg-white" rotate={-1}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
                <h3 className="text-2xl font-extrabold">Opportunities</h3>
              </div>
              <Link href="/opportunities" className="text-sm font-bold text-[#2d5da1] underline underline-offset-2">
                View All
              </Link>
            </div>
            <div className="mt-3 space-y-2">
              {myOpportunities.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b-2 border-dashed border-[#2d2d2d] py-2 last:border-0">
                  <div>
                    <p className="font-bold">{item.type}</p>
                    <p className="text-sm">{item.detail}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <RoughPill>Fit {item.fitScore}</RoughPill>
                    <RoughPill>{item.status}</RoughPill>
                  </div>
                </div>
              ))}
            </div>
          </WobblyCard>

          {/* Quick Stats */}
          <WobblyCard className="bg-[#fdfbf7]" rotate={0.5}>
            <h3 className="text-xl font-extrabold">Quick Stats</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                { label: 'Products', value: '1' },
                { label: 'Updates', value: String(myUpdates.length) },
                { label: 'Followers', value: '47' },
                { label: 'Streak', value: '21d' },
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
