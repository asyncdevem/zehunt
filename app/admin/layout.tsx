import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Activity,
  Bug,
  GraduationCap,
  LayoutDashboard,
  Mail,
  ShieldAlert,
  SlidersHorizontal,
  Users,
} from 'lucide-react';

const adminNav = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/moderation', label: 'Moderation', icon: ShieldAlert },
  { href: '/admin/events', label: 'Events', icon: Activity },
  { href: '/admin/scores', label: 'Scores', icon: SlidersHorizontal },
  { href: '/admin/reports', label: 'Reports', icon: Bug },
  { href: '/admin/ambassadors', label: 'Ambassadors', icon: GraduationCap },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen text-[#2d2d2d] selection:bg-[#ff4d4d] selection:text-white">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col border-r-[3px] border-[#2d2d2d] bg-[#2d2d2d]">
        <div className="flex h-16 items-center border-b border-white/10 px-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/zehunt-logo.png" alt="Zehunt" width={80} height={26} className="h-5 w-auto object-contain brightness-0 invert" />
            <span
              className="inline-flex border-[2px] border-[#ff4d4d] bg-[#ff4d4d] px-2 py-0.5 text-[10px] font-bold uppercase text-white"
              style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
            >
              Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" strokeWidth={2.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-3 py-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-white/50 transition-colors hover:text-white"
          >
            ← Back to Platform
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#fdfbf7]">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
