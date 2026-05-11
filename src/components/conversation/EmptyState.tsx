"use client";

const PROMPT_CARDS = [
  { icon: "🧭", category: "Research", prompt: "Compare three options for [decision] with sources" },
  { icon: "🔨", category: "Code", prompt: "Help me debug this slow database query" },
  { icon: "✍️", category: "Write", prompt: "Edit my landing page hero for clarity and voice" },
  { icon: "📊", category: "Analyze", prompt: "Explore this CSV and tell me what's interesting" },
];

interface EmptyStateProps {
  onPromptSelect?: (prompt: string) => void;
}

export function EmptyState({ onPromptSelect }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 md:px-8">
      {/* Logo mark */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-lumen-accent-soft">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M16 3L28 24H4L16 3Z" fill="hsl(18, 84%, 41%)" opacity="0.85" />
          <path d="M16 11L23 24H9L16 11Z" fill="hsl(18, 84%, 41%)" />
        </svg>
      </div>

      {/* Headline */}
      <h1 className="mb-10 font-serif text-2xl text-text-primary">
        What are we building today?
      </h1>

      {/* Prompt cards 2×2 */}
      <div className="grid w-full max-w-[420px] grid-cols-2 gap-3">
        {PROMPT_CARDS.map(({ icon, category, prompt }) => (
          <button
            key={prompt}
            onClick={() => onPromptSelect?.(prompt)}
            className="group flex h-[100px] w-full flex-col justify-between rounded-[12px] border border-border-subtle bg-bg-raised p-4 text-left transition-all hover:-translate-y-0.5 hover:border-border-strong"
          >
            <div className="flex items-center gap-2">
              <span className="text-[20px] leading-none">{icon}</span>
              <span className="text-xs text-text-tertiary">{category}</span>
            </div>
            <p className="text-sm text-text-primary">{prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
