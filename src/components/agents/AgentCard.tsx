"use client";

import Link from "next/link";
import { Wrench } from "lucide-react";
import { AgentAvatar } from "./AgentAvatar";
import { cn } from "@/lib/utils";
import type { Agent } from "@/lib/agents";

const CATEGORY_COLORS: Record<Agent["category"], string> = {
  Research: "bg-lumen-accent-soft text-lumen-accent",
  Coding: "bg-bg-sunken text-text-secondary",
  Writing: "bg-bg-sunken text-text-secondary",
  Data: "bg-bg-sunken text-text-secondary",
  Strategy: "bg-bg-sunken text-text-secondary",
};

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Link
      href={`/agents/${agent.id}`}
      className={cn(
        "group flex flex-col gap-4 rounded-[12px] border border-border-subtle bg-bg-raised p-5",
        "transition-all duration-150 hover:-translate-y-0.5 hover:border-border-strong"
      )}
    >
      {/* Top row: avatar + category badge */}
      <div className="flex items-start justify-between">
        <AgentAvatar agentId={agent.id} size="md" />
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
            CATEGORY_COLORS[agent.category]
          )}
        >
          {agent.category}
        </span>
      </div>

      {/* Name + tagline */}
      <div>
        <p className="mb-1 font-semibold text-text-primary">{agent.name}</p>
        <p className="line-clamp-2 text-sm text-text-secondary">{agent.tagline}</p>
      </div>

      {/* Footer: model + tools */}
      <div className="mt-auto flex items-center justify-between">
        <span className="font-mono text-xs text-text-tertiary">
          {agent.model.replace("claude-", "")}
        </span>
        {agent.tools.length > 0 && (
          <span className="flex items-center gap-1 text-xs text-text-tertiary">
            <Wrench size={11} />
            {agent.tools.length} {agent.tools.length === 1 ? "tool" : "tools"}
          </span>
        )}
      </div>
    </Link>
  );
}
