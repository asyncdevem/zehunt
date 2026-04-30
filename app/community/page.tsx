import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Globe, GraduationCap, Mail, Megaphone, Users } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const universities = [
  { name: 'LUMS', city: 'Lahore', ambassadors: 3 },
  { name: 'NUST', city: 'Islamabad', ambassadors: 2 },
  { name: 'FAST-NUCES', city: 'Multiple', ambassadors: 4 },
  { name: 'IBA Karachi', city: 'Karachi', ambassadors: 1 },
  { name: 'GIKI', city: 'Topi', ambassadors: 1 },
  { name: 'ITU', city: 'Lahore', ambassadors: 2 },
];

const stats = [
  { label: 'Universities', value: '12', icon: GraduationCap },
  { label: 'Ambassadors', value: '28', icon: Users },
  { label: 'Countries', value: '4', icon: Globe },
  { label: 'Events Hosted', value: '15', icon: Megaphone },
];

export default function CommunityPage() {
  return (
    <PlatformShell
      title="Zehunt Community"
      subtitle="A global network of builders, ambassadors, and university chapters."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Community</StickyLabel>
        <RoughPill>Universities</RoughPill>
        <RoughPill>Ambassadors</RoughPill>
        <RoughPill>Global</RoughPill>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <WobblyCard key={stat.label} className="bg-white text-center" rotate={0}>
              <Icon className="mx-auto h-6 w-6 text-[#2d5da1]" strokeWidth={2.5} />
              <p className="mt-2 text-3xl font-extrabold">{stat.value}</p>
              <p className="text-sm font-bold text-[#2d2d2d]/60">{stat.label}</p>
            </WobblyCard>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Ambassador Program CTA */}
          <WobblyCard className="bg-[#fff9c4]" rotate={1}>
            <div className="inline-flex items-center gap-2">
              <Megaphone className="h-6 w-6 text-[#ff4d4d]" strokeWidth={2.5} />
              <h2 className="text-2xl font-extrabold">Ambassador Program</h2>
            </div>
            <p className="mt-2 text-lg">
              Represent Zehunt at your university. Host events, grow the builder community, and earn exclusive perks.
            </p>
            <ul className="mt-3 space-y-2 text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Verified Ambassador badge on your builder profile
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Early access to new features and beta programs
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Direct line to the Zehunt team for feedback and ideas
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Reputation boost for community leadership
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/community/ambassadors">
                <WobblyButton>
                  <span className="inline-flex items-center gap-2">
                    Apply as Ambassador
                    <ArrowRight className="h-4 w-4" strokeWidth={2.8} />
                  </span>
                </WobblyButton>
              </Link>
            </div>
          </WobblyCard>

          {/* University Chapters */}
          <WobblyCard className="bg-white" rotate={-1}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
                <h2 className="text-2xl font-extrabold">University Chapters</h2>
              </div>
              <RoughPill>{universities.length} active</RoughPill>
            </div>
            <div className="mt-4 space-y-2">
              {universities.map((uni) => (
                <div
                  key={uni.name}
                  className="flex items-center justify-between border-[2px] border-dashed border-[#2d2d2d] bg-[#fdfbf7] px-3 py-2"
                  style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                >
                  <div>
                    <p className="font-extrabold">{uni.name}</p>
                    <p className="text-sm">{uni.city}</p>
                  </div>
                  <RoughPill>{uni.ambassadors} ambassador{uni.ambassadors > 1 ? 's' : ''}</RoughPill>
                </div>
              ))}
            </div>
          </WobblyCard>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Newsletter Signup */}
          <WobblyCard className="bg-white" rotate={1}>
            <div className="inline-flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
              <h2 className="text-2xl font-extrabold">Stay Updated</h2>
            </div>
            <p className="mt-2 text-base">
              Get weekly updates on rising builders, platform news, and community events.
            </p>
            <form className="mt-3 space-y-3">
              <input
                type="email"
                placeholder="you@university.edu"
                className="w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none"
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
              />
              <WobblyButton className="w-full">
                <span className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" strokeWidth={2.8} />
                  Subscribe
                </span>
              </WobblyButton>
            </form>
            <p className="mt-2 text-xs text-[#2d2d2d]/50">No spam. Unsubscribe anytime.</p>
          </WobblyCard>

          {/* What Ambassadors Do */}
          <WobblyCard className="bg-[#fdfbf7]" rotate={-1}>
            <h3 className="text-xl font-extrabold">What Ambassadors Do</h3>
            <ul className="mt-2 space-y-2 text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                Host build-in-public workshops at their university
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                Onboard new builders and help them get started
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                Share platform feedback directly with the team
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                Organize hackathons and builder meetups
              </li>
            </ul>
          </WobblyCard>

          {/* Global Reach */}
          <WobblyCard className="bg-[#fff9c4]" rotate={0.5}>
            <h3 className="text-xl font-extrabold">Not Just Pakistan</h3>
            <p className="mt-2 text-base">
              Zehunt is a global platform. We welcome ambassadors from universities worldwide.
              If you&apos;re passionate about builder culture, apply regardless of location.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <RoughPill>🇵🇰 Pakistan</RoughPill>
              <RoughPill>🇮🇳 India</RoughPill>
              <RoughPill>🇹🇷 Turkey</RoughPill>
              <RoughPill>🇳🇬 Nigeria</RoughPill>
              <RoughPill>🌍 More coming</RoughPill>
            </div>
          </WobblyCard>
        </div>
      </div>
    </PlatformShell>
  );
}
