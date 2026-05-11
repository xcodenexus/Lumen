"use client";

import { useRef, useState } from "react";
import { Paperclip, ChevronDown, Zap, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComposerProps {
  onSubmit?: (value: string) => void;
  defaultValue?: string;
  isLoading?: boolean;
}

export function Composer({ onSubmit, defaultValue = "", isLoading }: ComposerProps) {
  const [value, setValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const [model] = useState("claude-sonnet-4-7");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const canSubmit = value.trim().length > 0 && !isLoading;

  return (
    <div className="flex-shrink-0 px-6 pb-4 pt-2">
      <div className="mx-auto max-w-[720px]">
        <div
          className={cn(
            "rounded-[12px] border bg-bg-raised transition-all",
            focused ? "border-lumen-accent" : "border-border-strong"
          )}
          style={focused ? { boxShadow: "var(--shadow-focus)" } : undefined}
        >
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Ask anything…"
            rows={1}
            className="block w-full resize-none bg-transparent px-4 pt-4 text-md text-text-primary placeholder:text-text-tertiary outline-none"
            style={{ minHeight: "56px", maxHeight: "240px" }}
          />

          {/* Bottom toolbar */}
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-1">
              <button
                aria-label="Attach file"
                className="inline-flex h-7 w-7 items-center justify-center rounded-[6px] text-text-tertiary transition-colors hover:bg-bg-sunken hover:text-text-secondary"
              >
                <Paperclip size={14} />
              </button>
              <button className="inline-flex h-7 items-center gap-1 rounded-[6px] px-2 text-xs text-text-tertiary transition-colors hover:bg-bg-sunken hover:text-text-secondary">
                <span className="font-mono">{model.replace("claude-", "")}</span>
                <ChevronDown size={11} />
              </button>
              <button className="inline-flex h-7 items-center gap-1 rounded-[6px] px-2 text-xs text-text-tertiary transition-colors hover:bg-bg-sunken hover:text-text-secondary">
                <Zap size={12} />
                Tools
              </button>
            </div>

            <div className="flex items-center gap-2">
              {value.length > 0 && (
                <span className="font-mono text-xs text-text-tertiary">
                  {value.length.toLocaleString()}
                </span>
              )}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                aria-label="Send message"
                className={cn(
                  "inline-flex h-7 w-7 items-center justify-center rounded-[8px] transition-all",
                  canSubmit
                    ? "bg-lumen-accent text-lumen-accent-fg hover:opacity-90 active:translate-y-px"
                    : "cursor-not-allowed bg-bg-sunken text-text-tertiary"
                )}
              >
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-2 text-center text-xs text-text-tertiary">
          AI can make mistakes. Verify important info.
        </p>
      </div>
    </div>
  );
}
