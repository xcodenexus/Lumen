import { LeftNav } from "@/components/layout/LeftNav";
import { AgentBuilder } from "@/components/agents/AgentBuilder";

export default function NewAgentPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      <LeftNav />
      <main className="flex-1 overflow-y-auto">
        <AgentBuilder />
      </main>
    </div>
  );
}
