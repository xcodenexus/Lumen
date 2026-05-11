"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { EmptyState } from "./EmptyState";
import { MessageList } from "./MessageList";
import { Composer } from "./Composer";
import type { Message } from "@/lib/sample-conversations";

interface ChatViewProps {
  agentId?: string;
}

export function ChatView({ agentId }: ChatViewProps) {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      body: agentId ? { agentId } : undefined,
    }),
  });

  const isStreaming = status === "streaming" || status === "submitted";

  const handleSubmit = (text: string) => {
    sendMessage({ text });
  };

  const chatMessages: Message[] = messages.map((m) => ({
    id: m.id,
    role: m.role as "user" | "assistant",
    content: m.parts
      .filter((p) => p.type === "text")
      .map((p) => (p as { type: "text"; text: string }).text)
      .join(""),
    timestamp: new Date().toISOString(),
  }));

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {chatMessages.length === 0 ? (
        <EmptyState onPromptSelect={handleSubmit} />
      ) : (
        <MessageList messages={chatMessages} isStreaming={isStreaming} />
      )}
      <Composer onSubmit={handleSubmit} isLoading={isStreaming} />
    </div>
  );
}
