export default function AgentsLoading() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      <div className="w-[240px] flex-shrink-0 border-r border-border-subtle bg-bg-raised" />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-8 py-10">
          {/* Header skeleton */}
          <div className="mb-8 flex items-end justify-between">
            <div className="space-y-2">
              <div className="h-6 w-20 animate-pulse rounded-md bg-bg-sunken" />
              <div className="h-3.5 w-28 animate-pulse rounded-md bg-bg-sunken" />
            </div>
            <div className="h-9 w-28 animate-pulse rounded-[8px] bg-bg-sunken" />
          </div>

          {/* Card grid skeleton */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-[12px] border border-border-subtle bg-bg-raised p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 animate-pulse rounded-[10px] bg-bg-sunken" />
                  <div className="h-5 w-16 animate-pulse rounded-full bg-bg-sunken" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-16 animate-pulse rounded-md bg-bg-sunken" />
                  <div className="h-3.5 w-full animate-pulse rounded-md bg-bg-sunken" />
                  <div className="h-3.5 w-4/5 animate-pulse rounded-md bg-bg-sunken" />
                </div>
                <div className="mt-auto flex justify-between">
                  <div className="h-3.5 w-20 animate-pulse rounded-md bg-bg-sunken" />
                  <div className="h-3.5 w-12 animate-pulse rounded-md bg-bg-sunken" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
