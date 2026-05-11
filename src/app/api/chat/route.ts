import { streamText, convertToModelMessages } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { getAgent } from "@/lib/agents";

export async function POST(req: Request) {
  const { messages, agentId } = await req.json();
  const agent = getAgent(agentId);

  const result = streamText({
    model: anthropic(agent?.model ?? "claude-sonnet-4-6"),
    system: agent?.systemPrompt,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
