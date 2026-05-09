import type { Metadata } from 'next';
import { product } from '@bullebrowser/brand-tokens';
import { formatBytes, getLatestRelease, type Platform } from '@/lib/releases';

export const metadata: Metadata = {
  title: 'Download',
  description: `Download ${product.name} for macOS, Windows, or Linux.`,
};

const PLATFORMS: { key: Platform; label: string; req: string }[] = [
  { key: 'mac-arm64', label: 'macOS · Apple Silicon (.dmg)', req: 'macOS 12 or newer' },
  { key: 'mac-x64', label: 'macOS · Intel (.dmg)', req: 'macOS 12 or newer' },
  { key: 'win-x64', label: 'Windows 10/11 · x64 (.exe)', req: 'Windows 10 or newer' },
  { key: 'win-arm64', label: 'Windows · ARM64 (.exe)', req: 'Windows 11 ARM' },
  { key: 'linux-x64', label: 'Linux · x64 (.AppImage)', req: 'glibc 2.31+' },
  { key: 'linux-arm64', label: 'Linux · ARM64 (.AppImage)', req: 'glibc 2.31+' },
];

export default async function DownloadPage() {
  const release = await getLatestRelease();
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold">Download {product.name}</h1>
      <p className="mt-2 text-ink-secondary">
        {release
          ? `Latest release: ${release.tagName} · published ${new Date(
              release.publishedAt,
            ).toLocaleDateString()}`
          : 'No releases published yet. Check back soon.'}
      </p>
      <div className="mt-8 overflow-hidden rounded-lg border border-line">
        <table className="w-full text-sm">
          <thead className="bg-surface-muted text-left text-xs uppercase tracking-wide text-ink-secondary">
            <tr>
              <th className="px-4 py-3">Platform</th>
              <th className="px-4 py-3">Requirements</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">SHA-256</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {PLATFORMS.map((p) => {
              const asset = release?.downloadFor?.[p.key];
              return (
                <tr key={p.key} className="border-t border-line">
                  <td className="px-4 py-3">{p.label}</td>
                  <td className="px-4 py-3 text-ink-secondary">{p.req}</td>
                  <td className="px-4 py-3 text-ink-secondary">
                    {asset ? formatBytes(asset.size) : '—'}
                  </td>
                  <td className="px-4 py-3 text-ink-secondary">
                    {release?.checksumsAsset ? (
                      <a
                        href={release.checksumsAsset.browserDownloadUrl}
                        className="text-primary underline"
                      >
                        checksums.txt
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {asset ? (
                      <a
                        href={asset.browserDownloadUrl}
                        className="rounded bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-hover"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-ink-secondary text-xs">Unavailable</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-xs text-ink-secondary">
        Verify the SHA-256 of your download against checksums.txt before
        installing. Releases are signed by Bulle Consulting on macOS and
        Windows.
      </p>
    </div>
  );
}
