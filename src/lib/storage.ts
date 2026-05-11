import type { Agent } from "@/lib/agents";
import type { ConversationListItem } from "@/lib/sample-conversations";

const STORAGE_KEY = "lumen_custom_agents";

export function getCustomAgents(): Agent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Agent[]) : [];
  } catch {
    return [];
  }
}

export function saveCustomAgent(agent: Agent): void {
  if (typeof window === "undefined") return;
  const existing = getCustomAgents();
  const idx = existing.findIndex((a) => a.id === agent.id);
  const next =
    idx >= 0
      ? existing.map((a, i) => (i === idx ? agent : a))
      : [...existing, agent];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

const CONVERSATIONS_KEY = "lumen_conversations";

export function getStoredConversations(): ConversationListItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CONVERSATIONS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ConversationListItem[]) : [];
  } catch {
    return [];
  }
}

export function saveStoredConversation(item: ConversationListItem): void {
  if (typeof window === "undefined") return;
  const existing = getStoredConversations();
  const idx = existing.findIndex((c) => c.id === item.id);
  const next =
    idx >= 0 ? existing.map((c, i) => (i === idx ? item : c)) : [item, ...existing];
  window.localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(next));
}

export function deleteStoredConversation(id: string): void {
  if (typeof window === "undefined") return;
  const next = getStoredConversations().filter((c) => c.id !== id);
  window.localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(next));
}

export function deleteCustomAgent(id: string): void {
  if (typeof window === "undefined") return;
  const next = getCustomAgents().filter((a) => a.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
