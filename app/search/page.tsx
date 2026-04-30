import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Package, Search, Users } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';
import { builders } from '@/app/lib/platform-data';

const inputStyle = "w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 pl-12 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none";
const inputRadius = { borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' };

const productResults = [
  { id: 'flowpilot', name: 'FlowPilot', tagline: 'AI workflow engine for startup ops teams.', stage: 'GROWTH', builder: 'ayeshabuilds' },
  { id: 'dockit', name: 'Dockit Core', tagline: 'API reliability and deployment health toolkit.', stage: 'BETA', builder: 'rohanexec' },
];

export default function SearchPage() {
  return (
    <PlatformShell
      title="Search"
      subtitle="Find builders by name, username, or skills. Discover products by name or stage."
    >
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#2d2d2d]/50" strokeWidth={2.8} />
          <input
            type="text"
            placeholder="Search builders, products, skills..."
            className={inputStyle}
            style={inputRadius}
            autoFocus
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <StickyLabel>Try</StickyLabel>
          <RoughPill>Next.js</RoughPill>
          <RoughPill>AI/ML</RoughPill>
          <RoughPill>SaaS</RoughPill>
          <RoughPill>DevTools</RoughPill>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-3 inline-flex items-center gap-2">
            <Users className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
            <h2 className="text-2xl font-extrabold">Builders</h2>
            <RoughPill>{builders.length} results</RoughPill>
          </div>

          <div className="space-y-3">
            {builders.map((builder, index) => (
              <WobblyCard key={builder.id} className="bg-[#fdfbf7]" rotate={index % 2 === 0 ? 0.5 : -0.5}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="relative h-10 w-10 overflow-hidden border-[2px] border-[#2d2d2d]"
                      style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    >
                      <Image src={builder.avatar} alt={builder.name} fill sizes="40px" className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold">{builder.name}</h3>
                      <p className="text-sm">@{builder.username} · {builder.focus}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <RoughPill>Score {builder.score}</RoughPill>
                    <Link href={`/builders/${builder.username}`}>
                      <ArrowRight className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
                    </Link>
                  </div>
                </div>
              </WobblyCard>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 inline-flex items-center gap-2">
            <Package className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
            <h2 className="text-2xl font-extrabold">Products</h2>
            <RoughPill>{productResults.length} results</RoughPill>
          </div>

          <div className="space-y-3">
            {productResults.map((product, index) => (
              <WobblyCard key={product.id} className="bg-white" rotate={index % 2 === 0 ? -0.5 : 0.5}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold">{product.name}</h3>
                    <p className="text-sm">{product.tagline}</p>
                    <div className="mt-1 flex gap-2">
                      <RoughPill>{product.stage}</RoughPill>
                      <RoughPill>@{product.builder}</RoughPill>
                    </div>
                  </div>
                  <Link href={`/products/${product.id}`}>
                    <ArrowRight className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
                  </Link>
                </div>
              </WobblyCard>
            ))}
          </div>
        </div>
      </div>
    </PlatformShell>
  );
}
