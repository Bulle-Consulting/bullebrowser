// Server-side helper for fetching the latest GitHub Release. Cached at the
// edge for 5 minutes to stay well under GitHub's anonymous rate limit.

import { product } from '@bullebrowser/brand-tokens';

export type Platform = 'mac-arm64' | 'mac-x64' | 'win-x64' | 'win-arm64' | 'linux-x64' | 'linux-arm64';

export interface ReleaseAsset {
  name: string;
  browserDownloadUrl: string;
  size: number;
  contentType: string;
}

export interface LatestRelease {
  tagName: string;
  publishedAt: string;
  htmlUrl: string;
  assets: ReleaseAsset[];
  // Convenience map of detected installers per platform.
  downloadFor: Partial<Record<Platform, ReleaseAsset>>;
  checksumsAsset?: ReleaseAsset;
}

const REPO_OWNER = 'wardere83';
const REPO_NAME = 'bullebrowser';

export async function getLatestRelease(): Promise<LatestRelease | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent': `${product.name}-Web`,
        },
        next: { revalidate: 300 }, // 5 minutes
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      tag_name: string;
      published_at: string;
      html_url: string;
      assets: Array<{
        name: string;
        browser_download_url: string;
        size: number;
        content_type: string;
      }>;
    };
    const assets: ReleaseAsset[] = data.assets.map((a) => ({
      name: a.name,
      browserDownloadUrl: a.browser_download_url,
      size: a.size,
      contentType: a.content_type,
    }));
    return {
      tagName: data.tag_name,
      publishedAt: data.published_at,
      htmlUrl: data.html_url,
      assets,
      downloadFor: detectPlatformAssets(assets),
      checksumsAsset: assets.find((a) => /checksum/i.test(a.name)),
    };
  } catch {
    return null;
  }
}

function detectPlatformAssets(assets: ReleaseAsset[]): LatestRelease['downloadFor'] {
  const map: LatestRelease['downloadFor'] = {};
  for (const a of assets) {
    const n = a.name.toLowerCase();
    if (n.endsWith('.dmg') && n.includes('arm64')) map['mac-arm64'] = a;
    else if (n.endsWith('.dmg')) map['mac-x64'] ??= a;
    else if (n.endsWith('.exe') && n.includes('arm64')) map['win-arm64'] = a;
    else if (n.endsWith('.exe')) map['win-x64'] ??= a;
    else if (n.endsWith('.appimage') && n.includes('arm64')) map['linux-arm64'] = a;
    else if (n.endsWith('.appimage')) map['linux-x64'] ??= a;
  }
  return map;
}

export function detectPlatform(userAgent: string): Platform {
  const ua = userAgent.toLowerCase();
  if (ua.includes('mac')) return ua.includes('arm') ? 'mac-arm64' : 'mac-arm64';
  if (ua.includes('windows')) return ua.includes('arm') ? 'win-arm64' : 'win-x64';
  return 'linux-x64';
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let v = bytes / 1024;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i += 1;
  }
  return `${v.toFixed(1)} ${units[i]}`;
}
