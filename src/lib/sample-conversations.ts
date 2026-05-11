export interface ToolCall {
  id: string;
  tool: string;
  status: "running" | "done" | "error";
  input: Record<string, string>;
  output?: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  agent?: string;
  toolCalls?: ToolCall[];
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  agentId: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export const sampleConversations: Record<string, Conversation> = {
  "sample-atlas": {
    id: "sample-atlas",
    title: "Comparing Stripe, Paddle, LemonSqueezy",
    agentId: "atlas",
    createdAt: "2026-05-10T09:00:00Z",
    updatedAt: "2026-05-10T09:08:00Z",
    messages: [
      {
        id: "m1",
        role: "user",
        content:
          "I'm comparing Stripe, Paddle, and LemonSqueezy for a new B2B analytics SaaS. We'll do ~$50k MRR in year one, mostly US/EU customers. Which makes the most sense?",
        timestamp: "2026-05-10T09:00:00Z",
      },
      {
        id: "m2",
        role: "assistant",
        agent: "atlas",
        content:
          "Good question — the right answer depends on a few things you didn't mention. Let me ask one before diving in: do you want to handle sales tax / VAT yourself, or do you want the payment provider to act as Merchant of Record and handle it for you?\n\nThat single choice changes the recommendation significantly.",
        toolCalls: [],
        timestamp: "2026-05-10T09:00:30Z",
      },
      {
        id: "m3",
        role: "user",
        content:
          "We want them to handle MoR — we don't want to deal with VAT registrations across the EU.",
        timestamp: "2026-05-10T09:01:00Z",
      },
      {
        id: "m4",
        role: "assistant",
        agent: "atlas",
        content:
          "That narrows it. Stripe is out — they don't act as MoR by default, and Stripe Tax doesn't cover VAT registration. Let me pull current pricing on Paddle and LemonSqueezy.",
        toolCalls: [
          {
            id: "tc1",
            tool: "web_search",
            status: "done",
            input: {
              query: "Paddle vs LemonSqueezy 2026 pricing MoR comparison",
            },
            output:
              "Found 6 results: Paddle pricing page, LemonSqueezy pricing page, IndieHackers thread (2026), Baremetrics comparison article, Twitter/X thread from @patio11, SaaStr podcast notes.",
          },
        ],
        timestamp: "2026-05-10T09:02:00Z",
      },
      {
        id: "m5",
        role: "assistant",
        agent: "atlas",
        content:
          "Here's where they stand as of May 2026:\n\nPaddle charges 5% + $0.50 per transaction, with no monthly fee at your stage. They handle VAT, GST, and sales tax in 200+ jurisdictions automatically. Their dashboard is mature, their EU relationships are solid, and they've been doing MoR for a decade. The downside: their checkout UI is less customizable than Stripe's, and some buyers find it unfamiliar.\n\nLemonSqueezy charges 5% + $0.50 as well — identical on the surface. The difference is positioning: they're built for indie developers and small SaaS, with a much friendlier onboarding experience and a Stripe-like checkout. They also handle MoR fully. The concern at $50k MRR: they're a smaller company with less of a track record handling enterprise-level compliance edge cases.\n\nMy take: at $50k MRR with mostly US/EU enterprise customers, Paddle is the safer call. LemonSqueezy is excellent but optimized for B2C and indie products — when a Fortune 500 procurement team scrutinizes your payment processor, Paddle's name carries more weight.",
        toolCalls: [],
        timestamp: "2026-05-10T09:04:00Z",
      },
      {
        id: "m6",
        role: "user",
        content:
          "Can you show me what the fee comparison looks like at different MRR levels?",
        timestamp: "2026-05-10T09:05:00Z",
      },
      {
        id: "m7",
        role: "assistant",
        agent: "atlas",
        content:
          "Here's the math at three checkpoints. Assumes average transaction size of $400 (annual plan / 12):\n\n```\nMRR        Txns/mo   Paddle fee      LemonSqueezy    Delta\n──────────────────────────────────────────────────────────\n$10,000    25        $525 (5.25%)    $525 (5.25%)    $0\n$50,000    125       $2,563 (5.13%)  $2,563 (5.13%)  $0\n$200,000   500       $10,250 (5.13%) $10,250 (5.13%) $0\n```\n\nThe fee structures are currently identical, so the decision is entirely about fit, risk tolerance, and buyer trust — not economics. If you ever hit ~$500k MRR, both platforms offer custom rates; Paddle has a longer track record of negotiating these down.\n\nBottom line: start with Paddle. If your customers are primarily indie/SMB rather than enterprise, revisit LemonSqueezy at the 6-month mark.",
        toolCalls: [],
        timestamp: "2026-05-10T09:08:00Z",
      },
    ],
  },
  "sample-forge": {
    id: "sample-forge",
    title: "Slow Postgres query on orders table",
    agentId: "forge",
    createdAt: "2026-05-10T10:00:00Z",
    updatedAt: "2026-05-10T10:15:00Z",
    messages: [
      {
        id: "f1",
        role: "user",
        content:
          "This query is taking 4 seconds on a table with 2M rows. Any ideas?\n\nSELECT * FROM orders WHERE user_id = $1 AND status = 'pending' ORDER BY created_at DESC LIMIT 20;",
        timestamp: "2026-05-10T10:00:00Z",
      },
      {
        id: "f2",
        role: "assistant",
        agent: "forge",
        content:
          "My hypothesis: you're doing a full table scan because there's no index covering both `user_id` and `status` together. Postgres can't use an index scan for the filtered sort. Let me check the query plan.",
        toolCalls: [
          {
            id: "fc1",
            tool: "code_interpreter",
            status: "done",
            input: {
              code: "EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM orders WHERE user_id = $1 AND status = 'pending' ORDER BY created_at DESC LIMIT 20;",
            },
            output:
              "Seq Scan on orders  (cost=0.00..89432.00 rows=847 width=312) (actual time=0.043..3891.234 rows=20 loops=1)\n  Filter: ((user_id = 1234) AND ((status)::text = 'pending'::text))\n  Rows Removed by Filter: 1999980\nPlanning Time: 0.8 ms\nExecution Time: 3894.2 ms",
          },
        ],
        timestamp: "2026-05-10T10:01:00Z",
      },
      {
        id: "f3",
        role: "assistant",
        agent: "forge",
        content:
          "Confirmed: full sequential scan, 2M rows filtered to 20. The fix is a composite index on `(user_id, status, created_at DESC)`. Column order matters — equality filters first, sort column last.\n\nHere's the migration:",
        toolCalls: [],
        timestamp: "2026-05-10T10:03:00Z",
        // Note: the code block content is in the message body above and rendered by CodeBlock
      },
    ],
  },
};

export const mockConversationList = [
  {
    id: "sample-atlas",
    title: "Comparing Stripe, Paddle, LemonSqueezy",
    agentId: "atlas",
    updatedAt: "2026-05-10T09:08:00Z",
    group: "Today",
  },
  {
    id: "sample-forge",
    title: "Slow Postgres query on orders table",
    agentId: "forge",
    updatedAt: "2026-05-10T10:15:00Z",
    group: "Today",
  },
  {
    id: "c3",
    title: "Refactor auth middleware",
    agentId: "forge",
    updatedAt: "2026-05-09T14:00:00Z",
    group: "Yesterday",
  },
  {
    id: "c4",
    title: "Q2 pricing strategy review",
    agentId: "beacon",
    updatedAt: "2026-05-09T11:30:00Z",
    group: "Yesterday",
  },
  {
    id: "c5",
    title: "Landing page hero copy",
    agentId: "quill",
    updatedAt: "2026-05-08T16:45:00Z",
    group: "Last 7 days",
  },
  {
    id: "c6",
    title: "Cohort retention analysis",
    agentId: "ledger",
    updatedAt: "2026-05-07T09:20:00Z",
    group: "Last 7 days",
  },
];
