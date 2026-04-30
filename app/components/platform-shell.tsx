import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Bell, Search } from 'lucide-react';
import { WobblyButton } from '@/app/components/handdrawn';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/builders', label: 'Builders' },
  { href: '/rankings', label: 'Rankings' },
  { href: '/products', label: 'Products' },
  { href: '/feed', label: 'Feed' },
  { href: '/opportunities', label: 'Opportunities' },
  { href: '/community', label: 'Community' },
];

export function PlatformShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
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
          <nav className="hidden items-center gap-5 text-lg font-bold md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="decoration-2 underline-offset-4 transition-colors hover:text-[#ff4d4d] hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="inline-flex h-10 w-10 items-center justify-center border-[2px] border-[#2d2d2d] bg-white transition-all duration-100 hover:bg-[#2d5da1] hover:text-white"
              style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
              aria-label="Search"
            >
              <Search className="h-4 w-4" strokeWidth={2.8} />
            </Link>
            <Link
              href="/notifications"
              className="inline-flex h-10 w-10 items-center justify-center border-[2px] border-[#2d2d2d] bg-white transition-all duration-100 hover:bg-[#ff4d4d] hover:text-white"
              style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" strokeWidth={2.8} />
            </Link>
            <Link href="/updates/new" className="inline-flex">
              <WobblyButton className="text-base">Create Update</WobblyButton>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <section className="mb-7">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-2 max-w-3xl text-xl">{subtitle}</p>
        </section>
        {children}
      </main>
    </div>
  );
}
