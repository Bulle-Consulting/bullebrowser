/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { product } from '@bullebrowser/brand-tokens';

const NAV = [
  { href: '/features', label: 'Features' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/about', label: 'About' },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface-base/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label={product.name}
          className="flex items-center gap-2.5"
        >
          <img
            src="/logo.svg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 select-none"
            draggable={false}
          />
          <span className="text-[15px] font-semibold leading-none tracking-tight text-ink-primary">
            {product.name}
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden rounded-full px-3 py-1.5 text-ink-secondary transition-colors hover:text-ink-primary sm:inline-block"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/download"
            className="ml-2 rounded-full bg-ink-primary px-4 py-1.5 text-sm font-medium text-ink-inverse transition-opacity hover:opacity-85"
          >
            Download
          </Link>
        </nav>
      </div>
    </header>
  );
}
