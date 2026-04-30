import { Activity, Filter, RefreshCw } from 'lucide-react';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const events = [
  { id: 'e1', type: 'PRODUCT_CREATED', builder: 'newbuilder42', entity: 'PixelForge', time: '2m ago', metadata: '{}' },
  { id: 'e2', type: 'STAGE_CHANGED', builder: 'ayeshabuilds', entity: 'FlowPilot', time: '8m ago', metadata: 'BETA → GROWTH' },
  { id: 'e3', type: 'UPDATE_POSTED', builder: 'rohanexec', entity: 'Dockit Core', time: '15m ago', metadata: 'shipped_feature' },
  { id: 'e4', type: 'FOLLOWED', builder: 'minaforward', entity: 'ayeshabuilds', time: '22m ago', metadata: '' },
  { id: 'e5', type: 'TEAM_JOINED', builder: 'sarahcodes', entity: 'FlowPilot', time: '1h ago', metadata: 'contributor' },
  { id: 'e6', type: 'COMMENT_RECEIVED', builder: 'rohanexec', entity: 'update_u1', time: '1h ago', metadata: '' },
  { id: 'e7', type: 'SCORE_MILESTONE', builder: 'ayeshabuilds', entity: '', time: '2h ago', metadata: 'Crossed 800' },
  { id: 'e8', type: 'OPPORTUNITY_UNLOCKED', builder: 'minaforward', entity: 'Funding Interest', time: '3h ago', metadata: 'fit_score: 84' },
  { id: 'e9', type: 'PRODUCT_UPDATED', builder: 'newbuilder42', entity: 'PixelForge', time: '4h ago', metadata: 'description changed' },
  { id: 'e10', type: 'TEAM_INVITED', builder: 'ayeshabuilds', entity: 'FlowPilot', time: '5h ago', metadata: 'invited sarahcodes' },
];

const typeColors: Record<string, string> = {
  PRODUCT_CREATED: 'bg-[#2d5da1]',
  STAGE_CHANGED: 'bg-[#ff4d4d]',
  UPDATE_POSTED: 'bg-[#e5880a]',
  FOLLOWED: 'bg-[#2d2d2d]',
  TEAM_JOINED: 'bg-green-600',
  TEAM_INVITED: 'bg-green-600',
  COMMENT_RECEIVED: 'bg-[#2d5da1]',
  SCORE_MILESTONE: 'bg-[#ff4d4d]',
  OPPORTUNITY_UNLOCKED: 'bg-[#e5880a]',
  PRODUCT_UPDATED: 'bg-[#2d5da1]',
};

export default function AdminEventsPage() {
  return (
    <>
      <div className="mb-8">
        <StickyLabel>Event Monitor</StickyLabel>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Builder Event Stream</h1>
        <p className="mt-1 text-xl">Real-time view of all platform activity. The single source of truth.</p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <WobblyButton variant="secondary">
          <span className="inline-flex items-center gap-2">
            <RefreshCw className="h-4 w-4" strokeWidth={2.8} />
            Refresh
          </span>
        </WobblyButton>
        <WobblyButton variant="secondary">
          <span className="inline-flex items-center gap-2">
            <Filter className="h-4 w-4" strokeWidth={2.8} />
            Filter Events
          </span>
        </WobblyButton>
        <RoughPill>{events.length} events shown</RoughPill>
      </div>

      <WobblyCard className="bg-white" rotate={0}>
        <div className="space-y-0">
          {events.map((event, i) => (
            <div
              key={event.id}
              className={`flex items-center gap-3 py-3 ${i < events.length - 1 ? 'border-b border-dashed border-[#2d2d2d]/20' : ''}`}
            >
              <span
                className={`inline-flex h-2.5 w-2.5 shrink-0 ${typeColors[event.type] ?? 'bg-[#2d2d2d]'}`}
                style={{ borderRadius: '50%' }}
              />
              <div className="flex flex-1 items-center justify-between">
                <div className="flex items-center gap-2">
                  <RoughPill>{event.type}</RoughPill>
                  <span className="text-sm font-bold">@{event.builder}</span>
                  {event.entity && <span className="text-sm text-[#2d2d2d]/60">→ {event.entity}</span>}
                  {event.metadata && <span className="text-xs text-[#2d2d2d]/40">({event.metadata})</span>}
                </div>
                <span className="shrink-0 text-xs font-bold text-[#2d2d2d]/40">{event.time}</span>
              </div>
            </div>
          ))}
        </div>
      </WobblyCard>
    </>
  );
}
