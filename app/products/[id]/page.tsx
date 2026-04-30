import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Flag, GitBranch, GitFork, Rocket, Users } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';
import { builders, lifecycleTimeline, updates } from '@/app/lib/platform-data';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const relatedUpdates = updates.slice(0, 2);

  return (
    <PlatformShell
      title="Product Details"
      subtitle="Track what you've built and how far you've come."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Product</StickyLabel>
        <RoughPill>Progress Tracking</RoughPill>
        <RoughPill>Collaborative</RoughPill>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
        <WobblyCard className="bg-white" rotate={1}>
          <h2 className="text-2xl font-extrabold">FlowPilot Core - Product #{id}</h2>
          <p className="mt-2 text-lg">
            Workflow automation workspace focused on reducing operational overhead for startup teams.
          </p>

          <div className="mt-5">
            <h3 className="mb-3 text-xl font-extrabold">Product Timeline</h3>
            <div className="space-y-3">
              {lifecycleTimeline.map((stage, index) => (
                <div
                  key={stage.stage}
                  className="flex items-center justify-between border-[2px] border-dashed border-[#2d2d2d] bg-[#fdfbf7] px-3 py-2"
                  style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                >
                  <div className="inline-flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-[#2d5da1]" strokeWidth={2.8} />
                    <span className="font-bold">{index + 1}. {stage.stage}</span>
                  </div>
                  <span className="text-sm font-semibold">{stage.date}</span>
                </div>
              ))}
            </div>
          </div>
        </WobblyCard>

        <WobblyCard className="bg-[#fff9c4]" rotate={-1}>
          <h3 className="text-2xl font-extrabold">Recent Activity</h3>
          <div className="mt-4 space-y-3">
            {relatedUpdates.map((item) => (
              <div
                key={item.id}
                className="border-[2px] border-[#2d2d2d] bg-white px-3 py-2"
                style={{ borderRadius: '61% 39% 57% 43% / 40% 63% 37% 60%' }}
              >
                <div className="inline-flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-[#ff4d4d]" strokeWidth={2.8} />
                  <span className="font-bold capitalize">{item.type}</span>
                </div>
                <p className="mt-1 text-base">{item.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <RoughPill>By the builder</RoughPill>
            <RoughPill>Verified progress</RoughPill>
          </div>
        </WobblyCard>
      </div>

      <WobblyCard className="mt-6 bg-white" rotate={-1}>
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <Users className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
            <h3 className="text-2xl font-extrabold">Team</h3>
          </div>
          <div className="flex items-center gap-2">
            <RoughPill>3 members</RoughPill>
            <Link href={`/products/${id}/team`}>
              <WobblyButton variant="secondary">Manage Team</WobblyButton>
            </Link>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {builders.map((builder) => (
            <Link
              key={builder.id}
              href={`/builders/${builder.username}`}
              className="flex items-center gap-2 border-[2px] border-dashed border-[#2d2d2d] bg-[#fdfbf7] px-3 py-2 transition-colors hover:bg-[#fff9c4]"
              style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
            >
              <div
                className="relative h-8 w-8 overflow-hidden border-[2px] border-[#2d2d2d]"
                style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
              >
                <Image src={builder.avatar} alt={builder.name} fill sizes="32px" className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-extrabold">{builder.name}</p>
                <p className="text-xs">@{builder.username}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <GitFork className="h-4 w-4 text-[#2d5da1]" strokeWidth={2.8} />
          <a href="https://github.com/ayeshabuilds/flowpilot" className="text-sm font-bold text-[#2d5da1] underline underline-offset-2" target="_blank" rel="noopener noreferrer">
            github.com/ayeshabuilds/flowpilot
          </a>
        </div>
      </WobblyCard>

      <WobblyCard className="mt-6 bg-[#fdfbf7]" rotate={1}>
        <div className="inline-flex items-center gap-2">
          <Flag className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
          <h3 className="text-2xl font-extrabold">Note</h3>
        </div>
        <p className="mt-2 text-lg">
          Zehunt ranks builders by real progress, not votes. Products show what you&apos;ve built and how far you&apos;ve come.
        </p>
      </WobblyCard>
    </PlatformShell>
  );
}
