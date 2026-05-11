"use client";

import { ChevronDown, Share2, MoreHorizontal, PanelRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { Agent } from "@/lib/agents";

interface TopBarProps {
  agent?: Agent;
  inspectorOpen: boolean;
  onToggleInspector: () => void;
}

export function TopBar({ agent, inspectorOpen, onToggleInspector }: TopBarProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: agent?.name ?? "Lumen chat", url });
      } catch {
        // user cancelled — no-op
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="flex h-14 flex-shrink-0 items-center justify-between border-b border-border-subtle bg-bg-raised px-6">
      {/* Left: agent selector */}
      <button className="group flex flex-col items-start gap-0.5 rounded-[6px] px-2 py-1.5 transition-colors hover:bg-bg-sunken">
        <div className="flex items-center gap-1.5">
          <span className="text-base font-semibold text-text-primary font-display">
            {agent?.name ?? "New chat"}
          </span>
          <ChevronDown
            size={14}
            className="text-text-tertiary transition-transform group-hover:text-text-secondary"
          />
        </div>
        {agent && (
          <span className="text-xs text-text-tertiary font-mono">
            {agent.model}
          </span>
        )}
      </button>

      {/* Right: actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={handleShare}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 rounded-[6px] px-3 text-sm transition-colors",
            copied
              ? "bg-lumen-accent-soft text-lumen-accent"
              : "text-text-secondary hover:bg-bg-sunken hover:text-text-primary"
          )}
        >
          {copied ? <Check size={14} /> : <Share2 size={14} />}
          {copied ? "Copied!" : "Share"}
        </button>
        <button className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] text-text-tertiary transition-colors hover:bg-bg-sunken hover:text-text-secondary">
          <MoreHorizontal size={16} />
        </button>
        <button
          onClick={onToggleInspector}
          aria-label="Toggle inspector panel"
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-[6px] transition-colors",
            inspectorOpen
              ? "bg-lumen-accent-soft text-lumen-accent"
              : "text-text-tertiary hover:bg-bg-sunken hover:text-text-secondary"
          )}
        >
          <PanelRight size={16} />
        </button>
      </div>
    </header>
  );
}
