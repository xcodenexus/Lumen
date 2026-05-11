"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, MessageSquare, Zap, Plus, Settings } from "lucide-react";
import { mockConversationList } from "@/lib/sample-conversations";
import { agents } from "@/lib/agents";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  type: "conversation" | "agent" | "action";
  label: string;
  description?: string;
  href: string;
  icon: React.ReactNode;
}

const ACTIONS: CommandItem[] = [
  {
    id: "new-chat",
    type: "action",
    label: "New chat",
    description: "Start a fresh conversation",
    href: "/chat",
    icon: <Plus size={14} />,
  },
  {
    id: "settings",
    type: "action",
    label: "Settings",
    description: "Manage your account and preferences",
    href: "/settings",
    icon: <Settings size={14} />,
  },
];

const ALL_ITEMS: CommandItem[] = [
  ...ACTIONS,
  ...mockConversationList.map((c) => ({
    id: c.id,
    type: "conversation" as const,
    label: c.title,
    description: c.group,
    href: `/chat/${c.id}`,
    icon: <MessageSquare size={14} />,
  })),
  ...agents.map((a) => ({
    id: `agent-${a.id}`,
    type: "agent" as const,
    label: a.name,
    description: a.tagline,
    href: `/chat?agent=${a.id}`,
    icon: <Zap size={14} />,
  })),
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcut("k", () => setOpen(true), { meta: true });

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("lumen:open-palette", handler);
    return () => window.removeEventListener("lumen:open-palette", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const filtered = query
    ? ALL_ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.description?.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_ITEMS;

  const handleSelect = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh]"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

      <div
        className="relative w-full max-w-[540px] mx-4 rounded-[12px] bg-bg-raised border border-border-strong overflow-hidden"
        style={{ boxShadow: "var(--shadow-overlay)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle">
          <Search size={15} className="text-text-tertiary flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations, agents, commands…"
            className="flex-1 bg-transparent text-base text-text-primary placeholder:text-text-tertiary outline-none"
          />
          <kbd className="font-mono text-xs text-text-tertiary bg-bg-sunken border border-border-subtle px-1.5 py-0.5 rounded-[4px]">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[380px] overflow-y-auto py-1.5">
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-text-tertiary">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <div>
              {!query && (
                <p className="px-4 pt-1 pb-1.5 text-xs font-medium text-text-tertiary">
                  Quick actions
                </p>
              )}
              {filtered.map((item, i) => {
                const showSectionHeader =
                  !query &&
                  (i === ACTIONS.length
                    ? "Conversations"
                    : i === ACTIONS.length + mockConversationList.length
                    ? "Agents"
                    : null);
                return (
                  <div key={item.id}>
                    {showSectionHeader && (
                      <p className="px-4 pt-3 pb-1.5 text-xs font-medium text-text-tertiary">
                        {showSectionHeader}
                      </p>
                    )}
                    <button
                      onClick={() => handleSelect(item.href)}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-bg-sunken"
                      )}
                    >
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[6px] bg-bg-sunken text-text-tertiary">
                        {item.icon}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm text-text-primary truncate">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="block text-xs text-text-tertiary truncate">
                            {item.description}
                          </span>
                        )}
                      </span>
                      {item.type === "action" && (
                        <span className="text-xs text-text-tertiary bg-bg-sunken border border-border-subtle px-1.5 py-0.5 rounded-[4px] font-mono">
                          action
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
