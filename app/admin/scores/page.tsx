import { BarChart3, RefreshCw, Save, SlidersHorizontal } from 'lucide-react';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const inputStyle = "w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg focus:border-[#2d5da1] focus:outline-none";
const inputRadius = { borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' };

const weights = [
  { label: 'Consistency', current: 30, description: 'Active days, update frequency, event streaks' },
  { label: 'Execution', current: 25, description: 'Product stage progression, shipped features, lifecycle transitions' },
  { label: 'Engagement Quality', current: 20, description: 'Meaningful comments, thread depth, feedback received' },
  { label: 'Outcome Signals', current: 15, description: 'Hiring, collaboration, funding interest' },
  { label: 'Social Proof', current: 10, description: 'Followers, reactions (low weight)' },
];

const distribution = [
  { range: '0-200', count: 12, bar: 8 },
  { range: '200-400', count: 28, bar: 19 },
  { range: '400-600', count: 45, bar: 31 },
  { range: '600-800', count: 38, bar: 26 },
  { range: '800-1000', count: 19, bar: 13 },
];

export default function AdminScoresPage() {
  return (
    <>
      <div className="mb-8">
        <StickyLabel>Score Calibration</StickyLabel>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Builder Score Engine</h1>
        <p className="mt-1 text-xl">Adjust scoring weights and monitor score distribution across the platform.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        {/* Weight Configuration */}
        <WobblyCard className="bg-white" rotate={0}>
          <div className="inline-flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
            <h2 className="text-2xl font-extrabold">Score Weights</h2>
          </div>
          <p className="mt-1 text-sm text-[#2d2d2d]/60">Weights must sum to 100%. Changes trigger a full recalculation.</p>

          <div className="mt-4 space-y-4">
            {weights.map((w) => (
              <div key={w.label}>
                <div className="mb-1 flex items-center justify-between">
                  <label className="text-lg font-bold">{w.label}</label>
                  <span className="text-sm font-bold text-[#2d5da1]">{w.current}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  defaultValue={w.current}
                  className="w-full accent-[#ff4d4d]"
                />
                <p className="text-sm text-[#2d2d2d]/60">{w.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <WobblyButton>
              <span className="inline-flex items-center gap-2">
                <Save className="h-4 w-4" strokeWidth={2.8} />
                Save Weights
              </span>
            </WobblyButton>
            <WobblyButton variant="secondary">
              <span className="inline-flex items-center gap-2">
                <RefreshCw className="h-4 w-4" strokeWidth={2.8} />
                Recalculate All Scores
              </span>
            </WobblyButton>
          </div>
        </WobblyCard>

        {/* Score Distribution */}
        <div className="space-y-4">
          <WobblyCard className="bg-[#fdfbf7]" rotate={0}>
            <div className="inline-flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
              <h3 className="text-2xl font-extrabold">Score Distribution</h3>
            </div>
            <div className="mt-4 space-y-3">
              {distribution.map((d) => (
                <div key={d.range}>
                  <div className="mb-1 flex items-center justify-between text-sm font-bold">
                    <span>{d.range}</span>
                    <span>{d.count} builders</span>
                  </div>
                  <div className="h-4 border-[2px] border-[#2d2d2d] bg-white">
                    <div className="h-full bg-[#ff4d4d]" style={{ width: `${d.bar}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <RoughPill>142 total builders</RoughPill>
              <RoughPill>Avg: 547</RoughPill>
              <RoughPill>Median: 512</RoughPill>
            </div>
          </WobblyCard>

          <WobblyCard className="bg-[#fff9c4]" rotate={0}>
            <h3 className="text-xl font-extrabold">Recalculation Info</h3>
            <ul className="mt-2 space-y-2 text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Scores recalculate automatically every hour via pg_cron.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Manual recalculation processes all builders immediately.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Weight changes affect all future calculations.
              </li>
            </ul>
          </WobblyCard>
        </div>
      </div>
    </>
  );
}
