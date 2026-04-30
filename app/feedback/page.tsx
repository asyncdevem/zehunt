import { Bug, Lightbulb, MessageSquare, Send } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const inputStyle = "w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none";
const inputRadius = { borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' };

const reportTypes = [
  { value: 'bug', label: 'Bug Report', icon: Bug, description: 'Something is broken or not working as expected.' },
  { value: 'feedback', label: 'Feedback', icon: MessageSquare, description: 'General feedback about the platform experience.' },
  { value: 'feature', label: 'Feature Request', icon: Lightbulb, description: 'Suggest a new feature or improvement.' },
];

export default function FeedbackPage() {
  return (
    <PlatformShell
      title="Report an Issue"
      subtitle="Help us improve Zehunt. Report bugs, share feedback, or request features."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Beta Feedback</StickyLabel>
        <RoughPill>We read every report</RoughPill>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <WobblyCard className="bg-white" rotate={1}>
          <form className="space-y-4">
            {/* Report Type */}
            <div>
              <label className="mb-2 block text-lg font-bold">What type of report?</label>
              <div className="grid gap-3 sm:grid-cols-3">
                {reportTypes.map((type, index) => {
                  const Icon = type.icon;
                  return (
                    <label
                      key={type.value}
                      className="cursor-pointer border-[3px] border-[#2d2d2d] bg-[#fdfbf7] p-3 text-center transition-all hover:bg-[#fff9c4]"
                      style={{
                        borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px',
                        transform: `rotate(${index % 2 === 0 ? 0.5 : -0.5}deg)`,
                      }}
                    >
                      <input type="radio" name="type" value={type.value} className="sr-only" />
                      <Icon className="mx-auto h-6 w-6 text-[#ff4d4d]" strokeWidth={2.5} />
                      <p className="mt-1 text-sm font-bold">{type.label}</p>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Severity (for bugs) */}
            <div>
              <label className="mb-1 block text-lg font-bold">Severity</label>
              <select className={inputStyle} style={inputRadius} defaultValue="medium">
                <option value="low">Low — cosmetic or minor issue</option>
                <option value="medium">Medium — feature partially broken</option>
                <option value="high">High — feature completely broken</option>
                <option value="critical">Critical — data loss or security issue</option>
              </select>
            </div>

            {/* Page */}
            <div>
              <label className="mb-1 block text-lg font-bold">Which page?</label>
              <select className={inputStyle} style={inputRadius} defaultValue="">
                <option value="" disabled>Select the page where you found the issue</option>
                <option value="/">Home</option>
                <option value="/builders">Builders</option>
                <option value="/rankings">Rankings</option>
                <option value="/products">Products</option>
                <option value="/feed">Feed</option>
                <option value="/opportunities">Opportunities</option>
                <option value="/dashboard">Dashboard</option>
                <option value="/settings">Settings</option>
                <option value="/onboarding">Onboarding</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="mb-1 block text-lg font-bold">Title</label>
              <input
                type="text"
                placeholder="Brief summary of the issue"
                className={inputStyle}
                style={inputRadius}
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1 block text-lg font-bold">Description</label>
              <textarea
                rows={5}
                placeholder="Describe what happened, what you expected, and steps to reproduce (if applicable)."
                className={`${inputStyle} resize-none`}
                style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
              />
            </div>

            {/* Screenshot */}
            <div>
              <label className="mb-1 block text-lg font-bold">Screenshot (optional)</label>
              <div
                className="flex h-20 items-center justify-center border-[3px] border-dashed border-[#2d2d2d] bg-[#fdfbf7] text-base font-bold text-[#2d2d2d]/50"
                style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
              >
                Drop image here or click to upload
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <WobblyButton>
                <span className="inline-flex items-center gap-2">
                  <Send className="h-4 w-4" strokeWidth={2.8} />
                  Submit Report
                </span>
              </WobblyButton>
            </div>
          </form>
        </WobblyCard>

        {/* Sidebar */}
        <div className="space-y-4">
          <WobblyCard className="bg-[#fff9c4]" rotate={-1}>
            <h3 className="text-xl font-extrabold">Beta Notice</h3>
            <p className="mt-2 text-base">
              Zehunt is in beta. You will encounter rough edges, missing features, and occasional bugs.
              Your reports directly shape what we fix and build next. Thank you for being an early user.
            </p>
          </WobblyCard>

          <WobblyCard className="bg-[#fdfbf7]" rotate={1}>
            <h3 className="text-xl font-extrabold">What makes a good report?</h3>
            <ul className="mt-2 space-y-2 text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Clear title that summarizes the issue.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Steps to reproduce (what did you click?).
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                What you expected vs what happened.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                A screenshot if the issue is visual.
              </li>
            </ul>
          </WobblyCard>
        </div>
      </div>
    </PlatformShell>
  );
}
