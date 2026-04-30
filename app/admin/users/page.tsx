import Image from 'next/image';
import { CheckCircle, Search, Shield, UserX } from 'lucide-react';
import { RoughPill, StickyLabel, WobblyButton, WobblyCard } from '@/app/components/handdrawn';
import { builders } from '@/app/lib/platform-data';

const inputStyle = "w-full border-[3px] border-[#2d2d2d] bg-white px-4 py-3 pl-12 text-lg placeholder:text-[#2d2d2d]/50 focus:border-[#2d5da1] focus:outline-none";
const inputRadius = { borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' };

const allUsers = [
  { ...builders[0], role: 'builder', verified: true, admin: false, joined: 'Jan 12, 2026', status: 'active' },
  { ...builders[1], role: 'builder', verified: true, admin: false, joined: 'Jan 20, 2026', status: 'active' },
  { ...builders[2], role: 'builder', verified: false, admin: false, joined: 'Feb 05, 2026', status: 'active' },
  { id: 'u4', name: 'Sarah Chen', username: 'sarahcodes', avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=7C3AED&color=fff', score: 0, role: 'investor', verified: false, admin: false, joined: 'Mar 10, 2026', status: 'active', focus: 'Angel Investing', location: 'SF', momentum: '', streak: '', consistency: 0, execution: 0, engagement: 0, outcomes: 0, socialProof: 0 },
  { id: 'u5', name: 'James Park', username: 'jameshr', avatar: 'https://ui-avatars.com/api/?name=James+Park&background=059669&color=fff', score: 0, role: 'recruiter', verified: false, admin: false, joined: 'Mar 15, 2026', status: 'active', focus: 'Tech Recruiting', location: 'NYC', momentum: '', streak: '', consistency: 0, execution: 0, engagement: 0, outcomes: 0, socialProof: 0 },
];

const roleColors: Record<string, string> = {
  builder: 'border-[#ff4d4d] bg-[#ff4d4d]/10 text-[#ff4d4d]',
  investor: 'border-[#2d5da1] bg-[#2d5da1]/10 text-[#2d5da1]',
  recruiter: 'border-[#e5880a] bg-[#e5880a]/10 text-[#e5880a]',
};

export default function AdminUsersPage() {
  return (
    <>
      <div className="mb-8">
        <StickyLabel>User Management</StickyLabel>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Users</h1>
        <p className="mt-1 text-xl">View, verify, and manage all platform users.</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: 'Total Users', value: String(allUsers.length) },
          { label: 'Builders', value: String(allUsers.filter((u) => u.role === 'builder').length) },
          { label: 'Investors', value: String(allUsers.filter((u) => u.role === 'investor').length) },
          { label: 'Recruiters', value: String(allUsers.filter((u) => u.role === 'recruiter').length) },
        ].map((stat) => (
          <WobblyCard key={stat.label} className="bg-white text-center" rotate={0}>
            <p className="text-2xl font-extrabold">{stat.value}</p>
            <p className="text-sm font-bold text-[#2d2d2d]/60">{stat.label}</p>
          </WobblyCard>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6 relative max-w-xl">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#2d2d2d]/50" strokeWidth={2.8} />
        <input type="text" placeholder="Search users by name or username..." className={inputStyle} style={inputRadius} />
      </div>

      {/* User List */}
      <div className="space-y-3">
        {allUsers.map((user, index) => (
          <WobblyCard key={user.id} className="bg-white" rotate={0}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="relative h-10 w-10 overflow-hidden border-[2px] border-[#2d2d2d]"
                  style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                >
                  <Image src={user.avatar} alt={user.name} fill sizes="40px" className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold">{user.name}</span>
                    <span
                      className={`inline-flex border-[2px] px-2 py-0.5 text-xs font-bold ${roleColors[user.role] ?? ''}`}
                      style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                    >
                      {user.role}
                    </span>
                    {user.verified && (
                      <CheckCircle className="h-4 w-4 text-[#2d5da1]" strokeWidth={2.8} />
                    )}
                  </div>
                  <p className="text-sm">@{user.username} · Joined {user.joined}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {user.role === 'builder' && <RoughPill>Score {user.score}</RoughPill>}
                {!user.verified && (
                  <button
                    className="inline-flex h-8 items-center gap-1 border-[2px] border-[#2d5da1] bg-white px-3 text-xs font-bold text-[#2d5da1] transition-colors hover:bg-[#2d5da1] hover:text-white"
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  >
                    <CheckCircle className="h-3 w-3" strokeWidth={2.8} />
                    Verify
                  </button>
                )}
                {!user.admin && (
                  <button
                    className="inline-flex h-8 items-center gap-1 border-[2px] border-[#e5880a] bg-white px-3 text-xs font-bold text-[#e5880a] transition-colors hover:bg-[#e5880a] hover:text-white"
                    style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  >
                    <Shield className="h-3 w-3" strokeWidth={2.8} />
                    Make Admin
                  </button>
                )}
                <button
                  className="inline-flex h-8 w-8 items-center justify-center border-[2px] border-[#ff4d4d] text-[#ff4d4d] transition-colors hover:bg-[#ff4d4d] hover:text-white"
                  style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
                  aria-label="Suspend user"
                >
                  <UserX className="h-3.5 w-3.5" strokeWidth={2.8} />
                </button>
              </div>
            </div>
          </WobblyCard>
        ))}
      </div>
    </>
  );
}
