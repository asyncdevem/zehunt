import { Activity, SlidersHorizontal, ShieldAlert } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyCard } from '@/app/components/handdrawn';

const tasks = [
  {
    title: 'Moderation Queue',
    detail: '12 updates need spam and integrity checks before feed boost.',
    action: 'Review Queue',
    icon: ShieldAlert,
  },
  {
    title: 'Event Monitoring',
    detail: 'PRODUCT_UPDATED and STAGE_CHANGED events are streaming normally.',
    action: 'Open Monitor',
    icon: Activity,
  },
  {
    title: 'Score Calibration',
    detail: 'Adjust execution weight from 25% to test scenario in sandbox.',
    action: 'Calibrate Weights',
    icon: SlidersHorizontal,
  },
];

export default function AdminPage() {
  return (
    <PlatformShell
      title="Admin Control"
      subtitle="Moderation, event monitoring, and scoring calibration for Zehunt integrity."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>System Integrity</StickyLabel>
        <RoughPill>Anti-spam</RoughPill>
        <RoughPill>Rate Limits</RoughPill>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task, index) => {
          const Icon = task.icon;
          return (
            <WobblyCard key={task.title} className="bg-white" rotate={index % 2 === 0 ? 1 : -1}>
              <span
                className="inline-flex h-9 w-9 items-center justify-center border-[2px] border-[#2d2d2d] bg-[#fff9c4]"
                style={{ borderRadius: '58% 42% 67% 33% / 42% 55% 45% 58%' }}
              >
                <Icon className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
              </span>
              <h2 className="mt-3 text-2xl font-extrabold">{task.title}</h2>
              <p className="mt-2 text-lg">{task.detail}</p>
              <button
                className="mt-4 h-11 border-[3px] border-[#2d2d2d] bg-[#e5e0d8] px-4 font-bold transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:text-white"
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', boxShadow: '4px 4px 0 0 #2d2d2d' }}
              >
                {task.action}
              </button>
            </WobblyCard>
          );
        })}
      </div>
    </PlatformShell>
  );
}
