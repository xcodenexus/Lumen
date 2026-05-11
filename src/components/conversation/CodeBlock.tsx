"use client";

import { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  language?: string;
  code: string;
  className?: string;
}

export function CodeBlock({ language, code, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const highlight = async () => {
      try {
        const { codeToHtml } = await import("shiki");
        const html = await codeToHtml(code, {
          lang: language || "text",
          themes: {
            light: "github-light",
            dark: "github-dark-dimmed",
          },
          defaultColor: false,
        });
        if (!cancelled) setHighlighted(html);
      } catch {
        // Unsupported language — retry with plain text
        try {
          const { codeToHtml } = await import("shiki");
          const html = await codeToHtml(code, {
            lang: "text",
            themes: {
              light: "github-light",
              dark: "github-dark-dimmed",
            },
            defaultColor: false,
          });
          if (!cancelled) setHighlighted(html);
        } catch {
          // Give up; plain <pre> fallback renders
        }
      }
    };

    highlight();
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[8px] border border-border-subtle bg-bg-sunken",
        className
      )}
    >
      {/* Header bar */}
      <div className="flex h-8 items-center justify-between border-b border-border-subtle px-4">
        <span className="font-mono text-xs text-text-tertiary">
          {language ?? "code"}
        </span>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="inline-flex items-center gap-1 text-xs text-text-tertiary transition-colors hover:text-text-secondary"
        >
          {copied ? (
            <>
              <Check size={12} className="text-lumen-success" />
              <span className="text-lumen-success">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto p-4">
        {highlighted ? (
          <div
            className="shiki-wrap font-mono text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        ) : (
          <pre className="font-mono text-sm text-text-primary leading-relaxed whitespace-pre">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
