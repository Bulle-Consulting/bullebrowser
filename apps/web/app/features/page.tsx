import type { Metadata } from 'next';
import { product } from '@bullebrowser/brand-tokens';
import { DownloadButton } from '@/components/DownloadButton';

export const metadata: Metadata = {
  title: 'Features',
  description: `Agent capabilities, preset skills, and privacy posture of ${product.name}.`,
};

export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 prose-lite">
      <h1 className="text-4xl font-bold">Features</h1>
      <p className="text-ink-secondary">
        {product.name} is a desktop browser with an AI agent built on
        Anthropic&apos;s tool use. The agent operates the browser like a
        person — opening tabs, reading pages, clicking, typing, and
        extracting structured data — but in a deterministic, stoppable loop.
      </p>

      <h2>Agent capabilities</h2>
      <p>
        The agent has access to ten tools backed by the live browser
        engine on the active tab — same DOM, same network stack, same
        cookies as a human visitor:
      </p>
      <ul>
        <li><strong>navigate</strong> — go to a URL</li>
        <li><strong>read_page</strong> — return cleaned, readable text</li>
        <li><strong>click</strong> — click by selector or visible text</li>
        <li><strong>type</strong> — type into an input by selector or label</li>
        <li><strong>extract</strong> — pull structured data per JSON schema</li>
        <li><strong>screenshot</strong> — capture the viewport</li>
        <li><strong>new_tab / switch_tab / list_tabs</strong> — manage tabs</li>
        <li><strong>wait_for</strong> — wait for a selector or network idle</li>
      </ul>
      <p>
        Each task is capped at 25 tool calls. A visible &quot;Agent is
        working&quot; indicator shows the current step, and a Stop button
        cancels in-flight work immediately. Destructive actions (form
        submits, downloads) require an explicit confirmation.
      </p>

      <h2>Preset skills</h2>
      <h3>Grant scanner</h3>
      <p>
        You provide keywords. The agent navigates SAM.gov and Grants.gov,
        runs the searches, extracts the listings, and returns a Markdown
        comparison table sorted by deadline, with a one-paragraph
        &quot;what stands out&quot; summary at the bottom.
      </p>

      <h3>RFP comparator</h3>
      <p>
        You paste 2 to 4 RFP URLs. The agent reads each in turn and
        returns a side-by-side breakdown of issuing organization, deadline,
        scope, eligibility, value, and evaluation criteria.
      </p>

      <h3>Compliance review</h3>
      <p>
        You drop a URL or upload a document. The agent flags clauses
        against EEO, FERPA, and ADA — plus any checklist items you add in
        Settings. Output includes quoted clauses and section references.
      </p>

      <h2>Privacy posture</h2>
      <ul>
        <li>BYOK: your prompts go straight to Anthropic, never to {product.vendor}.</li>
        <li>API keys live in the OS keychain (Keychain on macOS, libsecret on Linux, DPAPI on Windows).</li>
        <li>Browsing history, bookmarks, and conversations are stored locally.</li>
        <li>No telemetry in v1.</li>
      </ul>

      <div className="mt-8">
        <DownloadButton />
      </div>
    </div>
  );
}
