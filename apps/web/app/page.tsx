import { product } from '@bullebrowser/brand-tokens';
import { DownloadButton } from '@/components/DownloadButton';
import { ProductExplainer } from '@/components/ProductExplainer';

const SKILLS = [
  {
    title: 'Grant scanner',
    body: 'Tell the agent what you fund or pursue. It searches SAM.gov and Grants.gov, follows listings into detail pages, and returns a comparison table sorted by deadline.',
  },
  {
    title: 'RFP comparator',
    body: 'Paste 2 to 4 RFP URLs. The agent reads each end-to-end and hands back deadline, scope, eligibility, value, and evaluation criteria — side by side.',
  },
  {
    title: 'Compliance review',
    body: 'Drop a document. The agent flags clauses against EEO, FERPA, and ADA — plus your own checklist — with quoted text and section references.',
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Ask',
    body: 'One plain-language prompt, or a preset skill. No scripts, no selectors, no setup.',
  },
  {
    n: '02',
    title: 'The agent browses',
    body: 'It opens tabs, reads pages, clicks, types, and extracts structured data — in a visible, stoppable loop capped at 25 steps.',
  },
  {
    n: '03',
    title: 'You ship',
    body: 'Sorted tables, side-by-side breakdowns, flagged clauses with references. Deliverables, not search results.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — centered, Comet-style */}
      <section className="glow relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-6 pb-16 pt-24 text-center md:pt-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-xs text-ink-secondary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Agentic AI by {product.vendor}
          </div>
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
            The browser that does
            <br className="hidden sm:block" /> the work for you.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-ink-secondary md:text-lg">
            {product.name} pairs a real desktop browser with a Claude-powered
            agent purpose-built for grant scanning, RFP triage, and compliance
            review — the research that eats your week, done in minutes.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <DownloadButton />
            <a
              href="#how-it-works"
              className="text-sm text-ink-secondary underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink-primary"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Explainer walkthrough — the product, playing itself */}
        <div id="how-it-works" className="mx-auto max-w-4xl scroll-mt-24 px-6 pb-24">
          <ProductExplainer />
        </div>
      </section>

      {/* Three steps */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-balance text-center text-3xl font-semibold tracking-tight md:text-4xl">
            The agent does the work.
            <br />
            <span className="text-ink-secondary">You ship the deliverable.</span>
          </h2>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n}>
                <div className="font-mono text-xs text-ink-faint">{s.n}</div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preset skills */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Three skills, one prompt each.
          </h2>
          <p className="mt-3 max-w-2xl text-ink-secondary">
            Preset workflows for the most common research tasks at nonprofits,
            government agencies, and the firms that serve them — each one a
            one-prompt replacement for an afternoon of tabs.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {SKILLS.map((s) => (
              <article
                key={s.title}
                className="rounded-xl border border-line bg-surface-muted p-6 transition-colors hover:border-line-strong"
              >
                <h3 className="text-base font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Your data, your provider.
            </h2>
            <p className="mt-4 leading-relaxed text-ink-secondary">
              {product.name} is bring-your-own-key. Prompts go directly from
              your machine to Anthropic — nothing is routed through{' '}
              {product.vendor}, and there is no telemetry in v1.
            </p>
          </div>
          <ul className="space-y-4 text-sm">
            <Bullet>API key stored encrypted in the OS keychain</Bullet>
            <Bullet>Browsing history and conversations stored locally</Bullet>
            <Bullet>Per-tool destructive-action confirmation</Bullet>
            <Bullet>Hard 25-step cap per agent task</Bullet>
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="glow border-t border-line">
        <div className="mx-auto max-w-4xl px-6 py-28 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Put the agent to work.
          </h2>
          <p className="mt-3 text-ink-secondary">
            Free download for macOS, Windows, and Linux. Bring your own
            Anthropic API key.
          </p>
          <div className="mt-10 flex justify-center">
            <DownloadButton />
          </div>
        </div>
      </section>
    </>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#3B82F6"
        strokeWidth="2.5"
        className="mt-0.5 shrink-0"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span className="text-ink-primary/90">{children}</span>
    </li>
  );
}
