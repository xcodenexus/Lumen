"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { AgentAvatar } from "./AgentAvatar";
import { saveCustomAgent } from "@/lib/storage";
import { cn } from "@/lib/utils";
import type { Agent } from "@/lib/agents";

const CATEGORIES: Agent["category"][] = [
  "Research",
  "Coding",
  "Writing",
  "Data",
  "Strategy",
];

const MODELS: { value: Agent["model"]; label: string }[] = [
  { value: "claude-sonnet-4-7", label: "claude-sonnet-4-7" },
  { value: "claude-opus-4-7", label: "claude-opus-4-7" },
  { value: "claude-haiku-4-5", label: "claude-haiku-4-5" },
];

export function AgentBuilder() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [category, setCategory] = useState<Agent["category"]>("Coding");
  const [model, setModel] = useState<Agent["model"]>("claude-sonnet-4-7");
  const [temperature, setTemperature] = useState(0.7);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [tools, setTools] = useState<string[]>([]);
  const [newTool, setNewTool] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addTool = () => {
    const trimmed = newTool.trim();
    if (!trimmed || tools.includes(trimmed)) return;
    setTools((prev) => [...prev, trimmed]);
    setNewTool("");
  };

  const removeTool = (tool: string) => {
    setTools((prev) => prev.filter((t) => t !== tool));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required";
    if (!tagline.trim()) next.tagline = "Tagline is required";
    if (!systemPrompt.trim()) next.systemPrompt = "System prompt is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const agent: Agent = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim(),
      category,
      model,
      temperature,
      systemPrompt: systemPrompt.trim(),
      tools,
      sampleConversationId: "",
    };
    saveCustomAgent(agent);
    router.push("/agents");
  };

  const agentPreviewId = name.toLowerCase().replace(/\s+/g, "-") || "custom";

  return (
    <div className="mx-auto max-w-2xl px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-text-primary">
          New agent
        </h1>
        <p className="mt-1 text-sm text-text-tertiary">
          Configure a custom AI agent for your workspace.
        </p>
      </div>

      <div className="space-y-6">
        {/* Preview */}
        <div className="flex items-center gap-4 rounded-[12px] border border-border-subtle bg-bg-raised p-4">
          <AgentAvatar agentId={agentPreviewId} size="lg" />
          <div>
            <p className="font-semibold text-text-primary">
              {name || "Agent name"}
            </p>
            <p className="text-sm text-text-secondary">
              {tagline || "Your agent's tagline will appear here"}
            </p>
          </div>
        </div>

        {/* Name */}
        <Field label="Name" error={errors.name}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Scout"
            className={inputCls(!!errors.name)}
          />
        </Field>

        {/* Tagline */}
        <Field label="Tagline" error={errors.tagline}>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="One-line description of what this agent does"
            className={inputCls(!!errors.tagline)}
          />
        </Field>

        {/* Category + Model row */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as Agent["category"])
              }
              className={inputCls(false)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Model">
            <select
              value={model}
              onChange={(e) => setModel(e.target.value as Agent["model"])}
              className={cn(inputCls(false), "font-mono")}
            >
              {MODELS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* Temperature */}
        <Field label="Temperature">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="temperature-slider flex-1 cursor-pointer"
            />
            <span className="w-10 text-right font-mono text-sm text-text-secondary">
              {temperature.toFixed(2)}
            </span>
          </div>
          <div className="mt-1 flex justify-between">
            <span className="text-xs text-text-tertiary">Precise</span>
            <span className="text-xs text-text-tertiary">Creative</span>
          </div>
        </Field>

        {/* System prompt */}
        <Field label="System prompt" error={errors.systemPrompt}>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Describe how this agent should behave, what it knows, and how it should respond…"
            rows={6}
            className={cn(inputCls(!!errors.systemPrompt), "resize-none")}
          />
        </Field>

        {/* Tools */}
        <Field label="Tools">
          {tools.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center gap-1 rounded-full border border-border-subtle bg-bg-sunken px-2.5 py-0.5 font-mono text-xs text-text-secondary"
                >
                  {tool}
                  <button
                    onClick={() => removeTool(tool)}
                    className="text-text-tertiary hover:text-text-primary"
                    aria-label={`Remove ${tool}`}
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={newTool}
              onChange={(e) => setNewTool(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTool()}
              placeholder="e.g. web_search"
              className={cn(inputCls(false), "font-mono flex-1")}
            />
            <button
              onClick={addTool}
              className="inline-flex h-10 items-center gap-1 rounded-[8px] border border-border-subtle px-3 text-sm text-text-secondary transition-colors hover:bg-bg-sunken hover:text-text-primary"
            >
              <Plus size={13} />
              Add
            </button>
          </div>
        </Field>

        {/* Actions */}
        <div className="flex justify-end gap-2 border-t border-border-subtle pt-6">
          <button
            onClick={() => router.push("/agents")}
            className="inline-flex h-9 items-center rounded-[8px] px-4 text-sm text-text-secondary transition-colors hover:bg-bg-sunken hover:text-text-primary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="inline-flex h-9 items-center rounded-[8px] bg-lumen-accent px-5 text-sm font-medium text-lumen-accent-fg transition-opacity hover:opacity-90"
          >
            Save agent
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-text-primary">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-lumen-error">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full rounded-[8px] border bg-bg-raised px-3 py-2.5 text-sm text-text-primary outline-none transition-colors",
    "placeholder:text-text-tertiary",
    "focus:border-lumen-accent",
    hasError ? "border-lumen-error" : "border-border-subtle"
  );
}
