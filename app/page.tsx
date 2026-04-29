import Image from 'next/image';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Briefcase,
  ChartLine,
  Flame,
  GitBranch,
  Handshake,
  ShieldCheck,
  Target,
} from 'lucide-react';

const risingBuilders = [
  {
    id: 1,
    name: 'Ayesha Khan',
    username: '@ayeshabuilds',
    specialty: 'AI Workflow Systems',
    score: 842,
    growth: '+18% in 7d',
    streak: '21-day streak',
    avatar: 'https://ui-avatars.com/api/?name=Ayesha+Khan&background=F97316&color=fff',
  },
  {
    id: 2,
    name: 'Rohan Mehta',
    username: '@rohanexec',
    specialty: 'Developer Infrastructure',
    score: 806,
    growth: '+14% in 7d',
    streak: '17-day streak',
    avatar: 'https://ui-avatars.com/api/?name=Rohan+Mehta&background=EA580C&color=fff',
  },
  {
    id: 3,
    name: 'Mina Park',
    username: '@minaforward',
    specialty: 'B2B SaaS Automation',
    score: 773,
    growth: '+12% in 7d',
    streak: '28-day streak',
    avatar: 'https://ui-avatars.com/api/?name=Mina+Park&background=C2410C&color=fff',
  },
];

const eventSignals = [
  {
    label: 'Consistency',
    weight: '30%',
    detail: 'Active days, update rhythm, event streaks',
    icon: Flame,
  },
  {
    label: 'Execution',
    weight: '25%',
    detail: 'Lifecycle movement: idea to growth',
    icon: GitBranch,
  },
  {
    label: 'Engagement Quality',
    weight: '20%',
    detail: 'Depth of feedback and meaningful discussions',
    icon: ShieldCheck,
  },
  {
    label: 'Outcome Signals',
    weight: '15%',
    detail: 'Hiring, collaboration, and funding intent',
    icon: Target,
  },
  {
    label: 'Social Proof',
    weight: '10%',
    detail: 'Followers and lightweight reactions',
    icon: Activity,
  },
];

const opportunities = [
  {
    title: 'Hiring Match',
    description: 'Builders with high execution consistency become visible to hiring teams.',
    icon: Briefcase,
  },
  {
    title: 'Collaboration Match',
    description: 'Find aligned co-builders based on skills graph and activity quality.',
    icon: Handshake,
  },
  {
    title: 'Funding Signal',
    description: 'Emerging builders with velocity spikes surface to early investors.',
    icon: ChartLine,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen text-[#2d2d2d] selection:bg-[#ff4d4d] selection:text-white">
      <header className="sticky top-0 z-40 border-b-[3px] border-[#2d2d2d] bg-[#fdfbf7]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/zehunt-logo.png"
              alt="Zehunt"
              width={104}
              height={34}
              className="h-7 w-auto object-contain"
            />
          </Link>
          <nav className="hidden items-center gap-6 text-lg font-bold text-[#2d2d2d] md:flex">
            <Link href="/builders" className="decoration-2 underline-offset-4 transition-colors hover:text-[#ff4d4d] hover:underline">
              Builders
            </Link>
            <Link href="/feed" className="decoration-2 underline-offset-4 transition-colors hover:text-[#ff4d4d] hover:underline">
              Feed
            </Link>
            <Link href="/opportunities" className="decoration-2 underline-offset-4 transition-colors hover:text-[#ff4d4d] hover:underline">
              Opportunities
            </Link>
          </nav>
          <Link
            href="/signup"
            className="inline-flex h-12 items-center justify-center whitespace-nowrap border-[3px] border-[#2d2d2d] bg-white px-5 text-lg font-bold leading-none text-[#2d2d2d] transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#ff4d4d] hover:text-white active:translate-x-[4px] active:translate-y-[4px]"
            style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', boxShadow: '4px 4px 0 0 #2d2d2d' }}
          >
            Start Building
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-4 pb-3 md:hidden sm:px-6 lg:px-8">
          {[
            { href: '/builders', label: 'Builders' },
            { href: '/rankings', label: 'Rankings' },
            { href: '/feed', label: 'Feed' },
            { href: '/products', label: 'Products' },
            { href: '/opportunities', label: 'Opportunities' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex h-10 items-center whitespace-nowrap border-[2px] border-[#2d2d2d] bg-white px-3 text-sm font-bold text-[#2d2d2d]"
              style={{ borderRadius: '62% 38% 53% 47% / 38% 59% 41% 62%' }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <section className="grid gap-8 lg:grid-cols-[1.35fr,1fr] lg:items-center">
          <div className="max-w-2xl">
            <p
              className="inline-flex items-center border-[3px] border-[#2d2d2d] bg-[#fff9c4] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2d2d2d]"
              style={{ borderRadius: '62% 38% 53% 47% / 38% 59% 41% 62%', boxShadow: '3px 3px 0 0 #2d2d2d' }}
            >
              Builder Intelligence Graph
            </p>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-tight text-[#2d2d2d] sm:text-6xl">
              Reputation earned through execution, not hype.
            </h1>
            <p className="mt-4 max-w-xl text-xl font-medium leading-relaxed text-[#2d2d2d]">
              Zehunt tracks how builders grow over time using real activity signals. We convert building events into measurable reputation and unlock real-world opportunities.
            </p>
            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link
                href="/signup"
                className="inline-flex h-12 min-w-[228px] items-center justify-center whitespace-nowrap border-[3px] border-[#2d2d2d] bg-white px-5 text-lg font-bold leading-none text-[#2d2d2d] transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#ff4d4d] hover:text-white active:translate-x-[4px] active:translate-y-[4px]"
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', boxShadow: '4px 4px 0 0 #2d2d2d' }}
              >
                Create Builder Profile
              </Link>
              <Link
                href="/builders"
                className="inline-flex h-12 min-w-[228px] items-center justify-center gap-2 whitespace-nowrap border-[3px] border-[#2d2d2d] bg-[#e5e0d8] px-5 text-lg font-bold leading-none text-[#2d2d2d] transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:text-white active:translate-x-[4px] active:translate-y-[4px]"
                style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', boxShadow: '4px 4px 0 0 #2d2d2d' }}
              >
                Explore Builders
                <ArrowRight className="h-4 w-4" strokeWidth={2.8} />
              </Link>
            </div>
          </div>

          <div
            className="relative border-[3px] border-[#2d2d2d] bg-white p-6"
            style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px', boxShadow: '6px 6px 0 0 #2d2d2d', transform: 'rotate(1deg)' }}
          >
            <div className="absolute -top-3 left-1/2 h-5 w-24 -translate-x-1/2 rotate-[-5deg] bg-[#e5e0d8]/70" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#2d2d2d]">Core Loop</h2>
            <div className="mt-5 space-y-3">
              {[
                'Builder ships work and logs events',
                'Execution activity increases Builder Score',
                'High-signal builders get visibility',
                'Opportunities unlock: hiring, collaboration, funding',
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-3 border-[2px] border-[#2d2d2d] bg-[#fdfbf7] px-3 py-3"
                  style={{ borderRadius: '53% 47% 42% 58% / 35% 44% 56% 65%' }}
                >
                  <span
                    className="mt-0.5 inline-flex h-6 w-6 items-center justify-center bg-[#ff4d4d] text-xs font-bold text-white"
                    style={{ borderRadius: '56% 44% 61% 39% / 39% 61% 39% 61%' }}
                  >
                    {index + 1}
                  </span>
                  <p className="text-base font-semibold text-[#2d2d2d]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="system"
          className="mt-12 border-[3px] border-[#2d2d2d] bg-white p-6 sm:p-8"
          style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px', boxShadow: '4px 4px 0 0 #2d2d2d' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#2d2d2d]">Builder Score Framework</h2>
            <span
              className="border-[2px] border-dashed border-[#2d2d2d] bg-[#fff9c4] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2d2d2d]"
              style={{ borderRadius: '64% 36% 48% 52% / 41% 64% 36% 59%' }}
            >
              Reputation Engine
            </span>
          </div>
          <p className="mt-3 max-w-3xl text-lg font-medium leading-relaxed text-[#2d2d2d]">
            Builder Score = (Consistency x 30%) + (Execution x 25%) + (Engagement Quality x 20%) + (Outcome Signals x 15%) + (Social Proof x 10%)
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {eventSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <article
                  key={signal.label}
                  className="border-[3px] border-[#2d2d2d] bg-[#fdfbf7] p-4 transition-transform duration-100 hover:rotate-1"
                  style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px', boxShadow: '4px 4px 0 0 #2d2d2d' }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2">
                      <span
                        className="inline-flex h-8 w-8 items-center justify-center border-[2px] border-[#2d2d2d] bg-white"
                        style={{ borderRadius: '58% 42% 67% 33% / 42% 55% 45% 58%' }}
                      >
                        <Icon className="h-4 w-4 text-[#ff4d4d]" strokeWidth={2.8} />
                      </span>
                      <h3 className="text-lg font-bold text-[#2d2d2d]">{signal.label}</h3>
                    </div>
                    <span className="text-sm font-bold text-[#ff4d4d]">{signal.weight}</span>
                  </div>
                  <p className="mt-2 text-base text-[#2d2d2d]">{signal.detail}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="rankings" className="mt-12 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <div
            className="border-[3px] border-[#2d2d2d] bg-white p-6 sm:p-8"
            style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px', boxShadow: '4px 4px 0 0 #2d2d2d' }}
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-3xl font-extrabold tracking-tight text-[#2d2d2d]">Rising Builders</h2>
              <span className="text-sm font-bold uppercase tracking-wider text-[#2d2d2d]">7-day growth</span>
            </div>
            <div className="mt-5 space-y-3">
              {risingBuilders.map((builder, index) => (
                <article
                  key={builder.id}
                  className="flex flex-col gap-4 border-[3px] border-[#2d2d2d] bg-[#fdfbf7] p-4 transition-transform duration-100 hover:-rotate-1 sm:flex-row sm:items-center sm:justify-between"
                  style={{ borderRadius: '42% 58% 34% 66% / 54% 41% 59% 46%' }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex h-7 w-7 items-center justify-center bg-[#2d2d2d] text-xs font-bold text-white"
                      style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    >
                      {index + 1}
                    </span>
                    <div
                      className="relative h-11 w-11 overflow-hidden border-[2px] border-[#2d2d2d] bg-white"
                      style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    >
                      <Image src={builder.avatar} alt={builder.name} fill sizes="44px" className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#2d2d2d]">{builder.name}</h3>
                      <p className="text-sm font-semibold text-[#2d2d2d]">{builder.username} • {builder.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#2d2d2d]">Builder Score</p>
                      <p className="font-extrabold text-[#2d2d2d]">{builder.score}</p>
                    </div>
                    <div className="h-10 w-px bg-[#2d2d2d]" />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#2d2d2d]">Momentum</p>
                      <p className="font-bold text-[#ff4d4d]">{builder.growth}</p>
                    </div>
                    <span
                      className="border-[2px] border-[#2d2d2d] bg-[#fff9c4] px-2.5 py-1 text-[11px] font-bold text-[#2d2d2d]"
                      style={{ borderRadius: '62% 38% 53% 47% / 38% 59% 41% 62%' }}
                    >
                      {builder.streak}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div
            className="border-[3px] border-[#2d2d2d] bg-[#fff9c4] p-6 text-[#2d2d2d] sm:p-8"
            style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px', boxShadow: '4px 4px 0 0 #2d2d2d', transform: 'rotate(-1deg)' }}
          >
            <h2 className="text-2xl font-extrabold tracking-tight">Event Stream Priorities</h2>
            <p className="mt-2 text-base leading-relaxed">
              Every signal in Zehunt flows through a unified builder event stream. This creates one source of truth for scoring, ranking, and future analytics.
            </p>
            <ul className="mt-6 space-y-3 text-base font-semibold">
              <li className="border-[2px] border-dashed border-[#2d2d2d] bg-white px-3 py-2" style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}>PRODUCT_CREATED / PRODUCT_UPDATED</li>
              <li className="border-[2px] border-dashed border-[#2d2d2d] bg-white px-3 py-2" style={{ borderRadius: '61% 39% 57% 43% / 40% 63% 37% 60%' }}>STAGE_CHANGED / LAUNCHED</li>
              <li className="border-[2px] border-dashed border-[#2d2d2d] bg-white px-3 py-2" style={{ borderRadius: '54% 46% 66% 34% / 35% 55% 45% 65%' }}>POST_CREATED / COMMENT_RECEIVED</li>
              <li className="border-[2px] border-dashed border-[#2d2d2d] bg-white px-3 py-2" style={{ borderRadius: '57% 43% 51% 49% / 44% 58% 42% 56%' }}>FOLLOWED / OPPORTUNITY_UNLOCKED</li>
            </ul>
          </div>
        </section>

        <section
          id="opportunities"
          className="mt-12 border-[3px] border-[#2d2d2d] bg-white p-6 sm:p-8"
          style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px', boxShadow: '4px 4px 0 0 #2d2d2d' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#2d2d2d]">Opportunity Engine</h2>
            <span
              className="border-[2px] border-dashed border-[#2d2d2d] bg-[#e5e0d8] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2d2d2d]"
              style={{ borderRadius: '62% 38% 53% 47% / 38% 59% 41% 62%' }}
            >
              Opportunity Outcomes
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {opportunities.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="border-[3px] border-[#2d2d2d] bg-[#fdfbf7] p-4 transition-transform duration-100 hover:rotate-1"
                  style={{ borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px', boxShadow: '4px 4px 0 0 #2d2d2d' }}
                >
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center border-[2px] border-[#2d2d2d] bg-white"
                    style={{ borderRadius: '58% 42% 67% 33% / 42% 55% 45% 58%' }}
                  >
                    <Icon className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
                  </span>
                  <h3 className="mt-3 text-xl font-extrabold text-[#2d2d2d]">{item.title}</h3>
                  <p className="mt-1 text-base text-[#2d2d2d]">{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
