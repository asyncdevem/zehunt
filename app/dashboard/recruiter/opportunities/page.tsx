import Link from 'next/link';
import { Briefcase, Edit, Eye, Plus, Trash2, Users } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const openRoles = [
  {
    id: 'r1',
    title: 'Staff Engineer — Workflow Automation',
    description: 'Looking for a senior engineer with experience in AI/ML workflow systems and strong execution track record.',
    skills: ['TypeScript', 'AI/ML', 'PostgreSQL'],
    matches: 12,
    applicants: 3,
    status: 'Active',
    posted: 'Apr 15, 2026',
  },
  {
    id: 'r2',
    title: 'Backend Lead — API Infrastructure',
    description: 'Need a backend lead to own API reliability, observability, and deployment pipelines.',
    skills: ['Node.js', 'PostgreSQL', 'Docker', 'CI/CD'],
    matches: 8,
    applicants: 1,
    status: 'Active',
    posted: 'Apr 10, 2026',
  },
  {
    id: 'r3',
    title: 'Product Engineer — Growth',
    description: 'Full-stack product engineer to drive growth experiments and user activation.',
    skills: ['React', 'Next.js', 'Analytics'],
    matches: 15,
    applicants: 0,
    status: 'Draft',
    posted: 'Apr 28, 2026',
  },
];

export default function RecruiterOpportunitiesPage() {
  return (
    <PlatformShell
      title="Your Opportunities"
      subtitle="Manage hiring opportunities you've posted. Builders are matched based on execution score and skills."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Recruiter</StickyLabel>
        <RoughPill>{openRoles.filter((r) => r.status === 'Active').length} active</RoughPill>
        <RoughPill>{openRoles.reduce((sum, r) => sum + r.matches, 0)} total matches</RoughPill>
        <div className="ml-auto">
          <Link href="/dashboard/recruiter/opportunities/new">
            <WobblyButton>
              <span className="inline-flex items-center gap-2">
                <Plus className="h-4 w-4" strokeWidth={2.8} />
                Post Opportunity
              </span>
            </WobblyButton>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {openRoles.map((role, index) => (
          <WobblyCard key={role.id} className="bg-white" rotate={index % 2 === 0 ? 0.5 : -0.5}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
                  <h3 className="text-xl font-extrabold">{role.title}</h3>
                  <span
                    className={`inline-flex border-[2px] px-2.5 py-0.5 text-xs font-bold ${role.status === 'Active' ? 'border-green-600 bg-green-50 text-green-700' : 'border-[#2d2d2d]/40 bg-[#e5e0d8] text-[#2d2d2d]/60'}`}
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  >
                    {role.status}
                  </span>
                </div>
                <p className="mt-1 text-base">{role.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <RoughPill key={skill}>{skill}</RoughPill>
                  ))}
                </div>
                <p className="mt-2 text-sm text-[#2d2d2d]/60">Posted {role.posted}</p>
              </div>

              <div className="flex shrink-0 flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <div
                    className="border-[2px] border-[#2d2d2d] bg-[#fdfbf7] px-3 py-1 text-center"
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  >
                    <p className="text-lg font-extrabold">{role.matches}</p>
                    <p className="text-xs font-bold text-[#2d2d2d]/60">Matches</p>
                  </div>
                  <div
                    className="border-[2px] border-[#2d2d2d] bg-[#fdfbf7] px-3 py-1 text-center"
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  >
                    <p className="text-lg font-extrabold">{role.applicants}</p>
                    <p className="text-xs font-bold text-[#2d2d2d]/60">Applied</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="inline-flex h-9 w-9 items-center justify-center border-[2px] border-[#2d5da1] text-[#2d5da1] transition-colors hover:bg-[#2d5da1] hover:text-white"
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    aria-label="View matches"
                  >
                    <Users className="h-4 w-4" strokeWidth={2.8} />
                  </button>
                  <button
                    className="inline-flex h-9 w-9 items-center justify-center border-[2px] border-[#2d2d2d] text-[#2d2d2d] transition-colors hover:bg-[#2d5da1] hover:text-white"
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    aria-label="Edit opportunity"
                  >
                    <Edit className="h-4 w-4" strokeWidth={2.8} />
                  </button>
                  <button
                    className="inline-flex h-9 w-9 items-center justify-center border-[2px] border-[#ff4d4d] text-[#ff4d4d] transition-colors hover:bg-[#ff4d4d] hover:text-white"
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    aria-label="Delete opportunity"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={2.8} />
                  </button>
                </div>
              </div>
            </div>
          </WobblyCard>
        ))}
      </div>
    </PlatformShell>
  );
}
