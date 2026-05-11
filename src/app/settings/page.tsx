"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Key,
  BarChart2,
  Users,
  Copy,
  Eye,
  EyeOff,
  Check,
  Trash2,
  Plus,
  ArrowLeft,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { LeftNav } from "@/components/layout/LeftNav";
import { cn } from "@/lib/utils";

type Tab = "profile" | "api-keys" | "usage" | "team";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "profile", label: "Profile", icon: <User size={14} /> },
  { id: "api-keys", label: "API Keys", icon: <Key size={14} /> },
  { id: "usage", label: "Usage", icon: <BarChart2 size={14} /> },
  { id: "team", label: "Team", icon: <Users size={14} /> },
];

const DAILY_MESSAGES = [
  { day: "Mon", messages: 24 },
  { day: "Tue", messages: 41 },
  { day: "Wed", messages: 18 },
  { day: "Thu", messages: 63 },
  { day: "Fri", messages: 55 },
  { day: "Sat", messages: 12 },
  { day: "Sun", messages: 29 },
];

const TOKENS_BY_MODEL = [
  { model: "Sonnet", input: 142000, output: 38000 },
  { model: "Haiku", input: 89000, output: 21000 },
  { model: "Opus", input: 31000, output: 12000 },
];

const TEAM_MEMBERS = [
  { id: "1", name: "Jamie", email: "jamie@acme.co", role: "Admin", initials: "J" },
  { id: "2", name: "Alex", email: "alex@acme.co", role: "Developer", initials: "A" },
  { id: "3", name: "Sam", email: "sam@acme.co", role: "Reader", initials: "S" },
];

const ROLE_COLORS: Record<string, string> = {
  Admin: "bg-lumen-accent-soft text-lumen-accent",
  Developer: "bg-bg-sunken text-text-secondary",
  Reader: "bg-bg-sunken text-text-tertiary",
};

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");
  const router = useRouter();

  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      <LeftNav />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-8 py-10">
          <button
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-secondary transition-colors"
          >
            <ArrowLeft size={13} />
            Back
          </button>

          <div className="mb-8">
            <h1 className="font-display text-2xl font-semibold text-text-primary">
              Settings
            </h1>
            <p className="mt-1 text-sm text-text-tertiary">
              Manage your account, keys, and workspace.
            </p>
          </div>

          {/* Tab bar */}
          <div className="mb-8 flex gap-1 border-b border-border-subtle">
            {TABS.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 text-sm transition-colors",
                  "border-b-2 -mb-px",
                  tab === id
                    ? "border-lumen-accent text-text-primary font-medium"
                    : "border-transparent text-text-tertiary hover:text-text-secondary"
                )}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {tab === "profile" && <ProfileTab />}
          {tab === "api-keys" && <ApiKeysTab />}
          {tab === "usage" && <UsageTab />}
          {tab === "team" && <TeamTab />}
        </div>
      </main>
    </div>
  );
}

function ProfileTab() {
  const [name, setName] = useState("Jamie");
  const [email, setEmail] = useState("jamie@acme.co");
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lumen-accent-soft text-xl font-semibold text-lumen-accent">
          {name.slice(0, 1)}
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary">{name}</p>
          <p className="text-xs text-text-tertiary">{email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SettingsField label="Display name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldCls}
          />
        </SettingsField>
        <SettingsField label="Email">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldCls}
          />
        </SettingsField>
      </div>

      <SettingsField label="Bio">
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="A short bio about yourself…"
          rows={3}
          className={cn(fieldCls, "resize-none h-auto")}
        />
      </SettingsField>

      <div className="flex justify-end border-t border-border-subtle pt-6">
        <button
          onClick={handleSave}
          className={cn(
            "inline-flex h-9 items-center gap-2 rounded-[8px] px-5 text-sm font-medium transition-all",
            saved
              ? "bg-lumen-success text-white"
              : "bg-lumen-accent text-lumen-accent-fg hover:opacity-90"
          )}
        >
          {saved ? (
            <>
              <Check size={13} />
              Saved
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </div>
  );
}

function ApiKeysTab() {
  const [keys] = useState([
    { id: "1", name: "Production", key: "sk-ant-api03-xKj9mNpQrSt", created: "Apr 3, 2025" },
    { id: "2", name: "Development", key: "sk-ant-api03-aB7cDeF2gHi", created: "May 1, 2025" },
  ]);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);

  const toggleReveal = (id: string) =>
    setRevealed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const copyKey = (id: string, key: string) => {
    navigator.clipboard.writeText(key).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const maskKey = (key: string) =>
    key.slice(0, 14) + "••••••••••••" + key.slice(-4);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {keys.map((k) => (
          <div
            key={k.id}
            className="flex items-center gap-3 rounded-[10px] border border-border-subtle bg-bg-raised p-4"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">{k.name}</p>
              <p className="mt-0.5 font-mono text-xs text-text-tertiary">
                {revealed.has(k.id) ? k.key : maskKey(k.key)}
              </p>
              <p className="mt-0.5 text-xs text-text-tertiary">
                Created {k.created}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleReveal(k.id)}
                title={revealed.has(k.id) ? "Hide key" : "Reveal key"}
                className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] text-text-tertiary transition-colors hover:bg-bg-sunken hover:text-text-primary"
              >
                {revealed.has(k.id) ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
              <button
                onClick={() => copyKey(k.id, k.key)}
                title="Copy key"
                className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] text-text-tertiary transition-colors hover:bg-bg-sunken hover:text-text-primary"
              >
                {copied === k.id ? (
                  <Check size={13} className="text-lumen-success" />
                ) : (
                  <Copy size={13} />
                )}
              </button>
              <button
                title="Delete key"
                className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] text-text-tertiary transition-colors hover:bg-bg-sunken hover:text-lumen-error"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="inline-flex h-9 items-center gap-1.5 rounded-[8px] border border-border-subtle px-4 text-sm text-text-secondary transition-colors hover:bg-bg-sunken hover:text-text-primary">
        <Plus size={13} />
        New API key
      </button>

      <div className="rounded-[10px] border border-border-subtle bg-bg-sunken p-4">
        <p className="text-xs font-medium text-text-secondary">
          Keep your API keys secret
        </p>
        <p className="mt-1 text-xs text-text-tertiary">
          Never commit keys to source control. Rotate any key you suspect has
          been exposed.
        </p>
      </div>
    </div>
  );
}

function UsageTab() {
  const totalMessages = DAILY_MESSAGES.reduce((s, d) => s + d.messages, 0);
  const totalTokens = TOKENS_BY_MODEL.reduce(
    (s, m) => s + m.input + m.output,
    0
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Messages this week", value: totalMessages.toString() },
          { label: "Tokens used", value: `${(totalTokens / 1000).toFixed(0)}k` },
          { label: "Active agents", value: "5" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-[10px] border border-border-subtle bg-bg-raised p-4"
          >
            <p className="text-xs text-text-tertiary">{label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-text-primary font-display">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-[12px] border border-border-subtle bg-bg-raised p-5">
        <p className="mb-4 text-sm font-medium text-text-primary">
          Messages — last 7 days
        </p>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart
            data={DAILY_MESSAGES}
            margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-subtle)"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "var(--text-tertiary)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "var(--text-tertiary)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--bg-raised)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                fontSize: 12,
                color: "var(--text-primary)",
              }}
              cursor={{ stroke: "var(--border-strong)" }}
            />
            <Line
              type="monotone"
              dataKey="messages"
              stroke="var(--lumen-accent)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "var(--lumen-accent)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-[12px] border border-border-subtle bg-bg-raised p-5">
        <p className="mb-4 text-sm font-medium text-text-primary">
          Tokens by model
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart
            data={TOKENS_BY_MODEL}
            margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-subtle)"
              vertical={false}
            />
            <XAxis
              dataKey="model"
              tick={{ fill: "var(--text-tertiary)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "var(--text-tertiary)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                background: "var(--bg-raised)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                fontSize: 12,
                color: "var(--text-primary)",
              }}
              cursor={{ fill: "var(--bg-sunken)" }}
            />
            <Bar
              dataKey="input"
              fill="var(--lumen-accent)"
              radius={[4, 4, 0, 0]}
              name="Input"
            />
            <Bar
              dataKey="output"
              fill="var(--lumen-accent-soft)"
              radius={[4, 4, 0, 0]}
              name="Output"
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-text-tertiary">
            <span className="h-2 w-2 rounded-full bg-lumen-accent" />
            Input tokens
          </span>
          <span className="flex items-center gap-1.5 text-xs text-text-tertiary">
            <span className="h-2 w-2 rounded-full bg-lumen-accent-soft border border-border-subtle" />
            Output tokens
          </span>
        </div>
      </div>
    </div>
  );
}

function TeamTab() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteSent, setInviteSent] = useState(false);

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    setInviteSent(true);
    setInviteEmail("");
    setTimeout(() => setInviteSent(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {TEAM_MEMBERS.map((m) => (
          <div
            key={m.id}
            className="flex items-center gap-3 rounded-[10px] border border-border-subtle bg-bg-raised px-4 py-3"
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-lumen-accent-soft text-sm font-medium text-lumen-accent">
              {m.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">{m.name}</p>
              <p className="text-xs text-text-tertiary">{m.email}</p>
            </div>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-medium",
                ROLE_COLORS[m.role]
              )}
            >
              {m.role}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-[12px] border border-border-subtle bg-bg-raised p-5">
        <p className="mb-3 text-sm font-medium text-text-primary">
          Invite a team member
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleInvite()}
            placeholder="colleague@company.com"
            className={cn(fieldCls, "flex-1")}
          />
          <button
            onClick={handleInvite}
            className={cn(
              "inline-flex h-10 items-center gap-1.5 rounded-[8px] px-4 text-sm font-medium transition-all whitespace-nowrap",
              inviteSent
                ? "bg-lumen-success text-white"
                : "bg-lumen-accent text-lumen-accent-fg hover:opacity-90"
            )}
          >
            {inviteSent ? (
              <>
                <Check size={13} />
                Sent!
              </>
            ) : (
              "Send invite"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-text-primary">
        {label}
      </label>
      {children}
    </div>
  );
}

const fieldCls =
  "w-full rounded-[8px] border border-border-subtle bg-bg-raised px-3 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-tertiary focus:border-lumen-accent h-10";
