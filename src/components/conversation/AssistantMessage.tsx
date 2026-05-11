"use client";

import { useState } from "react";
import { Copy, RefreshCw, ThumbsUp, ThumbsDown, GitBranch, Check } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";
import { ToolUseBlock } from "./ToolUseBlock";
import type { Message } from "@/lib/sample-conversations";

interface AssistantMessageProps {
  message: Message;
  isStreaming?: boolean;
}

function AgentAvatar({ name }: { name: string }) {
  return (
    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-lumen-accent-soft text-xs font-semibold text-lumen-accent">
      {name[0].toUpperCase()}
    </div>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex h-7 w-7 items-center justify-center rounded-[6px] text-text-tertiary transition-colors hover:bg-bg-sunken hover:text-text-secondary"
    >
      {icon}
    </button>
  );
}

export function AssistantMessage({ message, isStreaming }: AssistantMessageProps) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const agentName = message.agent ?? "assistant";
  const hasToolCalls = (message.toolCalls?.length ?? 0) > 0;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Agent header */}
      <div className="mb-3 flex items-center gap-2">
        <AgentAvatar name={agentName} />
        <span className="text-sm font-medium text-text-secondary capitalize">
          {agentName}
        </span>
      </div>

      {/* Tool calls — before response text */}
      {hasToolCalls && (
        <div className="mb-4 space-y-2">
          {message.toolCalls!.map((tc) => (
            <ToolUseBlock key={tc.id} toolCall={tc} />
          ))}
        </div>
      )}

      {/* Message body */}
      <div className="space-y-3">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            pre({ children }) {
              return <>{children}</>;
            },
            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              const raw = String(children);
              const isBlock = match !== null || raw.includes("\n");
              if (isBlock) {
                return (
                  <div className="my-4">
                    <CodeBlock
                      language={match?.[1]}
                      code={raw.replace(/\n$/, "")}
                    />
                  </div>
                );
              }
              return (
                <code className="font-mono text-sm bg-bg-sunken px-1.5 py-0.5 rounded-[4px] text-text-primary">
                  {children}
                </code>
              );
            },
            p({ children }) {
              return (
                <p className="font-serif text-md text-text-primary leading-[26px] mb-3 last:mb-0">
                  {children}
                </p>
              );
            },
            h1({ children }) {
              return <h1 className="text-xl font-semibold text-text-primary mt-6 mb-3">{children}</h1>;
            },
            h2({ children }) {
              return <h2 className="text-lg font-semibold text-text-primary mt-5 mb-2">{children}</h2>;
            },
            h3({ children }) {
              return <h3 className="text-base font-semibold text-text-primary mt-4 mb-2">{children}</h3>;
            },
            ul({ children }) {
              return (
                <ul className="list-disc pl-5 space-y-1 mb-3 font-serif text-md text-text-primary">
                  {children}
                </ul>
              );
            },
            ol({ children }) {
              return (
                <ol className="list-decimal pl-5 space-y-1 mb-3 font-serif text-md text-text-primary">
                  {children}
                </ol>
              );
            },
            li({ children }) {
              return <li className="leading-[26px]">{children}</li>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-l-2 border-border-strong pl-4 italic text-text-secondary my-3">
                  {children}
                </blockquote>
              );
            },
            a({ href, children }) {
              return (
                <a
                  href={href}
                  className="text-lumen-accent underline underline-offset-2 hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-4">
                  <table className="w-full border-collapse text-sm">{children}</table>
                </div>
              );
            },
            th({ children }) {
              return (
                <th className="border border-border-subtle px-3 py-2 text-left font-medium text-text-primary">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="border border-border-subtle px-3 py-2 text-text-secondary">
                  {children}
                </td>
              );
            },
            hr() {
              return <hr className="border-border-subtle my-4" />;
            },
            strong({ children }) {
              return <strong className="font-semibold text-text-primary">{children}</strong>;
            },
            em({ children }) {
              return <em className="italic">{children}</em>;
            },
          }}
        >
          {message.content}
        </Markdown>

        {isStreaming && (
          <span className="streaming-cursor inline-block w-[2px] h-[1.1em] bg-lumen-accent align-text-bottom ml-0.5" />
        )}
      </div>

      {/* Hover action row — hidden during streaming */}
      {!isStreaming && (
        <div
          className="mt-3 flex items-center gap-0.5 transition-opacity duration-150"
          style={{ opacity: hovered ? 1 : 0 }}
          aria-hidden={!hovered}
        >
          <ActionButton
            label={copied ? "Copied" : "Copy"}
            icon={
              copied ? (
                <Check size={13} className="text-lumen-success" />
              ) : (
                <Copy size={13} />
              )
            }
            onClick={handleCopy}
          />
          <ActionButton label="Regenerate" icon={<RefreshCw size={13} />} />
          <ActionButton label="Good response" icon={<ThumbsUp size={13} />} />
          <ActionButton label="Bad response" icon={<ThumbsDown size={13} />} />
          <ActionButton label="Branch" icon={<GitBranch size={13} />} />
        </div>
      )}
    </div>
  );
}
