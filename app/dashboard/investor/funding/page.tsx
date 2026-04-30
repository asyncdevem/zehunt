import Link from 'next/link';
import { ArrowRight, DollarSign, Send, TrendingUp, Wallet } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const pipeline = [
  { id: 'f1', builder: 'ayeshabuilds', product: 'FlowPilot', stage: 'GROWTH', fitScore: 92, status: 'In Review', amount: '$150K', sentAt: '1w ago' },
  { id: 'f2', builder: 'minaforward', product: 'PulseDesk', stage: 'BETA', fitScore: 84, status: 'Interest Sent', amount: '$75K', sentAt: '3d ago' },
  { id: 'f3', builder: 'rohanexec', product: 'Dockit Core', stage: 'BETA', fitScore: 88, status: 'Declined', amount: '$100K', sentAt: '2w ago' },
];

const statusStyles: Record<string, string> = {
  'In Review': 'border-[#2d5da1] bg-[#2d5da1]/10 text-[#2d5da1]',
  'Interest Sent': 'border-[#e5880a] bg-[#e5880a]/10 text-[#e5880a]',
  'Accepted': 'border-green-600 bg-green-50 text-green-700',
  'Declined': 'border-[#ff4d4d] bg-[#ff4d4d]/10 text-[#ff4d4d]',
};

export default function FundingPipelinePage() {
  return (
    <PlatformShell
      title="Funding Pipeline"
      subtitle="Track your funding interest expressions and their status across builders."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Investor</StickyLabel>
        <RoughPill>{pipeline.length} expressions</RoughPill>
        <div className="ml-auto">
          <Link href="/builders">
            <WobblyButton>
              <span className="inline-flex items-center gap-2">
                <Send className="h-4 w-4" strokeWidth={2.8} />
                Express Interest
              </span>
            </WobblyButton>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Total Sent', value: '3', icon: Send },
          { label: 'In Review', value: '1', icon: TrendingUp },
          { label: 'Accepted', value: '0', icon: DollarSign },
          { label: 'Total Amount', value: '$325K', icon: Wallet },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <WobblyCard key={stat.label} className="bg-[#fdfbf7] text-center" rotate={0}>
              <Icon className="mx-auto h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
              <p className="mt-1 text-2xl font-extrabold">{stat.value}</p>
              <p className="text-sm font-bold text-[#2d2d2d]/60">{stat.label}</p>
            </WobblyCard>
          );
        })}
      </div>

      {/* Pipeline List */}
      <div className="space-y-4">
        {pipeline.map((item, index) => (
          <WobblyCard key={item.id} className="bg-white" rotate={index % 2 === 0 ? 0.5 : -0.5}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-extrabold">{item.product}</h3>
                  <RoughPill>{item.stage}</RoughPill>
                  <span
                    className={`inline-flex border-[2px] px-2.5 py-0.5 text-xs font-bold ${statusStyles[item.status] ?? ''}`}
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-sm">@{item.builder} · Fit Score {item.fitScore} · Sent {item.sentAt}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl font-extrabold text-[#2d5da1]">{item.amount}</span>
                <Link href={`/builders/${item.builder}`}>
                  <button
                    className="inline-flex h-9 w-9 items-center justify-center border-[2px] border-[#2d5da1] text-[#2d5da1] transition-colors hover:bg-[#2d5da1] hover:text-white"
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    aria-label="View builder"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={2.8} />
                  </button>
                </Link>
              </div>
            </div>
          </WobblyCard>
        ))}
      </div>
    </PlatformShell>
  );
}
