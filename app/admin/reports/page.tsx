import { Bug, CheckCircle, Clock, Eye, MessageSquare, XCircle } from 'lucide-react';
import { RoughPill, StickyLabel, WobblyCard } from '@/app/components/handdrawn';

const reports = [
  { id: 'r1', type: 'bug', severity: 'critical', title: 'Login fails with GitHub OAuth on mobile', page: '/login', user: 'ayeshabuilds', status: 'open', time: '1h ago' },
  { id: 'r2', type: 'bug', severity: 'high', title: 'Score not updating after posting update', page: '/dashboard/builder', user: 'rohanexec', status: 'in_progress', time: '3h ago' },
  { id: 'r3', type: 'feature_request', severity: 'medium', title: 'Add dark mode support', page: '/', user: 'minaforward', status: 'open', time: '1d ago' },
  { id: 'r4', type: 'feedback', severity: 'low', title: 'Onboarding flow feels too long', page: '/onboarding', user: 'sarahcodes', status: 'open', time: '2d ago' },
  { id: 'r5', type: 'bug', severity: 'medium', title: 'Product logo upload shows wrong preview', page: '/products/new', user: 'newbuilder42', status: 'resolved', time: '3d ago' },
];

const severityColors: Record<string, string> = {
  low: 'border-[#2d5da1] bg-[#2d5da1]/10 text-[#2d5da1]',
  medium: 'border-[#e5880a] bg-[#e5880a]/10 text-[#e5880a]',
  high: 'border-[#ff4d4d] bg-[#ff4d4d]/10 text-[#ff4d4d]',
  critical: 'border-[#ff4d4d] bg-[#ff4d4d] text-white',
};

const statusIcons: Record<string, typeof Clock> = {
  open: Clock,
  in_progress: Eye,
  resolved: CheckCircle,
  closed: XCircle,
};

const typeIcons: Record<string, typeof Bug> = {
  bug: Bug,
  feedback: MessageSquare,
  feature_request: MessageSquare,
};

export default function AdminReportsPage() {
  return (
    <>
      <div className="mb-8">
        <StickyLabel>Bug Reports &amp; Feedback</StickyLabel>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">User Reports</h1>
        <p className="mt-1 text-xl">Review and manage bug reports, feedback, and feature requests from users.</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Open', value: String(reports.filter((r) => r.status === 'open').length) },
          { label: 'In Progress', value: String(reports.filter((r) => r.status === 'in_progress').length) },
          { label: 'Resolved', value: String(reports.filter((r) => r.status === 'resolved').length) },
          { label: 'Critical', value: String(reports.filter((r) => r.severity === 'critical').length) },
        ].map((stat) => (
          <WobblyCard key={stat.label} className="bg-white text-center" rotate={0}>
            <p className="text-2xl font-extrabold">{stat.value}</p>
            <p className="text-sm font-bold text-[#2d2d2d]/60">{stat.label}</p>
          </WobblyCard>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {reports.map((report) => {
          const TypeIcon = typeIcons[report.type] ?? Bug;
          const StatusIcon = statusIcons[report.status] ?? Clock;
          return (
            <WobblyCard key={report.id} className="bg-white" rotate={0}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center border-[2px] border-[#2d2d2d] bg-[#fdfbf7]"
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  >
                    <TypeIcon className="h-4 w-4 text-[#ff4d4d]" strokeWidth={2.8} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold">{report.title}</h3>
                      <span
                        className={`inline-flex border-[2px] px-2 py-0.5 text-xs font-bold ${severityColors[report.severity]}`}
                        style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                      >
                        {report.severity}
                      </span>
                    </div>
                    <p className="text-sm text-[#2d2d2d]/60">
                      {report.type.replace('_', ' ')} · {report.page} · @{report.user} · {report.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    className="border-[2px] border-[#2d2d2d] bg-white px-2 py-1 text-sm font-bold focus:outline-none"
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    defaultValue={report.status}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            </WobblyCard>
          );
        })}
      </div>
    </>
  );
}
