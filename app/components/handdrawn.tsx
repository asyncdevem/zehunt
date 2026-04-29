import type { ReactNode } from 'react';

export function WobblyCard({
  children,
  className = '',
  rotate,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <section
      className={`border-[3px] border-[#2d2d2d] bg-white p-5 ${className}`}
      style={{
        borderRadius: '45px 255px 35px 255px / 255px 35px 225px 45px',
        boxShadow: '4px 4px 0 0 #2d2d2d',
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
    >
      {children}
    </section>
  );
}

export function WobblyButton({
  children,
  variant = 'primary',
  className = '',
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}) {
  const variantClasses =
    variant === 'secondary'
      ? 'bg-[#e5e0d8] hover:bg-[#2d5da1]'
      : 'bg-white hover:bg-[#ff4d4d]';

  return (
    <button
      className={`h-12 border-[3px] border-[#2d2d2d] px-5 text-lg font-bold text-[#2d2d2d] transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:text-white active:translate-x-[4px] active:translate-y-[4px] ${variantClasses} ${className}`}
      style={{
        borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
        boxShadow: '4px 4px 0 0 #2d2d2d',
      }}
    >
      {children}
    </button>
  );
}

export function StickyLabel({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex border-[2px] border-dashed border-[#2d2d2d] bg-[#fff9c4] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2d2d2d]"
      style={{ borderRadius: '62% 38% 53% 47% / 38% 59% 41% 62%' }}
    >
      {children}
    </span>
  );
}

export function RoughPill({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex border-[2px] border-[#2d2d2d] bg-[#fdfbf7] px-2.5 py-1 text-xs font-bold text-[#2d2d2d]"
      style={{ borderRadius: '54% 46% 62% 38% / 38% 56% 44% 62%' }}
    >
      {children}
    </span>
  );
}
