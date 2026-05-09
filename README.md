# BulleBrowser

> The agentic browser for grants, RFPs, and compliance work.

BulleBrowser is a desktop browser by [Bulle Consulting](https://bulleconsulting.com)
with a built-in AI agent purpose-built for grants research, RFP comparison, and
compliance review workflows. Bring your own Anthropic API key — your prompts go
to your provider, never to Bulle.

## Repository layout

```
bullebrowser/
├── apps/
│   ├── desktop/        # The BulleBrowser desktop application
│   └── web/            # Landing page (bullebrowser.com)
├── packages/
│   ├── agent-core/     # Tool registry and agent loop
│   └── brand-tokens/   # Shared design tokens (colors, type, logo)
├── docs/
│   ├── ARCHITECTURE.md
│   └── RELEASING.md
└── .github/workflows/  # Build & deploy pipelines
```

## Prerequisites

- Node.js 20.11 or newer
- pnpm 9 or newer (`npm install -g pnpm`)

## Getting started

```bash
pnpm install
pnpm dev          # launch the desktop app
pnpm dev:web      # launch the landing page locally
```

## Common scripts

| Script                | What it does                          |
|-----------------------|----------------------------------------|
| `pnpm dev`            | Run the desktop app in dev mode        |
| `pnpm build`          | Build all packages and apps            |
| `pnpm package:desktop`| Produce signed installers (CI)         |
| `pnpm test`           | Run unit tests across the workspace    |
| `pnpm lint`           | Lint all workspaces                    |
| `pnpm typecheck`      | Type-check all workspaces              |

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md). All changes use Conventional
Commit messages.

## License

BulleBrowser is proprietary software licensed under the terms in
[`LICENSE`](./LICENSE). Open source dependencies retain their original
licenses; the full list is generated at build time and shown in the in-app
About page.
