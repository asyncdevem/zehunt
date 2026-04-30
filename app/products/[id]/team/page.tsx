import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Crown, GitFork, Mail, Shield, UserMinus, UserPlus, Users } from 'lucide-react';
import { PlatformShell } from '@/app/components/platform-shell';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';
import { builders } from '@/app/lib/platform-data';

const inputStyle = "w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none";
const inputRadius = { borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' };

const teamMembers = [
  { ...builders[0], role: 'owner' as const, joinedAt: 'Jan 12, 2026' },
  { ...builders[1], role: 'maintainer' as const, joinedAt: 'Feb 05, 2026' },
  { ...builders[2], role: 'contributor' as const, joinedAt: 'Mar 20, 2026' },
];

const pendingInvites = [
  { username: 'sarahcodes', name: 'Sarah Chen', invitedAt: '2d ago' },
];

const roleIcons = {
  owner: Crown,
  maintainer: Shield,
  contributor: Users,
};

const roleColors = {
  owner: 'border-[#ff4d4d] bg-[#ff4d4d]/10 text-[#ff4d4d]',
  maintainer: 'border-[#2d5da1] bg-[#2d5da1]/10 text-[#2d5da1]',
  contributor: 'border-[#2d2d2d] bg-[#fdfbf7] text-[#2d2d2d]',
};

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <PlatformShell
      title="Team Management"
      subtitle="Manage your team. Everyone contributes to the product's success."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <StickyLabel>Team Project</StickyLabel>
        <RoughPill>Product #{id}</RoughPill>
        <RoughPill>{teamMembers.length} members</RoughPill>
        <div className="ml-auto">
          <Link href={`/products/${id}`}>
            <WobblyButton variant="secondary">Back to Product</WobblyButton>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        {/* Left Column — Team Members */}
        <div className="space-y-5">
          <WobblyCard className="bg-white" rotate={-1}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <Users className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
                <h2 className="text-2xl font-extrabold">Team Members</h2>
              </div>
              <RoughPill>{teamMembers.length} active</RoughPill>
            </div>

            <div className="mt-4 space-y-3">
              {teamMembers.map((member) => {
                const RoleIcon = roleIcons[member.role];
                return (
                  <div
                    key={member.id}
                    className="flex items-center justify-between border-[2px] border-dashed border-[#2d2d2d] bg-[#fdfbf7] px-3 py-3"
                    style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="relative h-10 w-10 overflow-hidden border-[2px] border-[#2d2d2d]"
                        style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                      >
                        <Image src={member.avatar} alt={member.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Link href={`/builders/${member.username}`} className="font-extrabold hover:text-[#ff4d4d]">
                            {member.name}
                          </Link>
                          <span
                            className={`inline-flex items-center gap-1 border-[2px] px-2 py-0.5 text-xs font-bold ${roleColors[member.role]}`}
                            style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                          >
                            <RoleIcon className="h-3 w-3" strokeWidth={2.8} />
                            {member.role}
                          </span>
                        </div>
                        <p className="text-sm">@{member.username} · Joined {member.joinedAt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {member.role !== 'owner' && (
                        <>
                          <select
                            className="border-[2px] border-[#2d2d2d] bg-white px-2 py-1 text-sm font-bold focus:outline-none"
                            style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                            defaultValue={member.role}
                          >
                            <option value="maintainer">Maintainer</option>
                            <option value="contributor">Contributor</option>
                          </select>
                          <button
                            className="inline-flex h-8 w-8 items-center justify-center border-[2px] border-[#ff4d4d] text-[#ff4d4d] transition-colors hover:bg-[#ff4d4d] hover:text-white"
                            style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                            aria-label={`Remove ${member.name}`}
                          >
                            <UserMinus className="h-3.5 w-3.5" strokeWidth={2.8} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </WobblyCard>

          {/* Pending Invites */}
          <WobblyCard className="bg-[#fff9c4]" rotate={1}>
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#e5880a]" strokeWidth={2.8} />
                <h3 className="text-2xl font-extrabold">Pending Invites</h3>
              </div>
              <RoughPill>{pendingInvites.length} pending</RoughPill>
            </div>
            <div className="mt-3 space-y-3">
              {pendingInvites.map((invite) => (
                <div
                  key={invite.username}
                  className="flex items-center justify-between border-[2px] border-dashed border-[#2d2d2d] bg-white px-3 py-2"
                  style={{ borderRadius: '59% 41% 55% 45% / 38% 61% 39% 62%' }}
                >
                  <div>
                    <p className="font-extrabold">{invite.name}</p>
                    <p className="text-sm">@{invite.username} · Invited {invite.invitedAt}</p>
                  </div>
                  <span
                    className="inline-flex border-[2px] border-[#e5880a] bg-[#e5880a]/10 px-2.5 py-0.5 text-xs font-bold text-[#e5880a]"
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  >
                    Pending
                  </span>
                </div>
              ))}
              {pendingInvites.length === 0 && (
                <p className="text-base text-[#2d2d2d]/60">No pending invitations.</p>
              )}
            </div>
          </WobblyCard>
        </div>

        {/* Right Column — Invite & Info */}
        <div className="space-y-5">
          {/* Invite Form */}
          <WobblyCard className="bg-white" rotate={1}>
            <div className="inline-flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-[#ff4d4d]" strokeWidth={2.8} />
              <h3 className="text-2xl font-extrabold">Invite Builder</h3>
            </div>
            <form className="mt-3 space-y-3">
              <div>
                <label className="mb-1 block text-lg font-bold">Username</label>
                <input
                  type="text"
                  placeholder="Search by username..."
                  className={inputStyle}
                  style={inputRadius}
                />
              </div>
              <div>
                <label className="mb-1 block text-lg font-bold">Role</label>
                <select className={inputStyle} style={inputRadius} defaultValue="contributor">
                  <option value="maintainer">Maintainer — can invite members &amp; manage product</option>
                  <option value="contributor">Contributor — can post updates &amp; transition stages</option>
                </select>
              </div>
              <WobblyButton>
                <span className="inline-flex items-center gap-2">
                  <UserPlus className="h-4 w-4" strokeWidth={2.8} />
                  Send Invite
                </span>
              </WobblyButton>
            </form>
          </WobblyCard>

          {/* Repo Link */}
          <WobblyCard className="bg-[#fdfbf7]" rotate={-1}>
            <div className="inline-flex items-center gap-2">
              <GitFork className="h-5 w-5 text-[#2d5da1]" strokeWidth={2.8} />
              <h3 className="text-xl font-extrabold">Repository</h3>
            </div>
            <div className="mt-3">
              <input
                type="url"
                placeholder="https://github.com/team/project"
                defaultValue="https://github.com/ayeshabuilds/flowpilot"
                className={inputStyle}
                style={inputRadius}
              />
              <p className="mt-1 text-sm">Public repo link for open-source visibility.</p>
            </div>
            <div className="mt-2">
              <WobblyButton variant="secondary">Update Repo Link</WobblyButton>
            </div>
          </WobblyCard>

          {/* Role Permissions */}
          <WobblyCard className="bg-[#fff9c4]" rotate={0.5}>
            <h3 className="text-xl font-extrabold">Role Permissions</h3>
            <div className="mt-3 space-y-3">
              {[
                { role: 'Owner', perms: 'Full control. Delete product, manage all members, transfer ownership.' },
                { role: 'Maintainer', perms: 'Invite/remove contributors, edit product details, transition stages, post updates.' },
                { role: 'Contributor', perms: 'Post updates, transition lifecycle stages. Cannot manage team.' },
              ].map((item) => (
                <div key={item.role}>
                  <p className="font-bold">{item.role}</p>
                  <p className="text-sm">{item.perms}</p>
                </div>
              ))}
            </div>
          </WobblyCard>
        </div>
      </div>
    </PlatformShell>
  );
}
