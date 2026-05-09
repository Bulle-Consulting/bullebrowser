# Desktop resources

Files in this folder ship with the packaged app via `electron-builder`.

| File | Required for | Replace with |
|------|--------------|--------------|
| `icon.icns` | macOS .dmg / .zip | 1024×1024 master exported as `.icns` |
| `icon.ico`  | Windows NSIS .exe | 256×256 multi-resolution `.ico` |
| `icon.png`  | Linux .AppImage / .deb | 512×512 `.png` |
| `entitlements.mac.plist` | macOS notarization | Already committed |

The committed SVGs in `packages/brand-tokens/assets/` are the source of
truth for the wordmark and the rounded-square monogram. Generate the
three platform binaries from the master logo before the first signed
release using any standard converter (e.g. `iconutil` on macOS, an
online .ico generator, `convert` from ImageMagick for the .png).

To swap in a new wordmark:

1. Drop the new dark-text SVG at `packages/brand-tokens/assets/wordmark.svg`.
2. Drop the new light-text (white) SVG at
   `packages/brand-tokens/assets/wordmark-light.svg`.
3. Re-copy them to `apps/web/public/` (the landing page reads from there)
   or run `pnpm dev:web` and the file watcher picks them up.

Both the desktop splash and the in-app About modal pull the wordmark
from the brand-tokens package, so there is exactly one place to update.
