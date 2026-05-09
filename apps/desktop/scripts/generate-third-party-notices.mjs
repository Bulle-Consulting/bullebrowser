#!/usr/bin/env node
/**
 * Walks the desktop app's resolved dependency tree via license-checker
 * and writes a compact JSON file consumed by the in-app About page.
 * Runs at build time (electron-vite hook); committed output lives only
 * in `out/renderer/third-party-notices.json`.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import licenseChecker from 'license-checker';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');
const outPath = resolve(repoRoot, 'out/renderer/third-party-notices.json');

licenseChecker.init(
  {
    start: repoRoot,
    production: true,
    json: true,
    excludePrivatePackages: true,
  },
  (err, packages) => {
    if (err) {
      console.error('[notices] license-checker failed:', err);
      process.exit(1);
    }
    const notices = Object.entries(packages)
      .map(([key, info]) => {
        const [name, version] = splitNameVersion(key);
        return { name, version, license: info.licenses ?? 'UNKNOWN' };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, JSON.stringify(notices, null, 2));
    console.log(`[notices] wrote ${notices.length} entries to ${outPath}`);
  },
);

function splitNameVersion(key) {
  // Names can be scoped like @scope/name@1.2.3
  const lastAt = key.lastIndexOf('@');
  if (lastAt <= 0) return [key, ''];
  return [key.slice(0, lastAt), key.slice(lastAt + 1)];
}
