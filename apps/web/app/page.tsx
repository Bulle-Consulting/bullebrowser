import { product } from '@bullebrowser/brand-tokens';
import { DownloadButton } from '@/components/DownloadButton';
import { BrowserMockup } from '@/components/BrowserMockup';

const HIGHLIGHTS = [
  {
    title: 'Grant scanner',
    body: 'Sweep SAM.gov and Grants.gov for opportunities matching your keywords. The agent runs the searches, extracts the listings, and returns a comparison table sorted by deadline.',
  },
  {
    title: 'RFP comparator',
    body: 'Paste 2 to 4 RFP URLs. The agent reads each, lifts the deadline, scope, eligibility, value, and evaluation criteria, and returns a side-by-side breakdown.',
  },
  {
    title: 'Compliance review',
    body: 'Drop a document and the agent flags clauses against EEO, FERPA, ADA — plus any checklist items you add. Quoted clauses with section references.',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-surface-dark text-ink-inverse">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              By {product.vendor}
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              {product.tagline}.
            </h1>
            <p className="mt-4 max-w-xl text-base text-ink-inverse/80">
              {product.name} is a desktop browser with a built-in AI agent that
              can navigate, read, and extract from the web on your behalf.
              Purpose-built for grant research, RFP triage, and compliance
              review. Bring your own Anthropic API key — your prompts go
              straight to your provider, never to {product.vendor}.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DownloadButton />
              <a href="#how-it-works" className="text-sm text-ink-inverse/80 underline">
                See how it works
              </a>
            </div>
          </div>
          <div className="relative">
            <BrowserMockup />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold">Built for the work you actually do.</h2>
        <p className="mt-2 max-w-2xl text-ink-secondary">
          Three preset skills for the most common research tasks at nonprofits,
          government agencies, and the firms that serve them.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {HIGHLIGHTS.map((h) => (
            <article
              key={h.title}
              className="rounded-lg border border-line bg-surface-muted p-6"
            >
              <h3 className="text-lg font-semibold">{h.title}</h3>
              <p className="mt-2 text-sm text-ink-secondary">{h.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-surface-muted">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold">Your data, your provider.</h2>
            <p className="mt-3 text-ink-secondary">
              {product.name} uses BYOK — bring your own Anthropic API key.
              Prompts go directly from your machine to Anthropic. Nothing is
              routed through {product.vendor}. There is no telemetry in v1.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-ink-primary">
            <Bullet>API key stored encrypted in the OS keychain</Bullet>
            <Bullet>Browsing history and conversations stored locally</Bullet>
            <Bullet>Per-tool destructive-action confirmation</Bullet>
            <Bullet>Hard 25-step cap per agent task</Bullet>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">Ready to try it?</h2>
        <p className="mt-2 text-ink-secondary">
          Free download. Works on macOS, Windows, and Linux.
        </p>
        <div className="mt-8 inline-block">
          <DownloadButton />
        </div>
      </section>
    </>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2563EB"
        strokeWidth="2.5"
        className="mt-0.5 shrink-0"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span>{children}</span>
    </li>
  );
}
