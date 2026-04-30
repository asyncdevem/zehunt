import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

export default function NewUpdatePage() {
  return (
    <PlatformShell
      title="Share an Update"
      subtitle="Share what you've accomplished. This updates your reputation and helps match you with opportunities."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Share Your Progress</StickyLabel>
        <RoughPill>Substance over hype</RoughPill>
      </div>

      <WobblyCard className="bg-white max-w-3xl" rotate={1}>
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-lg font-bold">Update Type</label>
            <select
              className="w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg focus:border-[#2d5da1] focus:outline-none"
              style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
              defaultValue="shipped feature"
            >
              <option value="shipped feature">Shipped Feature</option>
              <option value="stage change">Stage Change</option>
              <option value="milestone reached">Milestone Reached</option>
              <option value="lesson learned">Lesson Learned</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-lg font-bold">Product</label>
            <input
              placeholder="FlowPilot"
              className="w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none"
              style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
            />
          </div>

          <div>
            <label className="mb-1 block text-lg font-bold">What did you execute?</label>
            <textarea
              rows={5}
              placeholder="Describe what you shipped, the results, and how it moved your product forward."
              className="w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none"
              style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <WobblyButton>Publish Update</WobblyButton>
            <WobblyButton variant="secondary">Save Draft</WobblyButton>
          </div>
        </form>
      </WobblyCard>
    </PlatformShell>
  );
}
