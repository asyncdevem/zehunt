import { notFound } from 'next/navigation';
import { Pencil, Save, Trash2 } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const inputStyle = "w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none";
const inputRadius = { borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <PlatformShell
      title="Edit Product"
      subtitle="Update your product details and stage. Your progress is tracked automatically."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Editing</StickyLabel>
        <RoughPill>Product #{id}</RoughPill>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <WobblyCard className="bg-white" rotate={1}>
          <div className="inline-flex items-center gap-2">
            <Pencil className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
            <h2 className="text-2xl font-extrabold">Product Details</h2>
          </div>

          <form className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-lg font-bold">Product Name</label>
              <input
                type="text"
                defaultValue="FlowPilot Core"
                className={inputStyle}
                style={inputRadius}
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Tagline</label>
              <input
                type="text"
                defaultValue="AI workflow engine for startup ops teams."
                className={inputStyle}
                style={inputRadius}
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Description</label>
              <textarea
                rows={4}
                defaultValue="Workflow automation workspace focused on reducing operational overhead for startup teams."
                className={`${inputStyle} resize-none`}
                style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Website URL</label>
              <input
                type="url"
                defaultValue="https://flowpilot.io"
                className={inputStyle}
                style={inputRadius}
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Product Logo</label>
              <div
                className="flex h-24 items-center justify-center border-[3px] border-dashed border-[#2d2d2d] bg-[#fdfbf7] text-base font-bold text-[#2d2d2d]/50"
                style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
              >
                Drop new logo here or click to replace
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <WobblyButton>
                <span className="inline-flex items-center gap-2">
                  <Save className="h-4 w-4" strokeWidth={2.8} />
                  Save Changes
                </span>
              </WobblyButton>
              <WobblyButton variant="secondary">Cancel</WobblyButton>
            </div>
          </form>
        </WobblyCard>

        <div className="space-y-4">
          <WobblyCard className="bg-[#fff9c4]" rotate={-1}>
            <h3 className="text-xl font-extrabold">Update Product Stage</h3>
            <p className="mt-1 text-base">Moving to a new stage updates your reputation score.</p>

            <div className="mt-3">
              <label className="mb-1 block text-lg font-bold">New Stage</label>
              <select
                className={inputStyle}
                style={inputRadius}
                defaultValue="growth"
              >
                <option value="idea">Idea</option>
                <option value="mvp">MVP</option>
                <option value="beta">Beta</option>
                <option value="growth">Growth</option>
              </select>
            </div>

            <div className="mt-3">
              <label className="mb-1 block text-lg font-bold">Transition Notes</label>
              <textarea
                rows={2}
                placeholder="What changed to justify this stage transition?"
                className={`${inputStyle} resize-none`}
                style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
              />
            </div>

            <div className="mt-3">
              <WobblyButton>Update Stage</WobblyButton>
            </div>
          </WobblyCard>

          <WobblyCard className="bg-white" rotate={1}>
            <h3 className="text-xl font-extrabold text-[#ff4d4d]">Danger Zone</h3>
            <p className="mt-1 text-base">Deleting a product removes it from your profile and stops lifecycle tracking. This cannot be undone.</p>
            <div className="mt-3">
              <button
                className="inline-flex h-12 items-center gap-2 border-[3px] border-[#ff4d4d] bg-white px-5 text-lg font-bold text-[#ff4d4d] transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#ff4d4d] hover:text-white active:translate-x-[4px] active:translate-y-[4px]"
                style={{
                  borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                  boxShadow: '4px 4px 0 0 #ff4d4d',
                }}
              >
                <Trash2 className="h-4 w-4" strokeWidth={2.8} />
                Delete Product
              </button>
            </div>
          </WobblyCard>
        </div>
      </div>
    </PlatformShell>
  );
}
