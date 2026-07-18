'use client';

// Self-playing product explainer. Renders a faithful miniature of the
// BulleBrowser desktop app (tab strip, address bar, browser pane, and the
// right-hand AI panel) and loops through the actual Grant-scanner flow:
// prompt in → agent drives the browser with real tool calls → structured
// deliverable out. Pure DOM/CSS animation so it ships zero video bytes,
// stays crisp at every size, and is trivial to keep in sync with the app.

import { useCallback, useEffect, useRef, useState } from 'react';

const SCENE_MS = 5200;

const SCENES = [
  {
    id: 'ask',
    title: 'Ask once',
    caption:
      'Type what you need, in plain language. Pick a preset skill — Grant scanner, RFP comparator, or Compliance review.',
  },
  {
    id: 'drive',
    title: 'The agent drives a real browser',
    caption:
      'It opens SAM.gov and Grants.gov in real tabs — navigating, reading, and extracting with the same session a person would have.',
  },
  {
    id: 'deliver',
    title: 'You get the deliverable',
    caption:
      'A comparison table sorted by deadline, with a "what stands out" summary — ready to paste into your go/no-go memo.',
  },
  {
    id: 'private',
    title: 'Private by design',
    caption:
      'Bring your own Anthropic API key. Prompts go straight from your machine to your provider — never through Bulle. No telemetry.',
  },
] as const;

const AGENT_STEPS = [
  { tool: 'navigate', arg: 'sam.gov/search' },
  { tool: 'read_page', arg: 'results · 1–20' },
  { tool: 'extract', arg: 'table · 4 rows' },
  { tool: 'new_tab', arg: 'grants.gov' },
] as const;

const RESULTS = [
  { name: 'Workforce Pathways for Rural Youth', agency: 'DOL', value: '$2.5M', due: 'Aug 12' },
  { name: 'After-School STEM Capacity Building', agency: 'ED', value: '$1.1M', due: 'Aug 29' },
  { name: 'Trauma-Informed Schools', agency: 'HHS', value: '$750K', due: 'Sep 05' },
  { name: 'Apprenticeship Expansion Grant', agency: 'DOL', value: '$4.0M', due: 'Sep 18' },
] as const;

export function ProductExplainer() {
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return undefined;
    timer.current = setInterval(() => {
      setScene((s) => (s + 1) % SCENES.length);
    }, SCENE_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing]);

  const goTo = useCallback((i: number) => {
    setScene(i);
    // Restart the clock so a manual jump gets a full scene duration.
    setPlaying(false);
    requestAnimationFrame(() => setPlaying(true));
  }, []);

  const active = SCENES[scene] ?? SCENES[0];

  return (
    <figure aria-label="How BulleBrowser works, animated walkthrough" className="w-full">
      {/* Stage */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-dark shadow-[0_40px_120px_-40px_rgba(37,99,235,0.35)]">
        {/* Window chrome — mirrors the desktop app: traffic lights, tab strip, address bar, AI badge */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <div className="ml-3 flex items-center gap-1.5">
            <div className="flex h-6 items-center gap-1.5 rounded-md bg-white/10 px-2.5 text-[10px] text-white/80">
              SAM.gov · Opportunities
              <span className="text-white/40">×</span>
            </div>
            <div
              className={`flex h-6 items-center gap-1.5 rounded-md px-2.5 text-[10px] transition-all duration-500 ${
                scene >= 1 ? 'bg-white/5 text-white/60 opacity-100' : 'opacity-0'
              }`}
            >
              Grants.gov
              <span className="text-white/30">×</span>
            </div>
          </div>
          <div className="ml-auto flex h-6 min-w-0 flex-1 max-w-[240px] items-center overflow-hidden rounded-md bg-white/5 px-2.5 font-mono text-[10px] text-white/50">
            <span className="truncate">
              {scene >= 1
                ? 'sam.gov/search?keywords=youth+workforce'
                : 'bulle://newtab'}
            </span>
          </div>
          <div className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-medium text-white">
            AI
          </div>
        </div>

        {/* Body: browser pane + AI panel (380px in the real app) */}
        <div className="grid min-h-[320px] grid-cols-[1fr_190px] text-[11px] sm:grid-cols-[1fr_230px] sm:text-[12px]">
          {/* Browser pane */}
          <div className="relative border-r border-line p-4">
            {/* Scene 0 — empty new tab, waiting */}
            <div
              className={`absolute inset-4 transition-opacity duration-500 ${
                scene === 0 ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <div className="flex h-full flex-col items-center justify-center gap-2 text-white/30">
                <div className="h-8 w-8 rounded-lg border border-white/10 text-center text-lg font-bold leading-8 text-white/40">
                  B
                </div>
                <div className="text-[10px]">New tab — the agent will take it from here</div>
              </div>
            </div>

            {/* Scene 1 — agent browsing SAM.gov listings */}
            <div
              className={`absolute inset-4 transition-opacity duration-500 ${
                scene === 1 ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <div className="mb-2 font-semibold text-white/85">
                SAM.gov · Contract opportunities
              </div>
              <ul className="space-y-1.5">
                {RESULTS.map((r, i) => (
                  <li
                    key={r.name}
                    style={{ transitionDelay: `${i * 350}ms` }}
                    className={`flex items-center justify-between rounded-md border border-white/10 px-2.5 py-1.5 text-[10px] text-white/60 transition-all duration-500 ${
                      scene === 1 ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                    }`}
                  >
                    <span className="truncate pr-2">{r.name}</span>
                    <span className="shrink-0 text-white/40">
                      {r.agency} · {r.value}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-2.5 py-1 text-[10px] text-blue-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
                Agent is working — step 3 of 25 · Stop
              </div>
            </div>

            {/* Scene 2 — the deliverable */}
            <div
              className={`absolute inset-4 transition-opacity duration-500 ${
                scene === 2 ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <div className="mb-2 font-semibold text-white/85">
                Grant scan — 4 matches, sorted by deadline
              </div>
              <div className="overflow-hidden rounded-md border border-white/10">
                <table className="w-full text-left text-[10px]">
                  <thead className="bg-white/5 text-white/50">
                    <tr>
                      <th className="px-2 py-1.5 font-medium">Opportunity</th>
                      <th className="px-2 py-1.5 font-medium">Value</th>
                      <th className="px-2 py-1.5 font-medium">Deadline</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    {RESULTS.map((r, i) => (
                      <tr
                        key={r.name}
                        style={{ transitionDelay: `${i * 250}ms` }}
                        className={`border-t border-white/10 transition-opacity duration-500 ${
                          scene === 2 ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <td className="truncate px-2 py-1.5">{r.name}</td>
                        <td className="px-2 py-1.5">{r.value}</td>
                        <td className="px-2 py-1.5">{r.due}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-2 rounded-md border border-white/10 bg-white/5 p-2 text-[10px] leading-relaxed text-white/60">
                <span className="font-semibold text-white/80">What stands out:</span>{' '}
                Workforce Pathways is the strongest fit — largest award with the
                nearest workable deadline.
              </div>
            </div>

            {/* Scene 3 — privacy */}
            <div
              className={`absolute inset-4 transition-opacity duration-500 ${
                scene === 3 ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <div className="flex items-center gap-3 font-mono text-[10px] text-white/60">
                  <span className="rounded-md border border-white/15 px-2.5 py-1.5">
                    Your machine
                  </span>
                  <span className="text-blue-400">→</span>
                  <span className="rounded-md border border-white/15 px-2.5 py-1.5">
                    Your Anthropic key
                  </span>
                </div>
                <div className="text-[10px] text-white/40">
                  No Bulle servers in the path · keys in the OS keychain · no telemetry
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-white/60">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="4" y="10" width="16" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                  BYOK — bring your own key
                </div>
              </div>
            </div>
          </div>

          {/* AI panel */}
          <div className="flex flex-col bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-white/85">AI agent</span>
              <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-white/50">
                Grant scanner
              </span>
            </div>

            {/* User prompt — types in during scene 0, stays visible after */}
            <div className="rounded-md bg-primary/20 p-2 text-[10px] leading-relaxed text-blue-100">
              {scene === 0 ? (
                <TypedText text="Find youth workforce grants under $3M closing in the next 60 days." />
              ) : (
                'Find youth workforce grants under $3M closing in the next 60 days.'
              )}
            </div>

            {/* Tool steps — appear during scene 1 */}
            <div className="mt-2 space-y-1">
              {AGENT_STEPS.map((s, i) => (
                <div
                  key={s.tool + s.arg}
                  style={{ transitionDelay: scene === 1 ? `${i * 500}ms` : '0ms' }}
                  className={`flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 font-mono text-[9px] text-white/55 transition-all duration-500 ${
                    scene >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                  }`}
                >
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  <span className="text-emerald-300/90">{s.tool}</span>
                  <span className="truncate text-white/35">{s.arg}</span>
                </div>
              ))}
            </div>

            {/* Agent reply — scene 2+ */}
            <div
              className={`mt-2 rounded-md bg-white/5 p-2 text-[10px] leading-relaxed text-white/70 transition-all duration-500 ${
                scene >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
              }`}
            >
              Done — 4 matches in a table sorted by deadline, summary below it.
              12 tool calls, well under the 25-step cap.
            </div>

            <div className="mt-auto flex h-7 items-center rounded-md border border-white/10 px-2 text-[9px] text-white/30">
              Ask the agent anything…
            </div>
          </div>
        </div>
      </div>

      {/* Player bar: scene chips + progress, styled like video controls */}
      <figcaption className="mt-5">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause walkthrough' : 'Play walkthrough'}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink-secondary transition-colors hover:border-line-strong hover:text-ink-primary"
          >
            {playing ? (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <rect x="1" y="1" width="3" height="8" rx="0.5" />
                <rect x="6" y="1" width="3" height="8" rx="0.5" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <path d="M2 1l7 4-7 4z" />
              </svg>
            )}
          </button>
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Scene ${i + 1}: ${s.title}`}
              aria-current={i === scene}
              className="group flex-1 max-w-[140px]"
            >
              <span className="block h-1 overflow-hidden rounded-full bg-line">
                <span
                  className={`block h-full rounded-full bg-primary ${
                    i <= scene ? 'w-full' : 'w-0'
                  }`}
                  style={
                    i === scene
                      ? {
                          animation: `explainer-progress ${SCENE_MS}ms linear`,
                          animationPlayState: playing ? 'running' : 'paused',
                        }
                      : undefined
                  }
                />
              </span>
            </button>
          ))}
        </div>
        <p
          key={active.id}
          className="explainer-caption mx-auto mt-4 max-w-xl text-center text-sm text-ink-secondary"
        >
          <span className="font-medium text-ink-primary">{active.title}.</span>{' '}
          {active.caption}
        </p>
      </figcaption>

    </figure>
  );
}

// Simple CSS-driven "typing" effect for the user's prompt.
function TypedText({ text }: { text: string }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    setShown(0);
    const id = setInterval(() => {
      setShown((n) => {
        if (n >= text.length) {
          clearInterval(id);
          return n;
        }
        return n + 2;
      });
    }, 40);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span>
      {text.slice(0, shown)}
      {shown < text.length && <span className="animate-pulse">▍</span>}
    </span>
  );
}
