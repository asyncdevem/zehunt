import { CheckCircle, Eye, ShieldAlert, Trash2, XCircle } from 'lucide-react';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const moderationQueue = [
  { id: 'm1', type: 'update', builder: 'newbuilder42', content: 'Check out my amazing product! Buy now at discount...', reason: 'Spam detection', severity: 'high', time: '5m ago' },
  { id: 'm2', type: 'update', builder: 'testuser99', content: 'Shipped a new feature that integrates with [suspicious link]', reason: 'Suspicious link', severity: 'medium', time: '20m ago' },
  { id: 'm3', type: 'comment', builder: 'anon_builder', content: 'This is terrible, you should quit building.', reason: 'Reported by user', severity: 'medium', time: '1h ago' },
  { id: 'm4', type: 'product', builder: 'spamaccount', content: 'Product: "FREE MONEY GENERATOR"', reason: 'Auto-flagged: spam keywords', severity: 'critical', time: '2h ago' },
];

const severityColors: Record<string, string> = {
  low: 'border-[#2d5da1] bg-[#2d5da1]/10 text-[#2d5da1]',
  medium: 'border-[#e5880a] bg-[#e5880a]/10 text-[#e5880a]',
  high: 'border-[#ff4d4d] bg-[#ff4d4d]/10 text-[#ff4d4d]',
  critical: 'border-[#ff4d4d] bg-[#ff4d4d] text-white',
};

export default function AdminModerationPage() {
  return (
    <>
      <div className="mb-8">
        <StickyLabel>Content Moderation</StickyLabel>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Moderation Queue</h1>
        <p className="mt-1 text-xl">Review flagged content. Approve, reject, or escalate.</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <RoughPill>{moderationQueue.length} items pending</RoughPill>
        <RoughPill>{moderationQueue.filter((m) => m.severity === 'critical').length} critical</RoughPill>
      </div>

      <div className="space-y-4">
        {moderationQueue.map((item, index) => (
          <WobblyCard key={item.id} className="bg-white" rotate={0}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
                  <RoughPill>{item.type}</RoughPill>
                  <span className="text-sm font-bold">@{item.builder}</span>
                  <span
                    className={`inline-flex border-[2px] px-2.5 py-0.5 text-xs font-bold ${severityColors[item.severity]}`}
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  >
                    {item.severity}
                  </span>
                </div>
                <span className="text-xs font-bold text-[#2d2d2d]/40">{item.time}</span>
              </div>

              <div
                className="border-[2px] border-dashed border-[#2d2d2d]/30 bg-[#fdfbf7] px-3 py-2 text-base"
                style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
              >
                {item.content}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-[#2d2d2d]/60">Reason: {item.reason}</p>
                <div className="flex gap-2">
                  <button
                    className="inline-flex h-9 items-center gap-1 border-[2px] border-green-600 bg-white px-3 text-sm font-bold text-green-600 transition-colors hover:bg-green-600 hover:text-white"
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  >
                    <CheckCircle className="h-3.5 w-3.5" strokeWidth={2.8} />
                    Approve
                  </button>
                  <button
                    className="inline-flex h-9 items-center gap-1 border-[2px] border-[#ff4d4d] bg-white px-3 text-sm font-bold text-[#ff4d4d] transition-colors hover:bg-[#ff4d4d] hover:text-white"
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  >
                    <XCircle className="h-3.5 w-3.5" strokeWidth={2.8} />
                    Reject
                  </button>
                  <button
                    className="inline-flex h-9 items-center gap-1 border-[2px] border-[#2d2d2d] bg-white px-3 text-sm font-bold text-[#2d2d2d] transition-colors hover:bg-[#2d2d2d] hover:text-white"
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  >
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={2.8} />
                    Delete + Ban
                  </button>
                </div>
              </div>
            </div>
          </WobblyCard>
        ))}
      </div>
    </>
  );
}
