import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyCard } from '@/app/components/handdrawn';

const products = [
  {
    id: 'flowpilot',
    name: 'FlowPilot',
    tagline: 'AI workflow engine for startup ops teams.',
    lifecycle: 'GROWTH',
    builder: 'ayeshabuilds',
  },
  {
    id: 'dockit',
    name: 'Dockit Core',
    tagline: 'API reliability and deployment health toolkit.',
    lifecycle: 'BETA',
    builder: 'rohanexec',
  },
  {
    id: 'pulsedesk',
    name: 'PulseDesk',
    tagline: 'Automation workspace for support and retention loops.',
    lifecycle: 'BETA',
    builder: 'minaforward',
  },
];

export default function ProductsPage() {
  return (
    <PlatformShell
      title="Products"
      subtitle="See what builders are creating. Each product tracks progress from idea to growth."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>All Products</StickyLabel>
        <RoughPill>By builders</RoughPill>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <WobblyCard key={product.id} className="bg-white" rotate={index % 2 ? 1 : -1}>
            <h2 className="text-2xl font-extrabold">{product.name}</h2>
            <p className="mt-2 text-lg">{product.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <RoughPill>{product.lifecycle}</RoughPill>
              <RoughPill>@{product.builder}</RoughPill>
            </div>
            <Link
              href={`/products/${product.id}`}
              className="mt-4 inline-flex h-11 items-center gap-2 border-[3px] border-[#2d2d2d] bg-[#e5e0d8] px-4 font-bold transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:text-white"
              style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px', boxShadow: '4px 4px 0 0 #2d2d2d' }}
            >
              Open Product
              <ArrowRight className="h-4 w-4" strokeWidth={2.8} />
            </Link>
          </WobblyCard>
        ))}
      </div>
    </PlatformShell>
  );
}
