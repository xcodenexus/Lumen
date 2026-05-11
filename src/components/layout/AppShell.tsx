"use client";

import { useState } from "react";
import { LeftNav } from "./LeftNav";
import { TopBar } from "./TopBar";
import { RightInspector } from "./RightInspector";
import { CommandPalette } from "@/components/common/CommandPalette";
import type { Agent } from "@/lib/agents";

interface AppShellProps {
  children: React.ReactNode;
  agent?: Agent;
}

export function AppShell({ children, agent }: AppShellProps) {
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      <LeftNav
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* Middle column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          agent={agent}
          inspectorOpen={inspectorOpen}
          onToggleInspector={() => setInspectorOpen((v) => !v)}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />
        {children}
      </div>

      {/* Inspector is desktop-only — hidden below md breakpoint */}
      <div className="hidden md:contents">
        <RightInspector open={inspectorOpen} agent={agent} />
      </div>
      <CommandPalette />
    </div>
  );
}
