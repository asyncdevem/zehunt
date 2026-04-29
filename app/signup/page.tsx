import Image from 'next/image';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { WobblyButton, WobblyCard, StickyLabel } from '@/app/components/handdrawn';

export default function SignupPage() {
  return (
    <div className="min-h-screen text-[#2d2d2d] selection:bg-[#ff4d4d] selection:text-white">
      <header className="border-b-[3px] border-[#2d2d2d] bg-[#fdfbf7]/95">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image src="/zehunt-logo.png" alt="Zehunt" width={104} height={34} className="h-7 w-auto object-contain" />
          </Link>
          <Link
            href="/login"
            className="inline-flex h-10 items-center border-[2px] border-[#2d2d2d] bg-white px-4 text-sm font-bold transition-all duration-100 hover:bg-[#2d5da1] hover:text-white"
            style={{ borderRadius: '62% 38% 53% 47% / 38% 59% 41% 62%' }}
          >
            Log in
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl justify-center px-4 py-10 sm:px-6 lg:px-8">
        <WobblyCard className="w-full max-w-2xl bg-[#fff9c4]" rotate={-1}>
          <StickyLabel>Start building</StickyLabel>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight">Create Your Builder Account</h1>
          <p className="mt-2 text-lg">Join Zehunt and turn execution history into measurable reputation and real opportunities.</p>

          <form className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-lg font-bold">Full Name</label>
              <input
                type="text"
                placeholder="Ayesha Khan"
                className="w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none"
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Username</label>
              <input
                type="text"
                placeholder="ayeshabuilds"
                className="w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none"
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-lg font-bold">Email</label>
              <input
                type="email"
                placeholder="you@builder.com"
                className="w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none"
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-lg font-bold">Password</label>
              <input
                type="password"
                placeholder="Choose a strong password"
                className="w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none"
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <WobblyButton className="w-full">
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4" strokeWidth={2.8} />
                  Create Account
                </span>
              </WobblyButton>
            </div>
          </form>

          <p className="mt-4 text-center text-base font-semibold">
            Already have an account?{' '}
            <Link href="/login" className="underline decoration-2 underline-offset-2 hover:text-[#ff4d4d]">
              Log in
            </Link>
          </p>
        </WobblyCard>
      </main>
    </div>
  );
}
