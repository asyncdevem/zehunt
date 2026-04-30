import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Camera, Wrench } from 'lucide-react';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const inputStyle = "w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none";
const inputRadius = { borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' };

const steps = [
  { number: 1, label: 'Role', active: false },
  { number: 2, label: 'Identity', active: true },
  { number: 3, label: 'Details', active: false },
];

export default function OnboardingIdentityPage() {
  return (
    <div className="min-h-screen text-[#2d2d2d] selection:bg-[#ff4d4d] selection:text-white">
      <header className="border-b-[3px] border-[#2d2d2d] bg-[#fdfbf7]/95">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image src="/zehunt-logo.png" alt="Zehunt" width={104} height={34} className="h-7 w-auto object-contain" />
          </Link>
          <span className="text-sm font-bold text-[#2d2d2d]/60">Step 2 of 3</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <StickyLabel>Profile Setup</StickyLabel>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Set Up Your Identity</h1>
          <p className="mt-2 max-w-2xl text-xl">This is how others will find and recognize you on Zehunt.</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center gap-2">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-center gap-2">
              <span
                className={`inline-flex h-9 w-9 items-center justify-center border-[2px] border-[#2d2d2d] text-sm font-bold ${step.active ? 'bg-[#ff4d4d] text-white' : i < 1 ? 'bg-[#2d5da1] text-white' : 'bg-[#e5e0d8] text-[#2d2d2d]/50'}`}
                style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
              >
                {i < 1 ? '✓' : step.number}
              </span>
              <span className={`text-base font-bold ${step.active || i < 1 ? '' : 'text-[#2d2d2d]/50'}`}>{step.label}</span>
              {i < steps.length - 1 && (
                <div className="mx-2 h-[2px] w-8 bg-[#2d2d2d]/20" />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <WobblyCard className="bg-white" rotate={1}>
            <h2 className="text-2xl font-extrabold">Your Profile</h2>

            <form className="mt-4 space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border-[3px] border-[#2d2d2d] bg-[#e5e0d8]"
                  style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                >
                  <Camera className="h-6 w-6 text-[#2d2d2d]/50" strokeWidth={2.8} />
                </div>
                <div>
                  <WobblyButton variant="secondary">Upload Avatar</WobblyButton>
                  <p className="mt-1 text-sm">Optional. You can add this later.</p>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-lg font-bold">Username</label>
                <input type="text" placeholder="ayeshabuilds" className={inputStyle} style={inputRadius} />
                <p className="mt-1 text-sm">Your unique handle on Zehunt. Choose carefully.</p>
              </div>

              <div>
                <label className="mb-1 block text-lg font-bold">Display Name</label>
                <input type="text" placeholder="Ayesha Khan" className={inputStyle} style={inputRadius} />
              </div>

              <div>
                <label className="mb-1 block text-lg font-bold">Bio</label>
                <textarea
                  rows={3}
                  placeholder="What are you building? What drives you?"
                  className={`${inputStyle} resize-none`}
                  style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
                />
              </div>

              <div>
                <label className="mb-1 block text-lg font-bold">Location</label>
                <input type="text" placeholder="Lahore, Pakistan" className={inputStyle} style={inputRadius} />
              </div>

              <div>
                <label className="mb-1 block text-lg font-bold">Company / Organization</label>
                <input type="text" placeholder="Acme Ventures (optional)" className={inputStyle} style={inputRadius} />
              </div>
            </form>
          </WobblyCard>

          <div className="space-y-4">
            <WobblyCard className="bg-[#fff9c4]" rotate={-1}>
              <h3 className="text-xl font-extrabold">Why This Matters</h3>
              <ul className="mt-2 space-y-2 text-base">
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                  Your profile is the root of your presence on Zehunt.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                  Bio and location help with opportunity matching.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                  A complete profile ranks higher in discovery.
                </li>
              </ul>
            </WobblyCard>

            <WobblyCard className="bg-[#fdfbf7]" rotate={1}>
              <div className="inline-flex items-center gap-2">
                <Wrench className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
                <h3 className="text-xl font-extrabold">Next Step</h3>
              </div>
              <div className="mt-2 text-base">
                <div className="flex items-center gap-2">
                  <RoughPill>Step 3</RoughPill>
                  <span>Add skills, links, and role-specific details</span>
                </div>
              </div>
            </WobblyCard>

            <div className="flex flex-wrap gap-3">
              <Link href="/onboarding/details">
                <WobblyButton>
                  <span className="inline-flex items-center gap-2">
                    Next: Details
                    <ArrowRight className="h-4 w-4" strokeWidth={2.8} />
                  </span>
                </WobblyButton>
              </Link>
              <Link href="/dashboard">
                <WobblyButton variant="secondary">Skip for Now</WobblyButton>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
