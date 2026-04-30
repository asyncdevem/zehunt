'use client';

import Link from 'next/link';
import { Bug } from 'lucide-react';

export function FeedbackButton() {
  return (
    <Link
      href="/feedback"
      className="fixed bottom-6 right-6 z-50 inline-flex h-12 items-center gap-2 border-[3px] border-[#2d2d2d] bg-[#fff9c4] px-4 text-sm font-bold text-[#2d2d2d] transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#ff4d4d] hover:text-white active:translate-x-[4px] active:translate-y-[4px]"
      style={{
        borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
        boxShadow: '4px 4px 0 0 #2d2d2d',
      }}
      aria-label="Report an issue"
    >
      <Bug className="h-4 w-4" strokeWidth={2.8} />
      <span className="hidden sm:inline">Report Issue</span>
    </Link>
  );
}
