/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { product } from '@bullebrowser/brand-tokens';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-ink-secondary md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.svg"
            alt=""
            width={22}
            height={22}
            className="h-[22px] w-[22px] shrink-0 select-none"
            draggable={false}
          />
          <span>
            © {new Date().getFullYear()} {product.vendor}. All rights reserved.
          </span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/features" className="transition-colors hover:text-ink-primary">
            Features
          </Link>
          <Link href="/download" className="transition-colors hover:text-ink-primary">
            Download
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-ink-primary">
            Privacy
          </Link>
          <Link href="/about" className="transition-colors hover:text-ink-primary">
            About
          </Link>
          <a
            href={`mailto:${product.contactEmail}`}
            className="transition-colors hover:text-ink-primary"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
