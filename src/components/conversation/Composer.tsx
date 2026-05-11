"use client";

import { useRef, useState, useEffect } from "react";
import { Paperclip, ChevronDown, Zap, ArrowUp, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const MODELS = [
  { value: "claude-sonnet-4-7", label: "sonnet-4-7" },
  { value: "claude-opus-4-7", label: "opus-4-7" },
  { value: "claude-haiku-4-5", label: "haiku-4-5" },
] as const;

type ModelValue = (typeof MODELS)[number]["value"];

const AVAILABLE_TOOLS = ["web_search", "web_fetch", "code_interpreter"] as const;
type Tool = (typeof AVAILABLE_TOOLS)[number];

interface ComposerProps {
  onSubmit?: (value: string) => void;
  defaultValue?: string;
  isLoading?: boolean;
}

export function Composer({ onSubmit, defaultValue = "", isLoading }: ComposerProps) {
  const [value, setValue] = useState(defaultValue);
  const [focused, setFocused] = useState(false);
  const [model, setModel] = useState<ModelValue>("claude-sonnet-4-7");
  const [modelOpen, setModelOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [enabledTools, setEnabledTools] = useState<Set<Tool>>(new Set());
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setModelOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setAttachedFiles((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleTool = (tool: Tool) => {
    setEnabledTools((prev) => {
      const next = new Set(prev);
      if (next.has(tool)) next.delete(tool);
      else next.add(tool);
      return next;
    });
  };

  const canSubmit = value.trim().length > 0 && !isLoading;
  const selectedModel = MODELS.find((m) => m.value === model) ?? MODELS[0];

  return (
    <div className="flex-shrink-0 px-3 pb-4 pt-2 md:px-6">
      <div className="mx-auto max-w-[720px]">
        <div
          className={cn(
            "rounded-[12px] border bg-bg-raised transition-all",
            focused ? "border-lumen-accent" : "border-border-strong"
          )}
          style={focused ? { boxShadow: "var(--shadow-focus)" } : undefined}
        >
          {/* Attached file pills */}
          {attachedFiles.length > 0 && (
            <div className="flex flex-wrap gap-1.5 px-4 pt-3">
              {attachedFiles.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 rounded-[6px] bg-bg-sunken px-2 py-1 text-xs text-text-secondary"
                >
                  <Paperclip size={11} className="flex-shrink-0 text-text-tertiary" />
                  <span className="max-w-[140px] truncate">{file.name}</span>
                  <button
                    onClick={() => removeFile(i)}
                    aria-label={`Remove ${file.name}`}
                    className="ml-0.5 flex-shrink-0 rounded text-text-tertiary transition-colors hover:text-text-primary"
                  >
                    <X size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}

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
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Attach button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                aria-label="Attach file"
                className="inline-flex h-7 w-7 items-center justify-center rounded-[6px] text-text-tertiary transition-colors hover:bg-bg-sunken hover:text-text-secondary"
              >
                <Paperclip size={14} />
              </button>

              {/* Model picker */}
              <div ref={modelRef} className="relative">
                <button
                  onClick={() => {
                    setModelOpen((v) => !v);
                    setToolsOpen(false);
                  }}
                  className="inline-flex h-7 items-center gap-1 rounded-[6px] px-2 text-xs text-text-tertiary transition-colors hover:bg-bg-sunken hover:text-text-secondary"
                >
                  <span className="font-mono">{selectedModel.label}</span>
                  <ChevronDown
                    size={11}
                    className={cn("transition-transform duration-150", modelOpen && "rotate-180")}
                  />
                </button>

                {modelOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 overflow-hidden rounded-[8px] border border-border-strong bg-bg-raised shadow-[var(--shadow-overlay)]">
                    {MODELS.map((m) => (
                      <button
                        key={m.value}
                        onClick={() => {
                          setModel(m.value);
                          setModelOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-bg-sunken"
                      >
                        <span className="w-3.5 flex-shrink-0">
                          {model === m.value && (
                            <Check size={12} className="text-lumen-accent" />
                          )}
                        </span>
                        <span
                          className={cn(
                            "font-mono text-xs",
                            model === m.value ? "text-text-primary" : "text-text-secondary"
                          )}
                        >
                          {m.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Tools picker */}
              <div ref={toolsRef} className="relative">
                <button
                  onClick={() => {
                    setToolsOpen((v) => !v);
                    setModelOpen(false);
                  }}
                  className={cn(
                    "inline-flex h-7 items-center gap-1 rounded-[6px] px-2 text-xs transition-colors hover:bg-bg-sunken",
                    enabledTools.size > 0
                      ? "text-lumen-accent"
                      : "text-text-tertiary hover:text-text-secondary"
                  )}
                >
                  <Zap size={12} />
                  <span>Tools</span>
                  {enabledTools.size > 0 && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-lumen-accent text-[10px] font-semibold text-lumen-accent-fg">
                      {enabledTools.size}
                    </span>
                  )}
                </button>

                {toolsOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 overflow-hidden rounded-[8px] border border-border-strong bg-bg-raised shadow-[var(--shadow-overlay)]">
                    {AVAILABLE_TOOLS.map((tool) => {
                      const enabled = enabledTools.has(tool);
                      return (
                        <button
                          key={tool}
                          onClick={() => toggleTool(tool)}
                          className="flex w-full items-center justify-between px-3 py-2 transition-colors hover:bg-bg-sunken"
                        >
                          <span
                            className={cn(
                              "font-mono text-xs",
                              enabled ? "text-text-primary" : "text-text-secondary"
                            )}
                          >
                            {tool}
                          </span>
                          {/* Mini toggle */}
                          <div
                            className={cn(
                              "relative h-4 w-7 flex-shrink-0 cursor-pointer overflow-hidden rounded-full transition-colors duration-150",
                              enabled ? "bg-lumen-accent" : "border border-border-strong bg-bg-sunken"
                            )}
                          >
                            <span
                              className={cn(
                                "absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-transform duration-150",
                                enabled ? "translate-x-[14px]" : "translate-x-0"
                              )}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
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
