import { cn } from "@/lib/utils";

interface AgentAvatarProps {
  agentId: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AgentAvatar({ agentId, size = "md", className }: AgentAvatarProps) {
  const Icon = ICONS[agentId] ?? DefaultIcon;
  return (
    <div
      className={cn(
        "flex flex-shrink-0 items-center justify-center rounded-[10px] bg-lumen-accent-soft text-lumen-accent",
        size === "sm" && "h-8 w-8 rounded-[6px]",
        size === "md" && "h-10 w-10",
        size === "lg" && "h-14 w-14 rounded-[12px]",
        className
      )}
    >
      <Icon size={size} />
    </div>
  );
}

function IconWrapper({
  size,
  children,
}: {
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
}) {
  const dim = size === "sm" ? 14 : size === "md" ? 18 : 24;
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function AtlasIcon({ size }: { size: "sm" | "md" | "lg" }) {
  return (
    <IconWrapper size={size}>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 4.5L13.8 10H10.2L12 4.5Z" fill="currentColor" />
      <path d="M12 19.5L10.2 14H13.8L12 19.5Z" fill="currentColor" opacity="0.4" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </IconWrapper>
  );
}

function ForgeIcon({ size }: { size: "sm" | "md" | "lg" }) {
  return (
    <IconWrapper size={size}>
      <path
        d="M12 3L20.66 8V16L12 21L3.34 16V8L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 8.5L16 10.75V15.25L12 17.5L8 15.25V10.75L12 8.5Z"
        fill="currentColor"
      />
    </IconWrapper>
  );
}

function QuillIcon({ size }: { size: "sm" | "md" | "lg" }) {
  return (
    <IconWrapper size={size}>
      <path
        d="M4 20L9.5 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9.5 14.5C9.5 14.5 8 7 17 3C21 7 16 16 9.5 14.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 14.5L13.5 10.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </IconWrapper>
  );
}

function LedgerIcon({ size }: { size: "sm" | "md" | "lg" }) {
  return (
    <IconWrapper size={size}>
      <rect x="3.5" y="14" width="4" height="7" rx="1" fill="currentColor" />
      <rect x="10" y="9.5" width="4" height="11.5" rx="1" fill="currentColor" />
      <rect
        x="16.5"
        y="4.5"
        width="4"
        height="16.5"
        rx="1"
        fill="currentColor"
        opacity="0.7"
      />
    </IconWrapper>
  );
}

function BeaconIcon({ size }: { size: "sm" | "md" | "lg" }) {
  return (
    <IconWrapper size={size}>
      <line
        x1="7"
        y1="3.5"
        x2="7"
        y2="21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M7 3.5L21 11L7 14.5Z" fill="currentColor" />
    </IconWrapper>
  );
}

function DefaultIcon({ size }: { size: "sm" | "md" | "lg" }) {
  return (
    <IconWrapper size={size}>
      <path
        d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"
        fill="currentColor"
        opacity="0.8"
      />
    </IconWrapper>
  );
}

const ICONS: Record<
  string,
  (props: { size: "sm" | "md" | "lg" }) => React.ReactElement
> = {
  atlas: AtlasIcon,
  forge: ForgeIcon,
  quill: QuillIcon,
  ledger: LedgerIcon,
  beacon: BeaconIcon,
};
