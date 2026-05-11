"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Settings,
  ChevronDown,
  MessageSquare,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { mockConversationList } from "@/lib/sample-conversations";
import { agents } from "@/lib/agents";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut";
import { cn } from "@/lib/utils";

const groupOrder = ["Today", "Yesterday", "Last 7 days"];

export function LeftNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [agentsExpanded, setAgentsExpanded] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  useKeyboardShortcut("n", () => router.push("/chat"), { meta: true });

  const openPalette = () =>
    window.dispatchEvent(new Event("lumen:open-palette"));

  const grouped = groupOrder.reduce<Record<string, typeof mockConversationList>>(
    (acc, g) => {
      acc[g] = mockConversationList.filter((c) => c.group === g);
      return acc;
    },
    {}
  );

  return (
    <motion.aside
      animate={{ width: collapsed ? 56 : 240 }}
      transition={{ type: "spring", stiffness: 350, damping: 35 }}
      className="flex h-full flex-col border-r border-border-subtle bg-bg-raised overflow-hidden flex-shrink-0"
    >
      {/* Logo + collapse toggle */}
      <div className="flex h-14 flex-shrink-0 items-center justify-between border-b border-border-subtle px-3">
        <div className={cn("flex items-center gap-2.5", collapsed && "w-full justify-center")}>
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[6px] bg-lumen-accent text-lumen-accent-fg">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1L12.5 10H1.5L7 1Z" fill="currentColor" opacity="0.9" />
              <path d="M7 5L10 10H4L7 5Z" fill="currentColor" />
            </svg>
          </div>
          {!collapsed && (
            <span className="text-base font-semibold tracking-tight text-text-primary font-display whitespace-nowrap">
              Lumen
            </span>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            aria-label="Collapse sidebar"
            className="inline-flex h-7 w-7 items-center justify-center rounded-[6px] text-text-tertiary hover:bg-bg-sunken hover:text-text-secondary transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
        )}
      </div>

      {/* Quick actions */}
      <div className="flex flex-shrink-0 flex-col gap-1 border-b border-border-subtle p-2">
        <Link
          href="/chat"
          title={collapsed ? "New chat (⌘N)" : undefined}
          className={cn(
            "flex h-8 items-center gap-2 rounded-[6px] px-2 text-sm text-text-secondary transition-colors hover:bg-bg-sunken hover:text-text-primary",
            collapsed && "justify-center px-0 w-8 mx-auto"
          )}
        >
          <Plus size={14} className="flex-shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1">New chat</span>
              <span className="font-mono text-xs text-text-tertiary">⌘N</span>
            </>
          )}
        </Link>
        <button
          onClick={openPalette}
          title={collapsed ? "Search (⌘K)" : undefined}
          className={cn(
            "flex h-8 items-center gap-2 rounded-[6px] px-2 text-sm text-text-secondary transition-colors hover:bg-bg-sunken hover:text-text-primary",
            collapsed && "justify-center px-0 w-8 mx-auto"
          )}
        >
          <Search size={14} className="flex-shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">Search</span>
              <span className="font-mono text-xs text-text-tertiary">⌘K</span>
            </>
          )}
        </button>
      </div>

      {/* Scroll area */}
      <div className="flex-1 overflow-y-auto py-2">
        {collapsed ? (
          /* Collapsed: icon-only list */
          <div className="flex flex-col items-center gap-0.5 px-1">
            {mockConversationList.map((convo) => {
              const isActive = pathname === `/chat/${convo.id}`;
              return (
                <Link
                  key={convo.id}
                  href={`/chat/${convo.id}`}
                  title={convo.title}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-[6px] transition-colors",
                    isActive
                      ? "bg-lumen-accent-soft text-lumen-accent"
                      : "text-text-secondary hover:bg-bg-sunken hover:text-text-primary"
                  )}
                >
                  <MessageSquare size={13} />
                </Link>
              );
            })}
            <div className="mt-2 flex h-8 w-8 items-center justify-center text-text-tertiary">
              <Zap size={13} />
            </div>
          </div>
        ) : (
          /* Expanded: grouped conversation list + agents */
          <>
            {groupOrder.map((group) => {
              const items = grouped[group];
              if (!items?.length) return null;
              return (
                <div key={group} className="mb-4">
                  <p className="mb-1 px-3 text-xs font-medium text-text-tertiary">
                    {group}
                  </p>
                  <div className="space-y-0.5 px-2">
                    {items.map((convo) => {
                      const isActive = pathname === `/chat/${convo.id}`;
                      return (
                        <Link
                          key={convo.id}
                          href={`/chat/${convo.id}`}
                          className={cn(
                            "flex h-8 items-center gap-2 rounded-[6px] px-2 text-sm transition-colors",
                            isActive
                              ? "bg-lumen-accent-soft text-lumen-accent font-medium"
                              : "text-text-secondary hover:bg-bg-sunken hover:text-text-primary"
                          )}
                        >
                          <MessageSquare size={13} className="flex-shrink-0 opacity-60" />
                          <span className="truncate">{convo.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Agents section */}
            <div className="mb-2">
              <div className="flex h-7 w-full items-center px-3">
                <button
                  onClick={() => setAgentsExpanded((v) => !v)}
                  className="flex flex-1 items-center gap-1 text-xs font-medium text-text-tertiary transition-colors hover:text-text-secondary"
                >
                  <ChevronDown
                    size={12}
                    className={cn(
                      "transition-transform",
                      agentsExpanded ? "rotate-0" : "-rotate-90"
                    )}
                  />
                  <Link
                    href="/agents"
                    onClick={(e) => e.stopPropagation()}
                    className="hover:text-text-primary"
                  >
                    Agents
                  </Link>
                </button>
                <Link
                  href="/agents/new"
                  title="New agent"
                  className="text-text-tertiary transition-colors hover:text-text-secondary"
                >
                  <Plus size={12} />
                </Link>
              </div>
              {agentsExpanded && (
                <div className="mt-0.5 space-y-0.5 px-2">
                  {agents.map((agent) => (
                    <Link
                      key={agent.id}
                      href={`/chat?agent=${agent.id}`}
                      className="flex h-8 w-full items-center gap-2 rounded-[6px] px-2 text-sm text-text-secondary transition-colors hover:bg-bg-sunken hover:text-text-primary"
                    >
                      <Zap size={13} className="flex-shrink-0 text-text-tertiary" />
                      <span className="truncate">{agent.name}</span>
                      <span className="ml-auto text-xs text-text-tertiary">
                        {agent.category.slice(0, 3)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div
        className={cn(
          "flex flex-shrink-0 border-t border-border-subtle p-2",
          collapsed ? "flex-col items-center gap-1" : "items-center justify-between"
        )}
      >
        {collapsed ? (
          <>
            <button
              onClick={() => setCollapsed(false)}
              aria-label="Expand sidebar"
              className="flex h-8 w-8 items-center justify-center rounded-[6px] text-text-tertiary hover:bg-bg-sunken hover:text-text-secondary transition-colors"
            >
              <ChevronRight size={14} />
            </button>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-lumen-accent-soft text-xs font-medium text-lumen-accent">
              J
            </div>
            <ThemeToggle />
            <Link
              href="/settings"
              title="Settings"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-bg-sunken hover:text-text-primary"
            >
              <Settings size={15} />
            </Link>
          </>
        ) : (
          <>
            <button className="flex min-w-0 flex-1 items-center gap-2 rounded-[6px] px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-bg-sunken hover:text-text-primary">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-lumen-accent-soft text-xs font-medium text-lumen-accent">
                J
              </div>
              <span className="truncate text-sm">Jamie</span>
            </button>
            <div className="flex items-center gap-0.5">
              <ThemeToggle />
              <Link
                href="/settings"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-tertiary transition-colors hover:bg-bg-sunken hover:text-text-primary"
              >
                <Settings size={15} />
              </Link>
            </div>
          </>
        )}
      </div>
    </motion.aside>
  );
}
