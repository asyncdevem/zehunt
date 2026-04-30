import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Briefcase,
  Filter,
  Plus,
  Search,
  UserCheck,
  Users,
} from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';
import { builders } from '@/app/lib/platform-data';

const inputStyle = "w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 pl-12 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none";
const inputRadius = { borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' };

const hiringPipeline = [
  { builder: 'ayeshabuilds', name: 'Ayesha Khan', role: 'Staff Engineer', status: 'Shortlisted', fitScore: 92, avatar: builders[0].avatar },
  { builder: 'rohanexec', name: 'Rohan Mehta', role: 'Backend Lead', status: 'Contacted', fitScore: 88, avatar: builders[1].avatar },
  { builder: 'minaforward', name: 'Mina Park', role: 'Product Engineer', status: 'New Match', fitScore: 84, avatar: builders[2].avatar },
];

const openRoles = [
  { title: 'Staff Engineer — Workflow Automation', applicants: 12, status: 'Active', posted: '3d ago' },
  { title: 'Backend Lead — API Infrastructure', applicants: 8, status: 'Active', posted: '1w ago' },
];

const statusColors: Record<string, string> = {
  'Shortlisted': 'border-[#2d5da1] bg-[#2d5da1]/10 text-[#2d5da1]',
  'Contacted': 'border-[#e5880a] bg-[#e5880a]/10 text-[#e5880a]',
  'New Match': 'border-[#ff4d4d] bg-[#ff4d4d]/10 text-[#ff4d4d]',
};

export default function RecruiterDashboard() {
  return (
    <PlatformShell
      title="Recruiter Dashboard"
      subtitle="Find talented builders by their real progress, skills, and consistency."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Recruiter</StickyLabel>
        <RoughPill>Hire by Real Progress</RoughPill>
        <div className="ml-auto">
          <WobblyButton>
            <span className="inline-flex items-center gap-2">
              <Plus className="h-4 w-4" strokeWidth={2.8} />
              Post Opportunity
            </span>
          </WobblyButton>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#2d2d2d]/50" strokeWidth={2.8} />
          <input
            type="text"
            placeholder="Search builders by skills, tech stack, or name..."
            className={inputStyle}
            style={inputRadius}
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-1 text-sm font-bold text-[#2d5da1]">
            <Filter className="h-3.5 w-3.5" strokeWidth={2.8} />
            Filters:
          </button>
          <RoughPill>Score 700+</RoughPill>
          <RoughPill>TypeScript</RoughPill>
          <RoughPill>10+ day streak</RoughPill>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.2fr,0.8fr]">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Hiring Pipeline */}
          <WobblyCard className="bg-white" rotate={-1}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
                <h3 className="text-2xl font-extrabold">Hiring Pipeline</h3>
              </div>
              <RoughPill>{hiringPipeline.length} candidates</RoughPill>
            </div>
            <div className="mt-3 space-y-3">
              {hiringPipeline.map((candidate) => (
                <Link
                  key={candidate.builder}
                  href={`/builders/${candidate.builder}`}
                  className="flex items-center justify-between border-[2px] border-dashed border-[#2d2d2d] bg-[#fdfbf7] px-3 py-3 transition-colors hover:bg-[#fff9c4]"
                  style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="relative h-10 w-10 overflow-hidden border-[2px] border-[#2d2d2d]"
                      style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    >
                      <Image src={candidate.avatar} alt={candidate.name} fill sizes="40px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-extrabold">{candidate.name}</p>
                      <p className="text-sm">@{candidate.builder} · {candidate.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <RoughPill>Fit {candidate.fitScore}</RoughPill>
                    <span
                      className={`inline-flex border-[2px] px-2.5 py-0.5 text-xs font-bold ${statusColors[candidate.status] ?? ''}`}
                      style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    >
                      {candidate.status}
                    </span>
                    <ArrowRight className="h-4 w-4 text-[#2d5da1]" strokeWidth={2.8} />
                  </div>
                </Link>
              ))}
            </div>
          </WobblyCard>

          {/* Top Matches */}
          <WobblyCard className="bg-[#fff9c4]" rotate={1}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <Users className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
                <h3 className="text-2xl font-extrabold">Top Matches</h3>
              </div>
              <Link href="/search" className="text-sm font-bold text-[#2d5da1] underline underline-offset-2">
                Advanced Search
              </Link>
            </div>
            <p className="mt-1 text-sm text-[#2d2d2d]/60">Builders matching your open roles, ranked by execution score.</p>
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
                      <p className="text-sm">{builder.focus} · {builder.streak}</p>
                    </div>
                  </div>
                  <RoughPill>Score {builder.score}</RoughPill>
                </Link>
              ))}
            </div>
          </WobblyCard>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Open Roles */}
          <WobblyCard className="bg-white" rotate={1}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
                <h3 className="text-2xl font-extrabold">Your Open Roles</h3>
              </div>
              <RoughPill>{openRoles.length} active</RoughPill>
            </div>
            <div className="mt-3 space-y-3">
              {openRoles.map((role) => (
                <div
                  key={role.title}
                  className="border-[2px] border-dashed border-[#2d2d2d] bg-[#fdfbf7] px-3 py-2"
                  style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                >
                  <p className="font-extrabold">{role.title}</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <RoughPill>{role.applicants} matches</RoughPill>
                    <RoughPill>{role.status}</RoughPill>
                    <RoughPill>{role.posted}</RoughPill>
                  </div>
                </div>
              ))}
            </div>
          </WobblyCard>

          {/* Quick Stats */}
          <WobblyCard className="bg-[#fdfbf7]" rotate={-1}>
            <h3 className="text-xl font-extrabold">Recruiting Stats</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                { label: 'Open Roles', value: '2' },
                { label: 'Pipeline', value: '3' },
                { label: 'Contacted', value: '5' },
                { label: 'Profiles Viewed', value: '42' },
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

          {/* Tips */}
          <WobblyCard className="bg-[#fff9c4]" rotate={0.5}>
            <h3 className="text-xl font-extrabold">Hiring Tips</h3>
            <ul className="mt-2 space-y-2 text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Builders with 20+ day streaks show strong consistency.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Look at lifecycle transitions — BETA→GROWTH signals shipping ability.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Engagement score reflects collaboration quality.
              </li>
            </ul>
          </WobblyCard>
        </div>
      </div>
    </PlatformShell>
  );
}
