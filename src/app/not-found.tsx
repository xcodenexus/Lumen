import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-base px-4 text-center">
      {/* Logo */}
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[10px] bg-lumen-accent text-lumen-accent-fg">
        <svg width="22" height="22" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 1L12.5 10H1.5L7 1Z" fill="currentColor" opacity="0.9" />
          <path d="M7 5L10 10H4L7 5Z" fill="currentColor" />
        </svg>
      </div>

      <p className="mb-2 font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
        404
      </p>
      <h1 className="font-serif mb-3 text-2xl text-text-primary">
        Page not found
      </h1>
      <p className="mb-8 max-w-xs text-sm text-text-tertiary">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>

      <Link
        href="/chat"
        className="inline-flex h-9 items-center rounded-[8px] bg-lumen-accent px-5 text-sm font-medium text-lumen-accent-fg transition-opacity hover:opacity-90"
      >
        Go to workspace
      </Link>
    </div>
  );
}
