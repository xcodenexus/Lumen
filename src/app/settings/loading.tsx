export default function SettingsLoading() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      <div className="w-[240px] flex-shrink-0 border-r border-border-subtle bg-bg-raised" />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-8 py-10">
          {/* Back link skeleton */}
          <div className="mb-6 h-4 w-12 animate-pulse rounded-md bg-bg-sunken" />

          {/* Header skeleton */}
          <div className="mb-8 space-y-2">
            <div className="h-6 w-24 animate-pulse rounded-md bg-bg-sunken" />
            <div className="h-3.5 w-56 animate-pulse rounded-md bg-bg-sunken" />
          </div>

          {/* Tab bar skeleton */}
          <div className="mb-8 flex gap-1 border-b border-border-subtle pb-0">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-20 animate-pulse rounded-t-md bg-bg-sunken"
              />
            ))}
          </div>

          {/* Content skeleton */}
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-16 w-full animate-pulse rounded-[10px] bg-bg-sunken"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
