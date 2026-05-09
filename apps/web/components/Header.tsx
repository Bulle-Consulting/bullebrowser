import Link from 'next/link';
import { product } from '@bullebrowser/brand-tokens';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface-light/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-base font-semibold tracking-tight">{product.name}</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/features" className="text-ink-secondary hover:text-ink-primary">
            Features
          </Link>
          <Link href="/privacy" className="text-ink-secondary hover:text-ink-primary">
            Privacy
          </Link>
          <Link href="/about" className="text-ink-secondary hover:text-ink-primary">
            About
          </Link>
          <Link
            href="/download"
            className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-hover"
          >
            Download
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <svg width={28} height={28} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <linearGradient id="hdr-bb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#hdr-bb)" />
      <path
        d="M21 17h13.5c5.4 0 9 2.7 9 7.4 0 3-1.6 5.1-4.5 6.2 3.7 1 5.8 3.4 5.8 7 0 5-3.8 7.9-9.7 7.9H21V17zm6.6 5v8.1h6.3c2.7 0 4.3-1.5 4.3-4 0-2.6-1.6-4.1-4.3-4.1h-6.3zm0 12.8v8.6h7.1c2.9 0 4.6-1.6 4.6-4.3 0-2.8-1.7-4.3-4.6-4.3h-7.1z"
        fill="#fff"
      />
      <circle cx="49" cy="48" r="5" fill="#F59E0B" />
    </svg>
  );
}
