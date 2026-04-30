import Image from 'next/image';
import Link from 'next/link';
import { Link as LinkIcon, Rocket, Wrench } from 'lucide-react';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const inputStyle = "w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none";
const inputRadius = { borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' };

const steps = [
  { number: 1, label: 'Role', active: false },
  { number: 2, label: 'Identity', active: false },
  { number: 3, label: 'Details', active: true },
];

export default function OnboardingDetailsPage() {
  return (
    <div className="min-h-screen text-[#2d2d2d] selection:bg-[#ff4d4d] selection:text-white">
      <header className="border-b-[3px] border-[#2d2d2d] bg-[#fdfbf7]/95">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image src="/zehunt-logo.png" alt="Zehunt" width={104} height={34} className="h-7 w-auto object-contain" />
          </Link>
          <span className="text-sm font-bold text-[#2d2d2d]/60">Step 3 of 3</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <StickyLabel>Almost done</StickyLabel>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Add Your Details</h1>
          <p className="mt-2 max-w-2xl text-xl">Skills, links, and interests help us match you with the right people and opportunities.</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center gap-2">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-center gap-2">
              <span
                className={`inline-flex h-9 w-9 items-center justify-center border-[2px] border-[#2d2d2d] text-sm font-bold ${step.active ? 'bg-[#ff4d4d] text-white' : i < 2 ? 'bg-[#2d5da1] text-white' : 'bg-[#e5e0d8] text-[#2d2d2d]/50'}`}
                style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
              >
                {i < 2 ? '✓' : step.number}
              </span>
              <span className={`text-base font-bold ${step.active || i < 2 ? '' : 'text-[#2d2d2d]/50'}`}>{step.label}</span>
              {i < steps.length - 1 && (
                <div className="mx-2 h-[2px] w-8 bg-[#2d2d2d]/20" />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-6">
            {/* Skills */}
            <WobblyCard className="bg-white" rotate={1}>
              <div className="inline-flex items-center gap-2">
                <Wrench className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
                <h2 className="text-2xl font-extrabold">Skills &amp; Interests</h2>
              </div>
              <p className="mt-1 text-base">Comma-separated tags. These feed discovery and opportunity matching.</p>

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Next.js, TypeScript, PostgreSQL, AI/ML, SaaS"
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

            {/* Links */}
            <WobblyCard className="bg-white" rotate={-1}>
              <div className="inline-flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
                <h2 className="text-2xl font-extrabold">Links</h2>
              </div>

              <div className="mt-3 space-y-4">
                <div>
                  <label className="mb-1 block text-lg font-bold">GitHub</label>
                  <input type="url" placeholder="https://github.com/username" className={inputStyle} style={inputRadius} />
                </div>
                <div>
                  <label className="mb-1 block text-lg font-bold">LinkedIn</label>
                  <input type="url" placeholder="https://linkedin.com/in/username" className={inputStyle} style={inputRadius} />
                </div>
                <div>
                  <label className="mb-1 block text-lg font-bold">Twitter / X</label>
                  <input type="url" placeholder="https://x.com/username" className={inputStyle} style={inputRadius} />
                </div>
                <div>
                  <label className="mb-1 block text-lg font-bold">Website</label>
                  <input type="url" placeholder="https://yoursite.com" className={inputStyle} style={inputRadius} />
                </div>
              </div>
            </WobblyCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <WobblyCard className="bg-[#fff9c4]" rotate={-1}>
              <h3 className="text-xl font-extrabold">You&apos;re all set!</h3>
              <p className="mt-2 text-base">
                After this step, you&apos;ll land on your personalized dashboard based on your role.
                You can always update your profile, skills, and links from settings.
              </p>
            </WobblyCard>

            <WobblyCard className="bg-[#fdfbf7]" rotate={1}>
              <h3 className="text-xl font-extrabold">What happens next?</h3>
              <ul className="mt-2 space-y-2 text-base">
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                  <strong>Builders:</strong> Register your first product and post an update.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                  <strong>Investors:</strong> Browse rising builders and start your watchlist.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#e5880a]" style={{ borderRadius: '50%' }} />
                  <strong>Recruiters:</strong> Search builders by skills and post your first opportunity.
                </li>
              </ul>
            </WobblyCard>

            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard">
                <WobblyButton>
                  <span className="inline-flex items-center gap-2">
                    <Rocket className="h-4 w-4" strokeWidth={2.8} />
                    Go to Dashboard
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
