import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { MessageList } from "@/components/conversation/MessageList";
import { Composer } from "@/components/conversation/Composer";
import { CodeBlock } from "@/components/conversation/CodeBlock";
import { sampleConversations } from "@/lib/sample-conversations";
import { getAgent } from "@/lib/agents";

interface PageProps {
  params: Promise<{ id: string }>;
}

const FORGE_MIGRATION = `-- Migration: add composite index for orders query
-- Estimated time: ~30s on 2M rows (online, no table lock)

CREATE INDEX CONCURRENTLY idx_orders_user_status_created
  ON orders (user_id, status, created_at DESC);

-- After deploying, verify the plan changed:
-- EXPLAIN SELECT * FROM orders
--   WHERE user_id = $1 AND status = 'pending'
--   ORDER BY created_at DESC LIMIT 20;
-- Expect: Index Scan using idx_orders_user_status_created`;

export default async function ConversationPage({ params }: PageProps) {
  const { id } = await params;
  const conversation = sampleConversations[id];

  if (!conversation) notFound();

  const agent = getAgent(conversation.agentId);

  return (
    <AppShell agent={agent}>
      <div className="flex flex-1 flex-col overflow-hidden">
        <MessageList messages={conversation.messages} />

        {/* Forge conversation: append the migration code block */}
        {id === "sample-forge" && (
          <div className="flex-shrink-0">
            <div className="mx-auto max-w-[720px] px-6 pb-2">
              <CodeBlock language="sql" code={FORGE_MIGRATION} />
            </div>
          </div>
        )}

        <Composer />
      </div>
    </AppShell>
  );
}
