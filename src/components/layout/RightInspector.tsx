"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Paperclip, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import type { Agent } from "@/lib/agents";

interface RightInspectorProps {
  open: boolean;
  agent?: Agent;
}

type Tab = "agent" | "context" | "artifacts";

const MODELS = [
  { value: "claude-sonnet-4-7", label: "claude-sonnet-4-7" },
  { value: "claude-opus-4-7", label: "claude-opus-4-7" },
  { value: "claude-haiku-4-5", label: "claude-haiku-4-5" },
] as const;

export function RightInspector({ open, agent }: RightInspectorProps) {
  const [tab, setTab] = useState<Tab>("agent");

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.aside
          key="inspector"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 360, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="flex flex-col overflow-hidden border-l border-border-subtle bg-bg-raised"
        >
          <div className="flex h-full w-[360px] flex-col">
            {/* Tabs */}
            <div className="flex h-14 flex-shrink-0 items-center gap-1 border-b border-border-subtle px-4">
              {(["agent", "context", "artifacts"] as const).map((id) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={cn(
                    "flex h-8 items-center rounded-[6px] px-3 text-sm capitalize transition-colors",
                    tab === id
                      ? "bg-bg-sunken font-medium text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {id}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-4">
              {tab === "agent" && <AgentTab agent={agent} />}
              {tab === "context" && <ContextTab />}
              {tab === "artifacts" && <ArtifactsTab />}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function AgentTab({ agent }: { agent?: Agent }) {
  const [model, setModel] = useState<string>(
    agent?.model ?? "claude-sonnet-4-7"
  );
  const [temperature, setTemperature] = useState(agent?.temperature ?? 0.7);
  const [enabledTools, setEnabledTools] = useState<Set<string>>(
    () => new Set(agent?.tools ?? [])
  );

  useEffect(() => {
    setModel(agent?.model ?? "claude-sonnet-4-7");
    setTemperature(agent?.temperature ?? 0.7);
    setEnabledTools(new Set(agent?.tools ?? []));
  }, [agent?.id]);

  const toggleTool = (tool: string) => {
    setEnabledTools((prev) => {
      const next = new Set(prev);
      if (next.has(tool)) next.delete(tool);
      else next.add(tool);
      return next;
    });
  };

  if (!agent) {
    return (
      <div className="flex h-32 items-center justify-center">
        <p className="text-sm text-text-tertiary">No agent selected</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* System prompt */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-text-tertiary">
          System prompt
        </label>
        <div className="rounded-[8px] border border-border-subtle bg-bg-sunken p-3">
          <p className="text-sm leading-relaxed text-text-secondary">
            {agent.systemPrompt}
          </p>
        </div>
      </div>

      {/* Model picker */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-text-tertiary">
          Model
        </label>
        <div className="relative">
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-[8px] border border-border-subtle bg-bg-raised py-2 pl-3 pr-8 font-mono text-sm text-text-primary outline-none transition-colors focus:border-lumen-accent"
          >
            {MODELS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          />
        </div>
      </div>

      {/* Temperature slider */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-medium text-text-tertiary">
            Temperature
          </label>
          <span className="font-mono text-xs text-text-secondary">
            {temperature.toFixed(2)}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className="temperature-slider w-full cursor-pointer"
        />
        <div className="mt-1.5 flex justify-between">
          <span className="text-xs text-text-tertiary">Precise</span>
          <span className="text-xs text-text-tertiary">Creative</span>
        </div>
      </div>

      {/* Tools */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-text-tertiary">
          Tools
        </label>
        {agent.tools.length > 0 ? (
          <div className="space-y-1.5">
            {agent.tools.map((tool) => (
              <div
                key={tool}
                className="flex items-center justify-between overflow-hidden rounded-[6px] border border-border-subtle bg-bg-raised px-3 py-2"
              >
                <span className="font-mono text-sm text-text-primary">
                  {tool}
                </span>
                <Toggle
                  checked={enabledTools.has(tool)}
                  onChange={() => toggleTool(tool)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-tertiary">No tools configured</p>
        )}
      </div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        "relative h-5 w-9 flex-shrink-0 cursor-pointer overflow-hidden rounded-full transition-colors duration-200",
        checked ? "bg-lumen-accent" : "border border-border-strong bg-bg-sunken"
      )}
    >
      <span
        className={cn(
          "absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200",
          checked ? "translate-x-[18px]" : "translate-x-0"
        )}
      />
    </button>
  );
}

function ContextTab() {
  const used = 4821;
  const total = 200000;
  const pct = (used / total) * 100;

  return (
    <div className="space-y-5">
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-xs font-medium text-text-tertiary">
            Context used
          </label>
          <span className="font-mono text-xs text-text-secondary">
            {used.toLocaleString()} / {total.toLocaleString()}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-bg-sunken">
          <div
            className="h-full rounded-full bg-lumen-accent transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-text-tertiary">
          {(100 - pct).toFixed(1)}% remaining
        </p>
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium text-text-tertiary">
          Attached files
        </label>
        <div className="flex flex-col items-center gap-2 rounded-[8px] border border-dashed border-border-strong py-6 text-center">
          <Paperclip size={16} className="text-text-tertiary" />
          <p className="text-xs text-text-tertiary">No files attached</p>
          <button className="text-xs text-lumen-accent hover:underline">
            Attach a file
          </button>
        </div>
      </div>
    </div>
  );
}

function ArtifactsTab() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <Box size={20} className="text-text-tertiary" />
      <p className="text-sm text-text-tertiary">No artifacts yet</p>
      <p className="max-w-[200px] text-xs text-text-tertiary">
        Code files, documents, and images created during this conversation will
        appear here.
      </p>
    </div>
  );
}
