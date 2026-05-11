import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Thermometer, Wrench, MessageSquare, ExternalLink } from "lucide-react";
import { getAgent } from "@/lib/agents";
import { AgentAvatar } from "@/components/agents/AgentAvatar";
import { LeftNav } from "@/components/layout/LeftNav";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

const CATEGORY_COLORS: Record<string, string> = {
  Research: "bg-lumen-accent-soft text-lumen-accent",
  Coding: "bg-bg-sunken text-text-secondary",
  Writing: "bg-bg-sunken text-text-secondary",
  Data: "bg-bg-sunken text-text-secondary",
  Strategy: "bg-bg-sunken text-text-secondary",
};

export default async function AgentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const agent = getAgent(id);

  if (!agent) notFound();

  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      <LeftNav />

      <main id="main-content" className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-8 py-10">
          {/* Back */}
          <Link
            href="/agents"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-text-tertiary transition-colors hover:text-text-secondary"
          >
            <ArrowLeft size={13} />
            All agents
          </Link>

          {/* Hero */}
          <div className="mb-8 flex items-start gap-5">
            <AgentAvatar agentId={agent.id} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="mb-1 flex items-center gap-2.5">
                <h1 className="font-display text-2xl font-semibold text-text-primary">
                  {agent.name}
                </h1>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    CATEGORY_COLORS[agent.category] ?? "bg-bg-sunken text-text-secondary"
                  )}
                >
                  {agent.category}
                </span>
              </div>
              <p className="text-md text-text-secondary">{agent.tagline}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mb-8 flex items-center gap-3">
            <Link
              href={`/chat?agent=${agent.id}`}
              className="inline-flex h-9 items-center gap-2 rounded-[8px] bg-lumen-accent px-5 text-sm font-medium text-lumen-accent-fg transition-opacity hover:opacity-90"
            >
              Start chat
            </Link>
            {agent.sampleConversationId && (
              <Link
                href={`/chat/${agent.sampleConversationId}`}
                className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-border-subtle px-4 text-sm text-text-secondary transition-colors hover:bg-bg-sunken hover:text-text-primary"
              >
                <MessageSquare size={13} />
                View sample conversation
                <ExternalLink size={11} className="opacity-50" />
              </Link>
            )}
          </div>

          {/* Specs */}
          <div className="mb-8 grid grid-cols-3 gap-4">
            <div className="rounded-[10px] border border-border-subtle bg-bg-raised p-4">
              <p className="mb-1.5 text-xs font-medium text-text-tertiary">Model</p>
              <p className="font-mono text-sm text-text-primary">
                {agent.model.replace("claude-", "")}
              </p>
            </div>
            <div className="rounded-[10px] border border-border-subtle bg-bg-raised p-4">
              <p className="mb-1.5 flex items-center gap-1 text-xs font-medium text-text-tertiary">
                <Thermometer size={11} />
                Temperature
              </p>
              <p className="font-mono text-sm text-text-primary">{agent.temperature}</p>
            </div>
            <div className="rounded-[10px] border border-border-subtle bg-bg-raised p-4">
              <p className="mb-1.5 flex items-center gap-1 text-xs font-medium text-text-tertiary">
                <Wrench size={11} />
                Tools
              </p>
              {agent.tools.length > 0 ? (
                <p className="text-sm text-text-primary">{agent.tools.length} enabled</p>
              ) : (
                <p className="text-sm text-text-tertiary">None</p>
              )}
            </div>
          </div>

          {/* Tools list */}
          {agent.tools.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-3 text-sm font-medium text-text-primary">Tools</h2>
              <div className="flex flex-wrap gap-2">
                {agent.tools.map((tool) => (
                  <span
                    key={tool}
                    className="flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-raised px-3 py-1 font-mono text-xs text-text-secondary"
                  >
                    <Wrench size={10} className="opacity-60" />
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* System prompt */}
          <div>
            <h2 className="mb-3 text-sm font-medium text-text-primary">System prompt</h2>
            <div className="rounded-[12px] border border-border-subtle bg-bg-raised p-5">
              <p className="font-serif text-md leading-relaxed text-text-secondary whitespace-pre-wrap">
                {agent.systemPrompt}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
