"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Code2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToolCall } from "@/lib/sample-conversations";

const toolIcons: Record<string, React.ReactNode> = {
  web_search: <Search size={13} />,
  web_fetch: <Globe size={13} />,
  code_interpreter: <Code2 size={13} />,
  read_file: <Code2 size={13} />,
};

interface ToolUseBlockProps {
  toolCall: ToolCall;
}

export function ToolUseBlock({ toolCall }: ToolUseBlockProps) {
  const [expanded, setExpanded] = useState(false);
  const isRunning = toolCall.status === "running";

  const icon = toolIcons[toolCall.tool] ?? <Code2 size={13} />;
  const resultCount = toolCall.output?.match(/Found (\d+)/)?.[1];

  return (
    <motion.div layout className="overflow-hidden rounded-[8px] border border-border-subtle bg-bg-sunken">
      {/* Header */}
      <button
        onClick={() => !isRunning && setExpanded((v) => !v)}
        className={cn(
          "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors",
          isRunning
            ? "cursor-default text-text-secondary"
            : "cursor-pointer text-text-secondary hover:text-text-primary"
        )}
      >
        <span className="text-text-tertiary">{icon}</span>

        <span className="flex-1 text-left">
          <span className="font-mono">{toolCall.tool}</span>
          {!isRunning && resultCount && (
            <span className="text-text-tertiary"> · {resultCount} results</span>
          )}
        </span>

        {isRunning ? (
          <span className="flex items-center gap-1 text-xs text-text-tertiary">
            running
            <span className="inline-flex gap-0.5">
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="size-1 animate-bounce rounded-full bg-text-tertiary"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </span>
          </span>
        ) : (
          <ChevronDown
            size={13}
            className={cn(
              "flex-shrink-0 text-text-tertiary transition-transform",
              expanded && "rotate-180"
            )}
          />
        )}
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-border-subtle px-3 py-3">
              <div>
                <p className="mb-1 text-xs font-medium text-text-tertiary">Input</p>
                <div className="rounded-[6px] bg-bg-raised px-3 py-2">
                  {Object.entries(toolCall.input).map(([k, v]) => (
                    <div key={k} className="flex gap-2 text-xs">
                      <span className="font-mono text-text-tertiary">{k}:</span>
                      <span className="text-text-secondary">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              {toolCall.output && (
                <div>
                  <p className="mb-1 text-xs font-medium text-text-tertiary">Output</p>
                  <div className="rounded-[6px] bg-bg-raised px-3 py-2">
                    <p className="text-xs text-text-secondary">{toolCall.output}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
