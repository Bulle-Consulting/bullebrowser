# Releasing BulleBrowser

End-to-end checklist for shipping a new version.

## 0. Prerequisites (one-time)

### GitHub repository secrets

Configure the following under **Settings → Secrets and variables → Actions**:

| Secret | Used by | Purpose |
|---|---|---|
| `MACOS_CERTIFICATE` | `build-desktop.yml` | Base64 of the `.p12` Developer ID Application certificate |
| `MACOS_CERTIFICATE_PASSWORD` | `build-desktop.yml` | Password for the `.p12` |
| `APPLE_ID` | `build-desktop.yml` | Apple ID used for notarization |
| `APPLE_APP_SPECIFIC_PASSWORD` | `build-desktop.yml` | App-specific password generated at appleid.apple.com |
| `APPLE_TEAM_ID` | `build-desktop.yml` | 10-character Apple Developer Team ID |
| `WINDOWS_CERTIFICATE` | `build-desktop.yml` | Base64 of the `.pfx` Authenticode signing certificate |
| `WINDOWS_CERTIFICATE_PASSWORD` | `build-desktop.yml` | Password for the `.pfx` |
| `VERCEL_TOKEN` | `deploy-web.yml` | Personal Vercel token with deploy rights |
| `VERCEL_ORG_ID` | `deploy-web.yml` | From `vercel link` (`.vercel/project.json`) |
| `VERCEL_PROJECT_ID` | `deploy-web.yml` | From `vercel link` (`.vercel/project.json`) |

### Vercel and DNS for `bullebrowser.com`

1. Run `pnpm dlx vercel link` inside `apps/web` once and select the
   target Vercel project. This populates `.vercel/project.json`; copy
   `orgId` and `projectId` into the repo secrets.
2. Add `bullebrowser.com` and `www.bullebrowser.com` as production
   domains for the project in the Vercel dashboard.
3. At your domain registrar set:
   - `bullebrowser.com` → `A 76.76.21.21` (Vercel apex)
   - `www.bullebrowser.com` → `CNAME cname.vercel-dns.com`

## 1. Bump the version

```
# in repo root
pnpm version --workspaces patch    # or minor / major
git add .
git commit -m "chore(release): bump to v$(node -p "require('./apps/desktop/package.json').version")"
git push origin main
```

## 2. Tag the release

```
TAG="v$(node -p "require('./apps/desktop/package.json').version")"
git tag "$TAG"
git push origin "$TAG"
```

The push to a `v*.*.*` tag triggers `build-desktop.yml`, which:

1. Runs typecheck + tests in parallel on macOS, Windows, and Linux runners.
2. Builds the Electron app on each platform with code signing.
3. Notarizes the macOS build via `notarytool`.
4. Computes SHA-256 checksums.
5. Publishes a GitHub Release with all installers and `checksums.txt`
   attached, plus auto-generated notes from Conventional Commits since
   the previous tag.

## 3. Verify the release

- Download each installer from the release page and run it on a clean VM.
- Confirm the in-app About page shows the new version and a populated
  third-party-notices table.
- Confirm `electron-updater` picks up the release (older builds will
  prompt to update on next launch).

## 4. Deploy the web changes

The `deploy-web.yml` workflow runs automatically on any push to `main`
that touches `apps/web/**` or shared packages. The new release becomes
visible on bullebrowser.com within 5 minutes (the latest-release fetch
is cached for 5 minutes server-side).

## 5. Rollback

If a release is broken:

1. Mark the GitHub Release as **draft** so users on stale clients don't
   auto-update.
2. Tag the previous good version as `latest` by editing the older release.
3. Investigate, ship a fix, and follow steps 1-4 again.

## Conventional Commit cheatsheet

```
feat(scope):  user-visible new capability
fix(scope):   bug fix
perf(scope):  speed/memory improvement
refactor:     internal change, no behavior delta
docs:         docs only
chore:        tooling, configs, deps
```

Allowed scopes: `desktop`, `web`, `agent-core`, `brand-tokens`,
`release`, `docs`, `repo`.
