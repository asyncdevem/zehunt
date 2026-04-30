import { Mail, Send, Users } from 'lucide-react';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const inputStyle = "w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none";
const inputRadius = { borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' };

const recentEmails = [
  { subject: 'Zehunt Beta Launch — Welcome!', sent: 'Apr 20, 2026', recipients: 142, opened: 89, clicked: 34 },
  { subject: 'Weekly Builder Spotlight: Ayesha Khan', sent: 'Apr 27, 2026', recipients: 156, opened: 102, clicked: 45 },
];

const subscriberStats = [
  { label: 'Total Subscribers', value: '186' },
  { label: 'Platform Users', value: '142' },
  { label: 'Newsletter Only', value: '44' },
  { label: 'Ambassadors', value: '28' },
];

export default function AdminNewsletterPage() {
  return (
    <>
      <div className="mb-8">
        <StickyLabel>Email &amp; Newsletter</StickyLabel>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Newsletter Management</h1>
        <p className="mt-1 text-xl">Compose and send email updates to subscribers, users, and ambassadors.</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {subscriberStats.map((stat) => (
          <WobblyCard key={stat.label} className="bg-white text-center" rotate={0}>
            <p className="text-2xl font-extrabold">{stat.value}</p>
            <p className="text-sm font-bold text-[#2d2d2d]/60">{stat.label}</p>
          </WobblyCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        {/* Compose Email */}
        <WobblyCard className="bg-white" rotate={0}>
          <div className="inline-flex items-center gap-2">
            <Mail className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
            <h2 className="text-2xl font-extrabold">Compose Email</h2>
          </div>

          <form className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-lg font-bold">Audience</label>
              <select className={inputStyle} style={inputRadius} defaultValue="all">
                <option value="all">All Subscribers (186)</option>
                <option value="users">Platform Users Only (142)</option>
                <option value="builders">Builders Only (98)</option>
                <option value="investors">Investors Only (24)</option>
                <option value="recruiters">Recruiters Only (20)</option>
                <option value="ambassadors">Ambassadors Only (28)</option>
                <option value="newsletter">Newsletter-Only Subscribers (44)</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Subject Line</label>
              <input type="text" placeholder="Weekly Builder Spotlight: Rising Stars" className={inputStyle} style={inputRadius} />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Preview Text</label>
              <input type="text" placeholder="This week's top builders and platform updates..." className={inputStyle} style={inputRadius} />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Email Body</label>
              <textarea
                rows={10}
                placeholder="Write your email content here. Supports basic formatting.&#10;&#10;You can include:&#10;- Builder spotlights&#10;- Platform updates&#10;- Community events&#10;- New feature announcements"
                className={`${inputStyle} resize-none`}
                style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <WobblyButton>
                <span className="inline-flex items-center gap-2">
                  <Send className="h-4 w-4" strokeWidth={2.8} />
                  Send Email
                </span>
              </WobblyButton>
              <WobblyButton variant="secondary">Send Test Email</WobblyButton>
              <WobblyButton variant="secondary">Save as Draft</WobblyButton>
            </div>
          </form>
        </WobblyCard>

        {/* Recent Emails */}
        <div className="space-y-4">
          <WobblyCard className="bg-[#fdfbf7]" rotate={0}>
            <div className="inline-flex items-center gap-2">
              <Users className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
              <h3 className="text-2xl font-extrabold">Recent Emails</h3>
            </div>
            <div className="mt-3 space-y-3">
              {recentEmails.map((email) => (
                <div
                  key={email.subject}
                  className="border-[2px] border-dashed border-[#2d2d2d] bg-white px-3 py-3"
                  style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                >
                  <p className="font-extrabold">{email.subject}</p>
                  <p className="text-sm text-[#2d2d2d]/60">Sent {email.sent}</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <p className="text-lg font-extrabold">{email.recipients}</p>
                      <p className="text-xs font-bold text-[#2d2d2d]/60">Sent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-extrabold">{email.opened}</p>
                      <p className="text-xs font-bold text-[#2d2d2d]/60">Opened</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-extrabold">{email.clicked}</p>
                      <p className="text-xs font-bold text-[#2d2d2d]/60">Clicked</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </WobblyCard>

          <WobblyCard className="bg-[#fff9c4]" rotate={0}>
            <h3 className="text-xl font-extrabold">Email Tips</h3>
            <ul className="mt-2 space-y-2 text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Keep subject lines under 50 characters for mobile.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Always send a test email to yourself first.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Include a clear CTA (e.g., &quot;View Builder Profile&quot;).
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Best send times: Tuesday/Thursday 10am local.
              </li>
            </ul>
          </WobblyCard>
        </div>
      </div>
    </>
  );
}
