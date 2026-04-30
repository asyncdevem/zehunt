import { Briefcase, Send } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const inputStyle = "w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none";
const inputRadius = { borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' };

export default function NewOpportunityPage() {
  return (
    <PlatformShell
      title="Post Hiring Opportunity"
      subtitle="Describe the role and required skills. Zehunt will match you with builders based on execution data."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Recruiter</StickyLabel>
        <RoughPill>Execution-Based Matching</RoughPill>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <WobblyCard className="bg-white" rotate={1}>
          <div className="inline-flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
            <h2 className="text-2xl font-extrabold">Opportunity Details</h2>
          </div>

          <form className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-lg font-bold">Role Title</label>
              <input type="text" placeholder="Staff Engineer — Workflow Automation" className={inputStyle} style={inputRadius} />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Description</label>
              <textarea
                rows={4}
                placeholder="Describe the role, responsibilities, and what kind of builder you're looking for."
                className={`${inputStyle} resize-none`}
                style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Required Skills</label>
              <input type="text" placeholder="TypeScript, PostgreSQL, AI/ML (comma-separated)" className={inputStyle} style={inputRadius} />
              <p className="mt-1 text-sm">These are used to match builders by their skill tags.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-lg font-bold">Minimum Builder Score</label>
                <input type="number" placeholder="700" className={inputStyle} style={inputRadius} />
              </div>
              <div>
                <label className="mb-1 block text-lg font-bold">Location Preference</label>
                <select className={inputStyle} style={inputRadius} defaultValue="remote">
                  <option value="remote">Remote</option>
                  <option value="onsite">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Company</label>
              <input type="text" placeholder="Acme Corp" className={inputStyle} style={inputRadius} />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Compensation Range (optional)</label>
              <input type="text" placeholder="$120K - $180K" className={inputStyle} style={inputRadius} />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <WobblyButton>
                <span className="inline-flex items-center gap-2">
                  <Send className="h-4 w-4" strokeWidth={2.8} />
                  Post Opportunity
                </span>
              </WobblyButton>
              <WobblyButton variant="secondary">Save as Draft</WobblyButton>
            </div>
          </form>
        </WobblyCard>

        <div className="space-y-4">
          <WobblyCard className="bg-[#fff9c4]" rotate={-1}>
            <h3 className="text-xl font-extrabold">How Matching Works</h3>
            <ul className="mt-2 space-y-2 text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Builders are matched by skills, execution score, and consistency.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Fit scores are computed from skill overlap + activity signals.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Matched builders see your opportunity in their dashboard.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                No resumes — execution history is the signal.
              </li>
            </ul>
          </WobblyCard>

          <WobblyCard className="bg-[#fdfbf7]" rotate={1}>
            <h3 className="text-xl font-extrabold">Tips for Better Matches</h3>
            <ul className="mt-2 space-y-2 text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                Be specific with skills — &quot;Next.js&quot; matches better than &quot;JavaScript&quot;.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                Set a realistic minimum score — 600+ covers most active builders.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                Include compensation to attract higher-quality matches.
              </li>
            </ul>
          </WobblyCard>
        </div>
      </div>
    </PlatformShell>
  );
}
