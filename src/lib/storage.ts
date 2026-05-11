import type { Agent } from "@/lib/agents";

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

export function deleteCustomAgent(id: string): void {
  if (typeof window === "undefined") return;
  const next = getCustomAgents().filter((a) => a.id !== id);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
