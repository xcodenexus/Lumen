import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { TransitionLayout } from "@/components/common/TransitionLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Lumen — AI Agent Workspace",
  description: "Build and run custom AI agents. A workspace for serious work.",
  openGraph: {
    title: "Lumen — AI Agent Workspace",
    description: "Build and run custom AI agents. A workspace for serious work.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Lumen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumen — AI Agent Workspace",
    description: "Build and run custom AI agents. A workspace for serious work.",
  },
};

const themeScript = `
  (function () {
    try {
      var stored = localStorage.getItem('lumen-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (stored === 'dark' || (!stored && prefersDark)) {
        document.documentElement.classList.add('dark');
      }
    } catch (_) {}
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full antialiased">
        <a
          href="#main-content"
          className="fixed left-0 top-0 z-[9999] -translate-y-full rounded-br-[8px] bg-lumen-accent px-4 py-2 text-sm font-medium text-lumen-accent-fg transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <TransitionLayout>{children}</TransitionLayout>
      </body>
    </html>
  );
}
