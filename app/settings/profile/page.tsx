import { Camera, Link as LinkIcon, Save, Wrench } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const inputStyle = "w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none";
const inputRadius = { borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' };

export default function ProfileSettingsPage() {
  return (
    <PlatformShell
      title="Edit Profile"
      subtitle="Keep your profile current. This helps us match you with the right opportunities."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Your Profile</StickyLabel>
        <RoughPill>Builder Profile</RoughPill>
      </div>

      <form className="grid gap-6 lg:grid-cols-[1fr,1.2fr]">
        <WobblyCard className="bg-white" rotate={-1}>
          <h2 className="text-2xl font-extrabold">Avatar &amp; Identity</h2>

          <div className="mt-4 flex items-center gap-4">
            <div
              className="relative flex h-20 w-20 items-center justify-center overflow-hidden border-[3px] border-[#2d2d2d] bg-[#e5e0d8]"
              style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
            >
              <Camera className="h-6 w-6 text-[#2d2d2d]/50" strokeWidth={2.8} />
            </div>
            <div>
              <WobblyButton variant="secondary">Upload Photo</WobblyButton>
              <p className="mt-1 text-sm">PNG, JPG, or WebP. Max 5MB.</p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-lg font-bold">Display Name</label>
              <input
                type="text"
                placeholder="Ayesha Khan"
                className={inputStyle}
                style={inputRadius}
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Username</label>
              <input
                type="text"
                placeholder="ayeshabuilds"
                className={inputStyle}
                style={inputRadius}
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Location</label>
              <input
                type="text"
                placeholder="Lahore, Pakistan"
                className={inputStyle}
                style={inputRadius}
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Bio</label>
              <textarea
                rows={3}
                placeholder="What are you building and why?"
                className={`${inputStyle} resize-none`}
                style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
              />
            </div>
          </div>
        </WobblyCard>

        <div className="space-y-6">
          <WobblyCard className="bg-[#fff9c4]" rotate={1}>
            <div className="inline-flex items-center gap-2">
              <Wrench className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
              <h2 className="text-2xl font-extrabold">Skills &amp; Tech Stack</h2>
            </div>
            <p className="mt-1 text-base">Comma-separated tags. These help us match you with opportunities.</p>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Next.js, TypeScript, PostgreSQL, AI/ML"
                className={inputStyle}
                style={inputRadius}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <RoughPill>Next.js</RoughPill>
              <RoughPill>TypeScript</RoughPill>
              <RoughPill>PostgreSQL</RoughPill>
              <RoughPill>AI/ML</RoughPill>
            </div>
          </WobblyCard>

          <WobblyCard className="bg-white" rotate={-1}>
            <div className="inline-flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
              <h2 className="text-2xl font-extrabold">Links</h2>
            </div>

            <div className="mt-3 space-y-4">
              <div>
                <label className="mb-1 block text-lg font-bold">GitHub</label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  className={inputStyle}
                  style={inputRadius}
                />
              </div>
              <div>
                <label className="mb-1 block text-lg font-bold">LinkedIn</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  className={inputStyle}
                  style={inputRadius}
                />
              </div>
              <div>
                <label className="mb-1 block text-lg font-bold">Twitter / X</label>
                <input
                  type="url"
                  placeholder="https://x.com/username"
                  className={inputStyle}
                  style={inputRadius}
                />
              </div>
              <div>
                <label className="mb-1 block text-lg font-bold">Website</label>
                <input
                  type="url"
                  placeholder="https://yoursite.com"
                  className={inputStyle}
                  style={inputRadius}
                />
              </div>
            </div>
          </WobblyCard>

          <div className="flex flex-wrap gap-3">
            <WobblyButton>
              <span className="inline-flex items-center gap-2">
                <Save className="h-4 w-4" strokeWidth={2.8} />
                Save Profile
              </span>
            </WobblyButton>
            <WobblyButton variant="secondary">Cancel</WobblyButton>
          </div>
        </div>
      </form>
    </PlatformShell>
  );
}
