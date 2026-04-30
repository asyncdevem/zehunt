import Link from 'next/link';
import { ArrowLeft, GraduationCap, Megaphone, Send, Star } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';

const inputStyle = "w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none";
const inputRadius = { borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' };

export default function AmbassadorSignupPage() {
  return (
    <PlatformShell
      title="Become a Zehunt Ambassador"
      subtitle="Represent Zehunt at your university. Lead the builder movement on your campus."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Ambassador Program</StickyLabel>
        <RoughPill>Applications Open</RoughPill>
        <div className="ml-auto">
          <Link href="/community">
            <WobblyButton variant="secondary">
              <span className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" strokeWidth={2.8} />
                Back to Community
              </span>
            </WobblyButton>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        {/* Application Form */}
        <WobblyCard className="bg-white" rotate={1}>
          <div className="inline-flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
            <h2 className="text-2xl font-extrabold">Application Form</h2>
          </div>

          <form className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-lg font-bold">Full Name</label>
                <input type="text" placeholder="Ayesha Khan" className={inputStyle} style={inputRadius} />
              </div>
              <div>
                <label className="mb-1 block text-lg font-bold">Email</label>
                <input type="email" placeholder="ayesha@lums.edu.pk" className={inputStyle} style={inputRadius} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-lg font-bold">University</label>
                <input type="text" placeholder="LUMS" className={inputStyle} style={inputRadius} />
              </div>
              <div>
                <label className="mb-1 block text-lg font-bold">City / Country</label>
                <input type="text" placeholder="Lahore, Pakistan" className={inputStyle} style={inputRadius} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-lg font-bold">Degree Program</label>
                <input type="text" placeholder="BS Computer Science" className={inputStyle} style={inputRadius} />
              </div>
              <div>
                <label className="mb-1 block text-lg font-bold">Graduation Year</label>
                <select className={inputStyle} style={inputRadius} defaultValue="">
                  <option value="" disabled>Select year</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Zehunt Username (if you have one)</label>
              <input type="text" placeholder="ayeshabuilds (optional)" className={inputStyle} style={inputRadius} />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">LinkedIn / Twitter Profile</label>
              <input type="url" placeholder="https://linkedin.com/in/ayeshakhan" className={inputStyle} style={inputRadius} />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">Why do you want to be a Zehunt Ambassador?</label>
              <textarea
                rows={4}
                placeholder="Tell us about your passion for building, your community involvement, and what you'd do as an ambassador."
                className={`${inputStyle} resize-none`}
                style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">What would you organize at your university?</label>
              <textarea
                rows={3}
                placeholder="Workshops, hackathons, build-in-public sessions, meetups..."
                className={`${inputStyle} resize-none`}
                style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px' }}
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-bold">How many builders could you onboard in the first month?</label>
              <select className={inputStyle} style={inputRadius} defaultValue="">
                <option value="" disabled>Select range</option>
                <option value="5-10">5 - 10</option>
                <option value="10-25">10 - 25</option>
                <option value="25-50">25 - 50</option>
                <option value="50+">50+</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <WobblyButton>
                <span className="inline-flex items-center gap-2">
                  <Send className="h-4 w-4" strokeWidth={2.8} />
                  Submit Application
                </span>
              </WobblyButton>
            </div>
          </form>
        </WobblyCard>

        {/* Sidebar */}
        <div className="space-y-4">
          <WobblyCard className="bg-[#fff9c4]" rotate={-1}>
            <div className="inline-flex items-center gap-2">
              <Star className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
              <h3 className="text-xl font-extrabold">Ambassador Perks</h3>
            </div>
            <ul className="mt-2 space-y-2 text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                <strong>Verified Badge</strong> — Ambassador badge on your Zehunt profile
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                <strong>Early Access</strong> — Beta features before anyone else
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                <strong>Score Boost</strong> — Community leadership feeds your reputation
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                <strong>Direct Access</strong> — Private channel with the Zehunt team
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                <strong>Swag</strong> — Zehunt merch and event kits
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#ff4d4d]" style={{ borderRadius: '50%' }} />
                <strong>Certificate</strong> — Official ambassador certificate for your portfolio
              </li>
            </ul>
          </WobblyCard>

          <WobblyCard className="bg-[#fdfbf7]" rotate={1}>
            <div className="inline-flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
              <h3 className="text-xl font-extrabold">What We Look For</h3>
            </div>
            <ul className="mt-2 space-y-2 text-base">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                Active in your university&apos;s tech/startup community
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                Passionate about building and shipping products
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                Can commit 3-5 hours per week to ambassador activities
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-[#2d5da1]" style={{ borderRadius: '50%' }} />
                Strong communication and organizational skills
              </li>
            </ul>
          </WobblyCard>

          <WobblyCard className="bg-white" rotate={-0.5}>
            <h3 className="text-xl font-extrabold">Timeline</h3>
            <div className="mt-2 space-y-2 text-base">
              <div className="flex items-center gap-2">
                <RoughPill>1</RoughPill>
                <span>Apply (you are here)</span>
              </div>
              <div className="flex items-center gap-2">
                <RoughPill>2</RoughPill>
                <span>Review (1-3 business days)</span>
              </div>
              <div className="flex items-center gap-2">
                <RoughPill>3</RoughPill>
                <span>Interview (15 min video call)</span>
              </div>
              <div className="flex items-center gap-2">
                <RoughPill>4</RoughPill>
                <span>Onboarding &amp; badge activation</span>
              </div>
            </div>
          </WobblyCard>
        </div>
      </div>
    </PlatformShell>
  );
}
