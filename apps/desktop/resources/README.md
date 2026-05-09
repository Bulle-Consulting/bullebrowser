# Desktop resources

This folder ships with the packaged app via `electron-builder`.

| File | Required | Purpose |
|------|----------|---------|
| `icon.icns` | macOS builds | App icon (1024×1024 master) |
| `icon.ico`  | Windows builds | App icon |
| `icon.png`  | Linux builds | App icon (512×512) |
| `entitlements.mac.plist` | macOS notarization | Hardened runtime entitlements |

Generate the platform icons from `packages/brand-tokens/assets/logo.svg`
before the first signed release. We commit only the SVG source and the
generated platform binaries to keep the diff readable.
