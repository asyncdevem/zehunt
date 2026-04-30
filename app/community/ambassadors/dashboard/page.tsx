import Link from 'next/link';
import { ArrowRight, Calendar, GraduationCap, Megaphone, Star, TrendingUp, UserPlus, Users } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const ambassadorStats = [
  { label: 'Builders Onboarded', value: '18', icon: UserPlus },
  { label: 'Events Hosted', value: '3', icon: Calendar },
  { label: 'Chapter Rank', value: '#2', icon: TrendingUp },
  { label: 'Ambassador Score', value: '340', icon: Star },
];

const recentOnboards = [
  { name: 'Ali Hassan', username: 'alibuilds', time: '2d ago' },
  { name: 'Fatima Zahra', username: 'fatimadev', time: '3d ago' },
  { name: 'Usman Tariq', username: 'usmanships', time: '5d ago' },
];

const upcomingEvents = [
  { title: 'Build-in-Public Workshop', date: 'May 5, 2026', location: 'LUMS CS Lab', attendees: 25 },
  { title: 'Zehunt Hackathon', date: 'May 15, 2026', location: 'LUMS Auditorium', attendees: 50 },
];

export default function AmbassadorDashboardPage() {
  return (
    <PlatformShell
      title="Ambassador Dashboard"
      subtitle="Track your impact, manage events, and grow the builder community at your university."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Ambassador</StickyLabel>
        <RoughPill>LUMS Chapter</RoughPill>
        <RoughPill>Active since Jan 2026</RoughPill>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {ambassadorStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <WobblyCard key={stat.label} className="bg-white text-center" rotate={0}>
              <Icon className="mx-auto h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
              <p className="mt-1 text-2xl font-extrabold">{stat.value}</p>
              <p className="text-sm font-bold text-[#2d2d2d]/60">{stat.label}</p>
            </WobblyCard>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Recent Onboards */}
          <WobblyCard className="bg-white" rotate={-1}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
                <h3 className="text-2xl font-extrabold">Recent Onboards</h3>
              </div>
              <RoughPill>{recentOnboards.length} this week</RoughPill>
            </div>
            <div className="mt-3 space-y-2">
              {recentOnboards.map((user) => (
                <div
                  key={user.username}
                  className="flex items-center justify-between border-[2px] border-dashed border-[#2d2d2d] bg-[#fdfbf7] px-3 py-2"
                  style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                >
                  <div>
                    <p className="font-extrabold">{user.name}</p>
                    <p className="text-sm">@{user.username}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <RoughPill>{user.time}</RoughPill>
                    <Link href={`/builders/${user.username}`}>
                      <ArrowRight className="h-4 w-4 text-[#2d5da1]" strokeWidth={2.8} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <p className="text-sm text-[#2d2d2d]/60">Share your referral link to track onboards automatically.</p>
              <div
                className="mt-2 flex items-center justify-between border-[2px] border-[#2d2d2d] bg-[#fff9c4] px-3 py-2 text-sm font-bold"
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
              >
                <span>zehunt.com/join?ref=ayeshabuilds</span>
                <WobblyButton variant="secondary">Copy</WobblyButton>
              </div>
            </div>
          </WobblyCard>

          {/* Leaderboard */}
          <WobblyCard className="bg-[#fdfbf7]" rotate={1}>
            <div className="inline-flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
              <h3 className="text-2xl font-extrabold">Chapter Leaderboard</h3>
            </div>
            <div className="mt-3 space-y-2">
              {[
                { uni: 'FAST-NUCES', builders: 42, ambassadors: 4 },
                { uni: 'LUMS', builders: 38, ambassadors: 3 },
                { uni: 'NUST', builders: 31, ambassadors: 2 },
                { uni: 'ITU', builders: 24, ambassadors: 2 },
                { uni: 'IBA Karachi', builders: 18, ambassadors: 1 },
              ].map((chapter, i) => (
                <div
                  key={chapter.uni}
                  className={`flex items-center justify-between border-[2px] px-3 py-2 ${i === 1 ? 'border-[#ff4d4d] bg-[#fff9c4]' : 'border-dashed border-[#2d2d2d] bg-white'}`}
                  style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#2d2d2d]/50">#{i + 1}</span>
                    <span className="font-extrabold">{chapter.uni}</span>
                  </div>
                  <div className="flex gap-2">
                    <RoughPill>{chapter.builders} builders</RoughPill>
                  </div>
                </div>
              ))}
            </div>
          </WobblyCard>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Upcoming Events */}
          <WobblyCard className="bg-[#fff9c4]" rotate={1}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
                <h3 className="text-2xl font-extrabold">Your Events</h3>
              </div>
              <WobblyButton variant="secondary">+ New Event</WobblyButton>
            </div>
            <div className="mt-3 space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.title}
                  className="border-[2px] border-dashed border-[#2d2d2d] bg-white px-3 py-3"
                  style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                >
                  <p className="font-extrabold">{event.title}</p>
                  <p className="text-sm">{event.date} · {event.location}</p>
                  <div className="mt-1 flex gap-2">
                    <RoughPill>{event.attendees} expected</RoughPill>
                    <RoughPill>Upcoming</RoughPill>
                  </div>
                </div>
              ))}
            </div>
          </WobblyCard>

          {/* Resources */}
          <WobblyCard className="bg-white" rotate={-1}>
            <div className="inline-flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
              <h3 className="text-2xl font-extrabold">Ambassador Resources</h3>
            </div>
            <ul className="mt-3 space-y-2 text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Workshop slide deck template
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Social media graphics kit
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Event planning checklist
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Builder onboarding guide
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Monthly report template
              </li>
            </ul>
          </WobblyCard>
        </div>
      </div>
    </PlatformShell>
  );
}
