import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lumen — AI Agent Workspace";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAFAF7",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 16,
            background: "#C2410C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M7 1L12.5 10H1.5L7 1Z"
              fill="white"
              opacity="0.9"
            />
            <path d="M7 5L10 10H4L7 5Z" fill="white" />
          </svg>
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: "#1A1915",
            letterSpacing: "-0.03em",
            marginBottom: 16,
          }}
        >
          Lumen
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#5A574E",
            letterSpacing: "-0.01em",
          }}
        >
          AI Agent Workspace
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
