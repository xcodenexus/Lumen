"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { LeftNav } from "@/components/layout/LeftNav";
import { AgentCard } from "@/components/agents/AgentCard";
import { agents as builtinAgents } from "@/lib/agents";
import { getCustomAgents } from "@/lib/storage";
import type { Agent } from "@/lib/agents";

export default function AgentsPage() {
  const [customAgents, setCustomAgents] = useState<Agent[]>([]);

  useEffect(() => {
    setCustomAgents(getCustomAgents());
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      <LeftNav />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-8 py-10">
          {/* Page header */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h1 className="font-display text-2xl font-semibold text-text-primary">
                Agents
              </h1>
              <p className="mt-1 text-sm text-text-tertiary">
                {builtinAgents.length} built-in
                {customAgents.length > 0 &&
                  ` · ${customAgents.length} custom`}
              </p>
            </div>
            <Link
              href="/agents/new"
              className="inline-flex h-9 items-center gap-1.5 rounded-[8px] bg-lumen-accent px-4 text-sm font-medium text-lumen-accent-fg transition-opacity hover:opacity-90"
            >
              <Plus size={14} />
              New agent
            </Link>
          </div>

          {/* Built-in agents grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {builtinAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>

          {/* Custom agents section */}
          {customAgents.length > 0 && (
            <div className="mt-10">
              <h2 className="mb-4 text-sm font-medium text-text-tertiary">
                Custom
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {customAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
