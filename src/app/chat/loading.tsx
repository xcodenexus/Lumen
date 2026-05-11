export default function ChatLoading() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      {/* Nav placeholder */}
      <div className="w-[240px] flex-shrink-0 border-r border-border-subtle bg-bg-raised" />

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* TopBar placeholder */}
        <div className="flex h-14 flex-shrink-0 items-center border-b border-border-subtle bg-bg-raised px-6">
          <div className="h-4 w-32 animate-pulse rounded-full bg-bg-sunken" />
        </div>

        {/* Centered dot */}
        <div className="flex flex-1 items-center justify-center">
          <div className="h-2 w-2 animate-pulse rounded-full bg-lumen-accent opacity-60" />
        </div>
      </div>
    </div>
  );
}
