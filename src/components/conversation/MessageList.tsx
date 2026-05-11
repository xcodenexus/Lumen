"use client";

import { useEffect, useRef } from "react";
import { UserMessage } from "./UserMessage";
import { AssistantMessage } from "./AssistantMessage";
import type { Message } from "@/lib/sample-conversations";

interface MessageListProps {
  messages: Message[];
  isStreaming?: boolean;
}

export function MessageList({ messages, isStreaming }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-[720px] space-y-6 px-6 pb-[120px] pt-8">
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <UserMessage key={msg.id} content={msg.content} />
          ) : (
            <AssistantMessage
              key={msg.id}
              message={msg}
              isStreaming={isStreaming && i === messages.length - 1}
            />
          )
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
