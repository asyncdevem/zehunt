import { Bell, GitBranch, Heart, MessageSquare, Sparkles, UserPlus } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const notifications = [
  {
    id: 'n1',
    type: 'new_follower',
    title: 'New Follower',
    body: 'Rohan Mehta (@rohanexec) started following you.',
    time: '10m ago',
    isRead: false,
    icon: UserPlus,
  },
  {
    id: 'n2',
    type: 'new_comment',
    title: 'New Comment',
    body: 'Mina Park commented on your update: "Great progress on the auto-tagging feature!"',
    time: '1h ago',
    isRead: false,
    icon: MessageSquare,
  },
  {
    id: 'n3',
    type: 'opportunity_match',
    title: 'Opportunity Match',
    body: 'You matched with a Staff Engineer role at a workflow automation startup. Fit score: 92.',
    time: '3h ago',
    isRead: false,
    icon: Sparkles,
  },
  {
    id: 'n4',
    type: 'new_reaction',
    title: 'Reaction',
    body: 'Rohan Mehta reacted 🔥 to your update on FlowPilot.',
    time: '5h ago',
    isRead: true,
    icon: Heart,
  },
  {
    id: 'n5',
    type: 'stage_transition',
    title: 'Stage Transition Recorded',
    body: 'FlowPilot moved from Beta to Growth. Your reputation score was updated.',
    time: '1d ago',
    isRead: true,
    icon: GitBranch,
  },
  {
    id: 'n6',
    type: 'score_change',
    title: 'Score Milestone',
    body: 'Your reputation score crossed 800. You are now in the top 5% of active builders.',
    time: '2d ago',
    isRead: true,
    icon: Bell,
  },
];

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <PlatformShell
      title="Notifications"
      subtitle="Activity updates from your profile — follows, comments, opportunities, and score changes."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>{unreadCount} Unread</StickyLabel>
        <RoughPill>Real-time</RoughPill>
        <div className="ml-auto">
          <WobblyButton variant="secondary">Mark All Read</WobblyButton>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map((notification, index) => {
          const Icon = notification.icon;
          return (
            <WobblyCard
              key={notification.id}
              className={notification.isRead ? 'bg-[#fdfbf7]' : 'bg-[#fff9c4]'}
              rotate={index % 2 === 0 ? 0.5 : -0.5}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center border-[2px] border-[#2d2d2d] ${notification.isRead ? 'bg-[#e5e0d8]' : 'bg-[#ff4d4d] text-white'}`}
                  style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                >
                  <Icon className="h-4 w-4" strokeWidth={2.8} />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-extrabold">{notification.title}</h3>
                    <span className="shrink-0 text-sm font-bold text-[#2d2d2d]/60">{notification.time}</span>
                  </div>
                  <p className="mt-0.5 text-base">{notification.body}</p>
                </div>
                {!notification.isRead && (
                  <span
                    className="mt-2 inline-block h-3 w-3 shrink-0 bg-[#ff4d4d]"
                    style={{ borderRadius: '50%' }}
                  />
                )}
              </div>
            </WobblyCard>
          );
        })}
      </div>
    </PlatformShell>
  );
}
