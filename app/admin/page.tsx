import Link from 'next/link';
import { Activity, ArrowRight, Bug, ShieldAlert, SlidersHorizontal, TrendingUp, Users } from 'lucide-react';
import { RoughPill, StickyLabel, WobblyCard } from '@/app/components/handdrawn';

const stats = [
  { label: 'Total Builders', value: '142', change: '+12 this week', color: 'bg-[#ff4d4d]' },
  { label: 'Total Products', value: '87', change: '+8 this week', color: 'bg-[#2d5da1]' },
  { label: 'Updates Today', value: '34', change: '+18% vs yesterday', color: 'bg-[#e5880a]' },
  { label: 'Open Reports', value: '7', change: '3 critical', color: 'bg-[#ff4d4d]' },
];

const recentEvents = [
  { type: 'PRODUCT_CREATED', builder: 'newbuilder42', time: '2m ago' },
  { type: 'STAGE_CHANGED', builder: 'ayeshabuilds', time: '8m ago', detail: 'FlowPilot: BETA → GROWTH' },
  { type: 'UPDATE_POSTED', builder: 'rohanexec', time: '15m ago' },
  { type: 'FOLLOWED', builder: 'minaforward', time: '22m ago', detail: 'followed ayeshabuilds' },
  { type: 'TEAM_JOINED', builder: 'sarahcodes', time: '1h ago', detail: 'joined FlowPilot as contributor' },
];

const quickActions = [
  { label: 'Moderation Queue', count: 12, href: '/admin/moderation', icon: ShieldAlert },
  { label: 'User Management', count: 142, href: '/admin/users', icon: Users },
  { label: 'Score Calibration', count: null, href: '/admin/scores', icon: SlidersHorizontal },
  { label: 'Bug Reports', count: 7, href: '/admin/reports', icon: Bug },
];

export default function AdminOverview() {
  return (
    <>
      <div className="mb-8">
        <StickyLabel>Admin Dashboard</StickyLabel>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Platform Overview</h1>
        <p className="mt-1 text-xl">System health, activity, and moderation status at a glance.</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <WobblyCard key={stat.label} className="bg-white" rotate={0}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-[#2d2d2d]/60">{stat.label}</p>
                <p className="mt-1 text-3xl font-extrabold">{stat.value}</p>
              </div>
              <span
                className={`inline-flex h-8 w-8 items-center justify-center ${stat.color} text-white`}
                style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
              >
                <TrendingUp className="h-4 w-4" strokeWidth={2.8} />
              </span>
            </div>
            <p className="mt-2 text-sm font-bold text-[#2d2d2d]/50">{stat.change}</p>
          </WobblyCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        {/* Recent Events */}
        <WobblyCard className="bg-white" rotate={0}>
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
              <h2 className="text-2xl font-extrabold">Live Event Stream</h2>
            </div>
            <Link href="/admin/events" className="text-sm font-bold text-[#2d5da1] underline underline-offset-2">
              View All
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            {recentEvents.map((event, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-dashed border-[#2d2d2d]/20 py-2 last:border-0"
              >
                <div className="flex items-center gap-2">
                  <RoughPill>{event.type}</RoughPill>
                  <span className="text-sm font-bold">@{event.builder}</span>
                  {event.detail && <span className="text-sm text-[#2d2d2d]/60">— {event.detail}</span>}
                </div>
                <span className="shrink-0 text-xs font-bold text-[#2d2d2d]/40">{event.time}</span>
              </div>
            ))}
          </div>
        </WobblyCard>

        {/* Quick Actions */}
        <div className="space-y-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href}>
                <WobblyCard className="bg-white cursor-pointer transition-all hover:scale-[1.01]" rotate={index % 2 === 0 ? 0.5 : -0.5}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex h-9 w-9 items-center justify-center border-[2px] border-[#2d2d2d] bg-[#fff9c4]"
                        style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                      >
                        <Icon className="h-4 w-4 text-[#ff4d4d]" strokeWidth={2.8} />
                      </span>
                      <span className="text-lg font-extrabold">{action.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {action.count !== null && <RoughPill>{action.count}</RoughPill>}
                      <ArrowRight className="h-4 w-4 text-[#2d5da1]" strokeWidth={2.8} />
                    </div>
                  </div>
                </WobblyCard>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
