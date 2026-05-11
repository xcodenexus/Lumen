import { ThemeToggle } from "@/components/common/ThemeToggle";

interface SwatchProps {
  label: string;
  variable: string;
  bg: string;
  textClass?: string;
}

function Swatch({ label, variable, bg, textClass = "text-text-primary" }: SwatchProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border-subtle">
      <div className={`h-14 w-full ${bg}`} />
      <div className="bg-bg-raised px-3 py-2">
        <p className={`text-xs font-medium ${textClass}`}>{label}</p>
        <p className="text-xs text-text-tertiary font-mono">{variable}</p>
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-6">
      <div className="border-b border-border-subtle pb-3">
        <h2 className="text-lg font-semibold text-text-primary font-display">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border-subtle bg-bg-raised/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">
          <div>
            <h1 className="text-xl font-semibold font-display text-text-primary">
              Lumen Design System
            </h1>
            <p className="text-xs text-text-tertiary mt-0.5">
              Phase 0 — Visual QA Styleguide
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-tertiary">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl space-y-16 px-8 py-12">

        {/* ─── Colors ─────────────────────────────────────────── */}
        <Section title="Colors">
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                Surfaces
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <Swatch label="bg-base" variable="--bg-base" bg="bg-bg-base" />
                <Swatch label="bg-raised" variable="--bg-raised" bg="bg-bg-raised" />
                <Swatch label="bg-sunken" variable="--bg-sunken" bg="bg-bg-sunken" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                Borders
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Swatch label="border-subtle" variable="--border-subtle" bg="bg-border-subtle" />
                <Swatch label="border-strong" variable="--border-strong" bg="bg-border-strong" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                Text
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <Swatch label="text-primary" variable="--text-primary" bg="bg-text-primary" textClass="text-bg-base" />
                <Swatch label="text-secondary" variable="--text-secondary" bg="bg-text-secondary" textClass="text-bg-base" />
                <Swatch label="text-tertiary" variable="--text-tertiary" bg="bg-text-tertiary" textClass="text-bg-base" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                Brand Accent
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <Swatch label="lumen-accent" variable="--lumen-accent" bg="bg-lumen-accent" textClass="text-white" />
                <Swatch label="lumen-accent-soft" variable="--lumen-accent-soft" bg="bg-lumen-accent-soft" />
                <Swatch label="lumen-accent-fg" variable="--lumen-accent-fg" bg="bg-lumen-accent-fg" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                Status
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <Swatch label="success" variable="--lumen-success" bg="bg-lumen-success" textClass="text-white" />
                <Swatch label="warn" variable="--lumen-warn" bg="bg-lumen-warn" textClass="text-white" />
                <Swatch label="error" variable="--lumen-error" bg="bg-lumen-error" textClass="text-white" />
              </div>
            </div>
          </div>
        </Section>

        {/* ─── Typography ─────────────────────────────────────── */}
        <Section title="Typography">
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-6">
                Type Scale — Geist Sans
              </h3>
              <div className="space-y-4 rounded-xl border border-border-subtle bg-bg-raised p-6">
                {[
                  { label: "2xl / 28px", cls: "text-2xl font-semibold font-display" },
                  { label: "xl / 20px", cls: "text-xl font-semibold font-display" },
                  { label: "lg / 17px", cls: "text-lg" },
                  { label: "md / 15px", cls: "text-md" },
                  { label: "base / 14px", cls: "text-base" },
                  { label: "sm / 13px", cls: "text-sm" },
                  { label: "xs / 11px", cls: "text-xs" },
                ].map(({ label, cls }) => (
                  <div key={label} className="flex items-baseline gap-6">
                    <span className="w-28 shrink-0 text-xs text-text-tertiary font-mono">
                      {label}
                    </span>
                    <span className={cls}>
                      What are we building today?
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-6">
                Newsreader — Assistant body & display headlines
              </h3>
              <div className="space-y-4 rounded-xl border border-border-subtle bg-bg-raised p-6">
                <p className="font-serif text-2xl text-text-primary">
                  What are we building today?
                </p>
                <p className="font-serif text-md text-text-primary leading-relaxed">
                  Atlas is a research analyst. The right answer depends on a few
                  things you didn&apos;t mention. Let me ask one clarifying question
                  before diving in — do you want to handle sales tax and VAT
                  yourself, or do you want the payment provider to act as Merchant
                  of Record?
                </p>
                <p className="font-serif italic text-md text-text-secondary">
                  That single choice changes the recommendation significantly.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-6">
                Geist Mono — Code & data
              </h3>
              <div className="rounded-xl border border-border-subtle bg-bg-sunken p-6">
                <div className="mb-3 flex items-center justify-between border-b border-border-subtle pb-3">
                  <span className="text-xs text-text-tertiary font-mono">typescript</span>
                  <button className="text-xs text-text-tertiary hover:text-text-primary transition-colors">
                    Copy
                  </button>
                </div>
                <pre className="font-mono text-sm text-text-primary overflow-x-auto">
                  <code>{`interface Agent {
  id: string;
  name: string;
  model: 'claude-sonnet-4-7' | 'claude-opus-4-7';
  temperature: number;
  systemPrompt: string;
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── Spacing & Radius ───────────────────────────────── */}
        <Section title="Spacing & Radius">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                Radius scale
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: "4px — inputs / badges", cls: "rounded-[4px]" },
                  { label: "8px — buttons / cards", cls: "rounded-[8px]" },
                  { label: "12px — panels / bubbles", cls: "rounded-[12px]" },
                  { label: "16px — modals", cls: "rounded-[16px]" },
                ].map(({ label, cls }) => (
                  <div key={label} className="flex flex-col items-center gap-2">
                    <div
                      className={`h-12 w-12 border-2 border-lumen-accent bg-lumen-accent-soft ${cls}`}
                    />
                    <span className="text-xs text-text-tertiary text-center max-w-[80px]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                Signature detail — user message bubble asymmetric radius
              </h3>
              <div className="flex justify-end">
                <div
                  className="max-w-xs bg-bg-sunken px-4 py-3 text-base text-text-primary"
                  style={{
                    borderRadius: "12px 12px 4px 12px",
                  }}
                >
                  I&apos;m comparing Stripe, Paddle, and LemonSqueezy for a new B2B
                  analytics SaaS. Which makes the most sense?
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── Buttons ────────────────────────────────────────── */}
        <Section title="Buttons">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                Variants
              </h3>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex h-8 items-center gap-1.5 rounded-[8px] bg-lumen-accent px-4 text-sm font-medium text-lumen-accent-fg transition-all hover:opacity-90 active:translate-y-px">
                  Primary
                </button>
                <button className="inline-flex h-8 items-center gap-1.5 rounded-[8px] border border-border-strong bg-bg-raised px-4 text-sm font-medium text-text-primary transition-all hover:bg-bg-sunken active:translate-y-px">
                  Secondary
                </button>
                <button className="inline-flex h-8 items-center gap-1.5 rounded-[8px] px-4 text-sm font-medium text-text-secondary transition-all hover:bg-bg-sunken hover:text-text-primary active:translate-y-px">
                  Ghost
                </button>
                <button className="inline-flex h-8 items-center gap-1.5 rounded-[8px] border border-border-subtle bg-bg-raised px-4 text-sm font-medium text-text-secondary transition-all hover:border-border-strong hover:text-text-primary active:translate-y-px">
                  Outline
                </button>
                <button className="inline-flex h-8 items-center gap-1.5 rounded-[8px] bg-lumen-error/10 px-4 text-sm font-medium text-lumen-error transition-all hover:bg-lumen-error/15 active:translate-y-px">
                  Destructive
                </button>
                <button className="inline-flex h-8 items-center gap-1.5 px-4 text-sm font-medium text-lumen-accent underline-offset-4 hover:underline">
                  Link
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                Sizes
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <button className="inline-flex h-6 items-center rounded-[6px] bg-lumen-accent px-2.5 text-xs font-medium text-lumen-accent-fg">
                  XS
                </button>
                <button className="inline-flex h-7 items-center rounded-[7px] bg-lumen-accent px-3 text-sm font-medium text-lumen-accent-fg">
                  SM
                </button>
                <button className="inline-flex h-8 items-center rounded-[8px] bg-lumen-accent px-4 text-sm font-medium text-lumen-accent-fg">
                  Default
                </button>
                <button className="inline-flex h-10 items-center rounded-[8px] bg-lumen-accent px-5 text-base font-medium text-lumen-accent-fg">
                  LG
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                States
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  className="inline-flex h-8 items-center rounded-[8px] bg-lumen-accent px-4 text-sm font-medium text-lumen-accent-fg"
                  style={{ boxShadow: "var(--shadow-focus)" }}
                >
                  Focused
                </button>
                <button
                  disabled
                  className="inline-flex h-8 cursor-not-allowed items-center rounded-[8px] bg-lumen-accent px-4 text-sm font-medium text-lumen-accent-fg opacity-40"
                >
                  Disabled
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── Form Controls ──────────────────────────────────── */}
        <Section title="Form Controls">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-text-secondary">
                Text Input
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Default input"
                  className="h-9 w-full rounded-[4px] border border-border-subtle bg-bg-raised px-3 text-base text-text-primary placeholder:text-text-tertiary outline-none transition-all focus:border-lumen-accent"
                />
                <input
                  type="text"
                  defaultValue="Filled input"
                  className="h-9 w-full rounded-[4px] border border-border-subtle bg-bg-raised px-3 text-base text-text-primary outline-none"
                />
                <input
                  type="text"
                  placeholder="Focus state (simulated)"
                  className="h-9 w-full rounded-[4px] border border-lumen-accent bg-bg-raised px-3 text-base text-text-primary placeholder:text-text-tertiary outline-none"
                  style={{ boxShadow: "var(--shadow-focus)" }}
                  readOnly
                />
                <input
                  type="text"
                  placeholder="Error state"
                  className="h-9 w-full rounded-[4px] border border-lumen-error bg-bg-raised px-3 text-base text-text-primary placeholder:text-text-tertiary outline-none"
                />
                <input
                  disabled
                  type="text"
                  placeholder="Disabled input"
                  className="h-9 w-full cursor-not-allowed rounded-[4px] border border-border-subtle bg-bg-sunken px-3 text-base text-text-tertiary placeholder:text-text-tertiary outline-none opacity-60"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-text-secondary">
                Composer (Textarea)
              </h3>
              <div
                className="rounded-[12px] border border-border-strong bg-bg-raised transition-all"
                style={{ boxShadow: "var(--shadow-focus)" }}
              >
                <textarea
                  placeholder="What are we building today?"
                  rows={3}
                  className="w-full resize-none rounded-t-[12px] bg-transparent px-4 pt-4 text-md text-text-primary placeholder:text-text-tertiary outline-none"
                />
                <div className="flex items-center justify-between border-t border-border-subtle px-3 py-2">
                  <div className="flex gap-2">
                    <button className="rounded-md px-2 py-1 text-xs text-text-tertiary hover:bg-bg-sunken hover:text-text-primary transition-colors">
                      Attach
                    </button>
                    <button className="rounded-md px-2 py-1 text-xs text-text-tertiary hover:bg-bg-sunken hover:text-text-primary transition-colors">
                      Model
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-tertiary">0 / 2000</span>
                    <button className="inline-flex h-7 w-7 items-center justify-center rounded-[8px] bg-lumen-accent text-lumen-accent-fg text-sm font-bold transition-all hover:opacity-90">
                      ↑
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-text-tertiary text-center">
                AI can make mistakes. Verify important info.
              </p>
            </div>
          </div>
        </Section>

        {/* ─── Badges ─────────────────────────────────────────── */}
        <Section title="Badges">
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-[4px] bg-lumen-accent-soft px-2 py-0.5 text-xs font-medium text-lumen-accent">
              Research
            </span>
            <span className="inline-flex items-center rounded-[4px] border border-border-subtle bg-bg-sunken px-2 py-0.5 text-xs font-medium text-text-secondary">
              Coding
            </span>
            <span className="inline-flex items-center rounded-[4px] bg-lumen-success/10 px-2 py-0.5 text-xs font-medium text-lumen-success">
              Active
            </span>
            <span className="inline-flex items-center rounded-[4px] bg-lumen-warn/10 px-2 py-0.5 text-xs font-medium text-lumen-warn">
              Pending
            </span>
            <span className="inline-flex items-center rounded-[4px] bg-lumen-error/10 px-2 py-0.5 text-xs font-medium text-lumen-error">
              Error
            </span>
            <span className="inline-flex items-center gap-1 rounded-[4px] border border-border-subtle bg-bg-sunken px-2 py-0.5 text-xs font-medium text-text-tertiary">
              <span className="size-1.5 rounded-full bg-lumen-success" />
              Online
            </span>
          </div>
        </Section>

        {/* ─── Cards ──────────────────────────────────────────── */}
        <Section title="Cards">
          <div className="grid grid-cols-3 gap-4">
            {/* Agent card */}
            <div className="group cursor-pointer rounded-[12px] border border-border-subtle bg-bg-raised p-5 transition-all hover:border-border-strong hover:-translate-y-0.5">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-lumen-accent-soft text-lumen-accent">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 2v8l5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-xs text-text-tertiary">Research</span>
              </div>
              <h3 className="text-base font-semibold text-text-primary">Atlas</h3>
              <p className="mt-1 text-sm text-text-secondary">
                Deep research with sources you can verify.
              </p>
              <div className="mt-4">
                <span className="text-xs text-text-tertiary font-mono">claude-opus-4-7</span>
              </div>
            </div>

            {/* Prompt suggestion card */}
            <div className="group cursor-pointer rounded-[12px] border border-border-subtle bg-bg-raised p-4 transition-all hover:border-border-strong hover:-translate-y-0.5">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-base">🔨</span>
                <span className="text-xs text-text-tertiary">Code</span>
              </div>
              <p className="text-sm text-text-primary">
                Help me debug this slow database query
              </p>
            </div>

            {/* Stat card */}
            <div className="rounded-[12px] border border-border-subtle bg-bg-raised p-5">
              <p className="text-xs text-text-tertiary uppercase tracking-wider">
                Total conversations
              </p>
              <p className="mt-2 text-2xl font-semibold font-display text-text-primary">
                1,247
              </p>
              <p className="mt-1 text-xs text-lumen-success">
                ↑ 12% from last week
              </p>
            </div>
          </div>
        </Section>

        {/* ─── Tool-use Blocks ────────────────────────────────── */}
        <Section title="Tool-use Blocks">
          <div className="space-y-3 max-w-lg">
            <div className="flex cursor-pointer items-center gap-2 rounded-[8px] border border-border-subtle bg-bg-sunken px-3 py-2 text-sm text-text-secondary hover:border-border-strong hover:text-text-primary transition-all">
              <span>🔍</span>
              <span className="flex-1">
                <span className="font-mono">web_search</span>
                <span className="text-text-tertiary"> · 4 results</span>
              </span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-text-tertiary">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="relative flex items-center gap-2 overflow-hidden rounded-[8px] border border-border-subtle bg-bg-sunken px-3 py-2 text-sm text-text-secondary">
              <span>⚙️</span>
              <span className="flex-1 font-mono">code_interpreter</span>
              <span className="flex items-center gap-1 text-xs text-text-tertiary">
                <span>running</span>
                <span className="inline-flex gap-0.5">
                  <span className="size-1 rounded-full bg-text-tertiary animate-bounce [animation-delay:0ms]" />
                  <span className="size-1 rounded-full bg-text-tertiary animate-bounce [animation-delay:150ms]" />
                  <span className="size-1 rounded-full bg-text-tertiary animate-bounce [animation-delay:300ms]" />
                </span>
              </span>
            </div>
          </div>
        </Section>

        {/* ─── Shadows & Focus ────────────────────────────────── */}
        <Section title="Shadows & Focus">
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 rounded-[8px] bg-bg-raised border border-lumen-accent"
                style={{ boxShadow: "var(--shadow-focus)" }}
              />
              <span className="text-xs text-text-tertiary">focus ring</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 rounded-[12px] bg-bg-raised border border-border-subtle"
                style={{ boxShadow: "var(--shadow-overlay)" }}
              />
              <span className="text-xs text-text-tertiary">overlay</span>
            </div>
          </div>
          <p className="text-xs text-text-tertiary mt-4">
            Borders for separation. Shadows only for focus rings and modals.
          </p>
        </Section>

        {/* Footer */}
        <div className="border-t border-border-subtle pt-8 text-center">
          <p className="text-xs text-text-tertiary">
            Lumen Design System · Phase 0 complete · Ready for Phase 1
          </p>
        </div>
      </main>
    </div>
  );
}
