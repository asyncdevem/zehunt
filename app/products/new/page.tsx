import { GitFork, Package, Sparkles, Users } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const inputStyle = "w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none";
const inputRadius = { borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' };

export default function NewProductPage() {
  return (
    <PlatformShell
      title="Create a New Product"
      subtitle="Add your products to show what you're building and track your progress."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>New Product</StickyLabel>
        <RoughPill>Progress Tracking</RoughPill>
        <RoughPill>Solo or Team</RoughPill>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <WobblyCard className="bg-white" rotate={1}>
          <div className="inline-flex items-center gap-2">
            <Package className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
            <h2 className="text-2xl font-extrabold">Product Details</h2>
          </div>

          <form className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-lg font-bold">Product Name</label>
              <input
                type="text"
                placeholder="FlowPilot"
                className={inputStyle}
                style={inputRadius}
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Tagline</label>
              <input
                type="text"
                placeholder="AI workflow engine for startup ops teams."
                className={inputStyle}
                style={inputRadius}
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Description</label>
              <textarea
                rows={4}
                placeholder="What does this product do? Who is it for? What problem does it solve?"
                className={`${inputStyle} resize-none`}
                style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Website URL</label>
              <input
                type="url"
                placeholder="https://flowpilot.io"
                className={inputStyle}
                style={inputRadius}
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Current Stage</label>
              <select
                className={inputStyle}
                style={inputRadius}
                defaultValue="idea"
              >
                <option value="idea">Idea</option>
                <option value="mvp">MVP</option>
                <option value="beta">Beta</option>
                <option value="growth">Growth</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Product Logo</label>
              <div
                className="flex h-24 items-center justify-center border-[3px] border-dashed border-[#2d2d2d] bg-[#fdfbf7] text-base font-bold text-[#2d2d2d]/50"
                style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
              >
                Drop logo here or click to upload
              </div>
              <p className="mt-1 text-sm">PNG, JPG, or SVG. Max 5MB.</p>
            </div>

            {/* Collaborative / Open Source Section */}
            <div className="border-t-[3px] border-dashed border-[#2d2d2d]/30 pt-4">
              <div className="inline-flex items-center gap-2">
                <GitFork className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
                <h3 className="text-xl font-extrabold">Collaboration</h3>
              </div>

              <div className="mt-3 space-y-4">
                {/* Collaborative Toggle */}
                <div
                  className="flex items-center justify-between border-[2px] border-[#2d2d2d] bg-[#fdfbf7] px-4 py-3"
                  style={{ borderRadius: '61% 39% 57% 43% / 40% 63% 37% 60%' }}
                >
                  <div>
                    <p className="text-lg font-bold">Team Project</p>
                    <p className="text-sm">Enable collaboration so multiple builders can contribute.</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="h-7 w-12 border-[2px] border-[#2d2d2d] bg-[#e5e0d8] after:absolute after:left-[3px] after:top-[3px] after:h-5 after:w-5 after:border-[2px] after:border-[#2d2d2d] after:bg-white after:transition-all peer-checked:bg-[#ff4d4d] peer-checked:after:translate-x-[18px]" style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }} />
                  </label>
                </div>

                {/* Repo URL */}
                <div>
                  <label className="mb-1 block text-lg font-bold">Repository URL (optional)</label>
                  <input
                    type="url"
                    placeholder="https://github.com/team/project"
                    className={inputStyle}
                    style={inputRadius}
                  />
                  <p className="mt-1 text-sm">Link your GitHub, GitLab, or other repo for open-source visibility.</p>
                </div>

                {/* Invite Team Members */}
                <div>
                  <label className="mb-1 block text-lg font-bold">Invite Team Members</label>
                  <input
                    type="text"
                    placeholder="Search by username (e.g. rohanexec, minaforward)"
                    className={inputStyle}
                    style={inputRadius}
                  />
                  <p className="mt-1 text-sm">You can invite more members after creating the product.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <WobblyButton>
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4" strokeWidth={2.8} />
                  Register Product
                </span>
              </WobblyButton>
              <WobblyButton variant="secondary">Save as Draft</WobblyButton>
            </div>
          </form>
        </WobblyCard>

        <div className="space-y-4">
          {/* Collaborative Info */}
          <WobblyCard className="bg-[#fff9c4]" rotate={-1}>
            <div className="inline-flex items-center gap-2">
              <Users className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
              <h3 className="text-xl font-extrabold">Team Projects</h3>
            </div>
            <ul className="mt-2 space-y-2 text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                Invite other builders to collaborate on a shared product.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                All team members earn reputation from the product&apos;s execution.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                Roles: <strong>Owner</strong> (full control), <strong>Maintainer</strong> (can invite &amp; manage), <strong>Contributor</strong> (can post updates).
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                Link a repo to show open-source activity alongside execution data.
              </li>
            </ul>
          </WobblyCard>

          <WobblyCard className="bg-white" rotate={1}>
            <h3 className="text-xl font-extrabold">How Products Work</h3>
            <ul className="mt-2 space-y-2 text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Products show what you&apos;ve built and your progress.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Each product tracks lifecycle stages: Idea → MVP → Beta → Growth.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                Stage transitions update your reputation score.
              </li>
            </ul>
          </WobblyCard>

          <WobblyCard className="bg-[#fdfbf7]" rotate={-1}>
            <h3 className="text-xl font-extrabold">Lifecycle Preview</h3>
            <div className="mt-3 space-y-2">
              {['IDEA', 'MVP', 'BETA', 'GROWTH'].map((stage, i) => (
                <div
                  key={stage}
                  className={`flex items-center justify-between border-[2px] px-3 py-2 font-bold ${i === 0 ? 'border-[#2d2d2d] bg-[#fff9c4]' : 'border-dashed border-[#2d2d2d]/40 text-[#2d2d2d]/40'}`}
                  style={{ borderRadius: '61% 39% 57% 43% / 40% 63% 37% 60%' }}
                >
                  <span>{stage}</span>
                  {i === 0 && <RoughPill>Current</RoughPill>}
                </div>
              ))}
            </div>
          </WobblyCard>
        </div>
      </div>
    </PlatformShell>
  );
}
