import Link from 'next/link';
import { product } from '@bullebrowser/brand-tokens';

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-ink-secondary md:flex-row md:items-center md:justify-between">
        <div>
          © {new Date().getFullYear()} {product.vendor}. All rights reserved.
        </div>
        <nav className="flex flex-wrap gap-4">
          <Link href="/features" className="hover:text-ink-primary">
            Features
          </Link>
          <Link href="/download" className="hover:text-ink-primary">
            Download
          </Link>
          <Link href="/privacy" className="hover:text-ink-primary">
            Privacy
          </Link>
          <Link href="/about" className="hover:text-ink-primary">
            About
          </Link>
          <a href={`mailto:${product.contactEmail}`} className="hover:text-ink-primary">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
