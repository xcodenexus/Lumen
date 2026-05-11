import { AppShell } from "@/components/layout/AppShell";
import { ChatView } from "@/components/conversation/ChatView";
import { getAgent } from "@/lib/agents";

interface PageProps {
  searchParams: Promise<{ agent?: string }>;
}

export default async function ChatPage({ searchParams }: PageProps) {
  const { agent: agentId } = await searchParams;
  const agent = agentId ? getAgent(agentId) : undefined;

  return (
    <AppShell agent={agent}>
      <ChatView agentId={agentId} />
    </AppShell>
  );
}
