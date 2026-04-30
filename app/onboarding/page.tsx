import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  Camera,
  Code2,
  TrendingUp,
} from 'lucide-react';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const inputStyle = "w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none";
const inputRadius = { borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' };

const steps = [
  { number: 1, label: 'Role', active: true },
  { number: 2, label: 'Identity', active: false },
  { number: 3, label: 'Details', active: false },
];

const roles = [
  {
    id: 'builder',
    title: 'Builder',
    icon: Code2,
    description: 'I build products and want to track my progress, grow reputation, and find opportunities.',
    perks: ['Create products & post updates', 'Earn reputation score', 'Get matched to opportunities'],
    color: 'bg-[#ff4d4d]',
  },
  {
    id: 'investor',
    title: 'Investor',
    icon: TrendingUp,
    description: 'I invest in startups and want to discover talented builders based on real progress.',
    perks: ['Track builder execution over time', 'Discover rising talent early', 'Express funding interest'],
    color: 'bg-[#2d5da1]',
  },
  {
    id: 'recruiter',
    title: 'Recruiter',
    icon: Briefcase,
    description: 'I hire talent and want to find builders by their real progress, skills, and consistency.',
    perks: ['Search builders by skills & score', 'Post hiring opportunities', 'Track candidate pipeline'],
    color: 'bg-[#e5880a]',
  },
];

export default function OnboardingPage() {
  return (
    <div className="min-h-screen text-[#2d2d2d] selection:bg-[#ff4d4d] selection:text-white">
      <header className="border-b-[3px] border-[#2d2d2d] bg-[#fdfbf7]/95">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image src="/zehunt-logo.png" alt="Zehunt" width={104} height={34} className="h-7 w-auto object-contain" />
          </Link>
          <span className="text-sm font-bold text-[#2d2d2d]/60">Step 1 of 3</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <StickyLabel>Welcome to Zehunt</StickyLabel>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">How will you use Zehunt?</h1>
          <p className="mt-2 max-w-2xl text-xl">Choose your role. This determines your dashboard and what you can do on the platform. You can change this once later.</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center gap-2">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-center gap-2">
              <span
                className={`inline-flex h-9 w-9 items-center justify-center border-[2px] border-[#2d2d2d] text-sm font-bold ${step.active ? 'bg-[#ff4d4d] text-white' : 'bg-[#e5e0d8] text-[#2d2d2d]/50'}`}
                style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
              >
                {step.number}
              </span>
              <span className={`text-base font-bold ${step.active ? '' : 'text-[#2d2d2d]/50'}`}>{step.label}</span>
              {i < steps.length - 1 && (
                <div className="mx-2 h-[2px] w-8 bg-[#2d2d2d]/20" />
              )}
            </div>
          ))}
        </div>

        {/* Role Selection Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <WobblyCard key={role.id} className="bg-white cursor-pointer transition-all hover:scale-[1.02]" rotate={index === 1 ? -1 : 1}>
                <div className="flex flex-col items-center text-center">
                  <span
                    className={`inline-flex h-14 w-14 items-center justify-center border-[3px] border-[#2d2d2d] ${role.color} text-white`}
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  >
                    <Icon className="h-7 w-7" strokeWidth={2.5} />
                  </span>
                  <h2 className="mt-3 text-2xl font-extrabold">{role.title}</h2>
                  <p className="mt-2 text-base">{role.description}</p>
                </div>

                <div className="mt-4 space-y-2">
                  {role.perks.map((perk) => (
                    <div key={perk} className="flex items-start gap-2 text-base">
                      <span className="mt-1.5 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                      {perk}
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <Link href="/onboarding/identity" className="block">
                    <WobblyButton className="w-full">
                      <span className="inline-flex items-center gap-2">
                        Join as {role.title}
                        <ArrowRight className="h-4 w-4" strokeWidth={2.8} />
                      </span>
                    </WobblyButton>
                  </Link>
                </div>
              </WobblyCard>
            );
          })}
        </div>

        {/* Info note */}
        <div className="mt-8">
          <WobblyCard className="bg-[#fff9c4] max-w-2xl" rotate={-0.5}>
            <h3 className="text-lg font-extrabold">About role changes</h3>
            <p className="mt-1 text-base">
              Your role determines your dashboard and how others see you on the platform.
              You can change your role <strong>once</strong> after initial selection. After that, it&apos;s permanent
              to keep things fair.
            </p>
          </WobblyCard>
        </div>
      </main>
    </div>
  );
}
