// Server component. Detects the visitor's OS from the request headers,
// then renders a primary CTA pointing at the right installer for the
// latest GitHub release. Falls back to /download when nothing matches.

import Link from 'next/link';
import { headers } from 'next/headers';
import {
  detectPlatform,
  formatBytes,
  getLatestRelease,
  type Platform,
} from '@/lib/releases';

const PLATFORM_LABEL: Record<Platform, string> = {
  'mac-arm64': 'Download for macOS (Apple Silicon)',
  'mac-x64': 'Download for macOS (Intel)',
  'win-x64': 'Download for Windows',
  'win-arm64': 'Download for Windows (ARM)',
  'linux-x64': 'Download for Linux',
  'linux-arm64': 'Download for Linux (ARM)',
};

export async function DownloadButton({ size = 'lg' }: { size?: 'lg' | 'md' }) {
  const release = await getLatestRelease();
  const ua = (await headers()).get('user-agent') ?? '';
  const platform = detectPlatform(ua);
  const asset = release?.downloadFor?.[platform];
  const cls =
    size === 'lg'
      ? 'rounded-full bg-ink-primary px-6 py-3 text-base font-semibold text-ink-inverse shadow-[0_0_40px_-12px_rgba(244,244,245,0.5)] transition-opacity hover:opacity-85'
      : 'rounded-full bg-ink-primary px-4 py-2 text-sm font-semibold text-ink-inverse transition-opacity hover:opacity-85';

  if (!asset) {
    return (
      <Link href="/download" className={cls}>
        Download BulleBrowser
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <a href={asset.browserDownloadUrl} className={cls}>
        {PLATFORM_LABEL[platform]}
      </a>
      <div className="text-xs text-ink-faint">
        {release?.tagName} · {formatBytes(asset.size)} ·{' '}
        <Link href="/download" className="underline underline-offset-2 hover:text-ink-secondary">
          all platforms
        </Link>
      </div>
    </div>
  );
}
