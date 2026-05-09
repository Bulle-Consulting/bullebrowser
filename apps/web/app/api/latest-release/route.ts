// JSON endpoint exposing the cached latest-release manifest, useful for
// the in-app updater UI or third-party integrations.

import { NextResponse } from 'next/server';
import { getLatestRelease } from '@/lib/releases';

export const revalidate = 300;

export async function GET() {
  const release = await getLatestRelease();
  if (!release) {
    return NextResponse.json({ available: false }, { status: 404 });
  }
  return NextResponse.json({ available: true, release });
}
