import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { WobblyCard, StickyLabel } from '@/app/components/handdrawn';
import { PlatformShell } from '@/app/components/platform-shell';

// In production, this would read the user's role from the session/database
// and redirect to the appropriate dashboard. For now, it shows a role selector.

const dashboards = [
  { role: 'builder', href: '/dashboard/builder', label: 'Builder Dashboard', color: 'bg-[#ff4d4d]' },
  { role: 'investor', href: '/dashboard/investor', label: 'Investor Dashboard', color: 'bg-[#2d5da1]' },
  { role: 'recruiter', href: '/dashboard/recruiter', label: 'Recruiter Dashboard', color: 'bg-[#e5880a]' },
];

export default function DashboardRedirect() {
  return (
    <PlatformShell
      title="Your Dashboard"
      subtitle="Select your dashboard view. In production, this redirects automatically based on your role."
    >
      <div className="mb-6">
        <StickyLabel>Your Dashboard</StickyLabel>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {dashboards.map((item, index) => (
          <Link key={item.role} href={item.href}>
            <WobblyCard className="bg-white cursor-pointer transition-all hover:scale-[1.02]" rotate={index === 1 ? -1 : 1}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center border-[2px] border-[#2d2d2d] ${item.color} text-white text-sm font-bold`}
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  >
                    {item.role[0].toUpperCase()}
                  </span>
                  <span className="text-xl font-extrabold">{item.label}</span>
                </div>
                <ArrowRight className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
              </div>
            </WobblyCard>
          </Link>
        ))}
      </div>
    </PlatformShell>
  );
}
