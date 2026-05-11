"use client";

import { useState, useEffect, useCallback } from "react";
import {
  mockConversationList,
  type ConversationListItem,
} from "@/lib/sample-conversations";
import {
  getStoredConversations,
  saveStoredConversation,
  deleteStoredConversation,
} from "@/lib/storage";

function computeGroup(updatedAt: string): string {
  const now = new Date();
  const date = new Date(updatedAt);
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(todayStart.getTime() - 86_400_000);

  if (date >= todayStart) return "Today";
  if (date >= yesterdayStart) return "Yesterday";
  return "Last 7 days";
}

export function useConversations() {
  const [customItems, setCustomItems] = useState<ConversationListItem[]>([]);

  useEffect(() => {
    setCustomItems(getStoredConversations());
  }, []);

  const create = useCallback((title: string, agentId: string): string => {
    const id = `conv-${Date.now()}`;
    const now = new Date().toISOString();
    const item: ConversationListItem = {
      id,
      title,
      agentId,
      updatedAt: now,
      group: computeGroup(now),
    };
    saveStoredConversation(item);
    setCustomItems((prev) => [item, ...prev]);
    return id;
  }, []);

  const remove = useCallback((id: string) => {
    deleteStoredConversation(id);
    setCustomItems((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const conversations: ConversationListItem[] = [
    ...customItems,
    ...mockConversationList,
  ];

  return { conversations, create, remove };
}
