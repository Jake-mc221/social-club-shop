'use client';

import { useEffect, useState } from 'react';

function ShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block mx-1 align-middle"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  );
}

function InstallPrompt() {
  return (
    <div className="fixed inset-0 z-50 bg-[#141414] flex flex-col items-center justify-center px-8 text-center">
      <img src="/logo.png" alt="Something Social Club" width={96} height={96} className="mb-8 rounded-2xl" />

      <h1 className="text-white text-2xl font-bold tracking-tight mb-2">Something Social Club</h1>
      <p className="text-[#666] text-sm mb-14">Add to your Home Screen to continue</p>

      <ol className="flex flex-col gap-7 text-left w-full max-w-[280px]">
        <li className="flex items-start gap-4">
          <span className="text-[#444] text-xs font-semibold mt-0.5 w-5 shrink-0">01</span>
          <span className="text-[#aaa] text-sm leading-snug">
            Tap the <ShareIcon /> button at the bottom of Safari
          </span>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-[#444] text-xs font-semibold mt-0.5 w-5 shrink-0">02</span>
          <span className="text-[#aaa] text-sm leading-snug">
            Scroll down and tap <span className="text-white font-medium">"Add to Home Screen"</span>
          </span>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-[#444] text-xs font-semibold mt-0.5 w-5 shrink-0">03</span>
          <span className="text-[#aaa] text-sm leading-snug">
            Open the app from your Home Screen
          </span>
        </li>
      </ol>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="w-10 h-1 rounded-full bg-[#333]" />
      </div>
    </div>
  );
}

export default function InstallGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<'loading' | 'prompt' | 'pass'>('loading');

  useEffect(() => {
    const standalone = (navigator as Navigator & { standalone?: boolean }).standalone;
    // standalone === false  → iOS Safari (not installed)
    // standalone === true   → launched from Home Screen
    // standalone === undefined → not iOS
    if (standalone === false) {
      setStatus('prompt');
    } else {
      setStatus('pass');
    }
  }, []);

  if (status === 'loading') return null;
  if (status === 'prompt') return <InstallPrompt />;
  return <>{children}</>;
}
