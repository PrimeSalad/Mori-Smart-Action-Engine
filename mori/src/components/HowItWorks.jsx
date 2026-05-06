import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Flame,
  Globe2,
  SearchCheck,
} from "lucide-react";

const panelCards = [
  {
    label: "Analyze",
    icon: SearchCheck,
    title: "Emergency Response — Brush Fire",
    meta: "Urgency: Critical",
    text: "Mori extracts the issue, context, location clues, and readiness score from the active post.",
  },
  {
    label: "Fact Check",
    icon: CheckCircle2,
    title: "Transparency Verdict",
    meta: "True — 95% confidence",
    text: "Deep search compares claims against credible sources before action is taken.",
  },
  {
    label: "Report",
    icon: FileText,
    title: "Agency-ready Draft",
    meta: "Routing: Fire Department",
    text: "The report tab turns evidence into a formal email, PDF, or editable document.",
  },
];

function BrowserMockup() {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-[#11100f] p-3 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.6)]">
      <div className="mb-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#1b1a19] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5a3d]" />
        <span className="h-3 w-3 rounded-full bg-[#ffb03d]" />
        <span className="h-3 w-3 rounded-full bg-[#54d07a]" />
        <div className="ml-3 flex-1 truncate rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-stone-400">
          social.example/community-alert
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_310px]">
        <article className="rounded-3xl border border-white/10 bg-[#191817] p-5">
          <div className="mb-5 flex items-center justify-between gap-3 rounded-2xl bg-[#faf3ea] p-3 text-[#210b06]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#bd1712] text-white">
                <Flame className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Mori Capture Layer</p>
                <p className="mt-0.5 text-xs font-medium text-[#6b5b53]">
                  Active post detected
                </p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-full bg-[#c71f16] px-3.5 py-2 text-xs font-semibold text-white"
            >
              Scan with Mori
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="h-3 w-4/5 rounded-full bg-white/10" />
            <div className="h-3 w-full rounded-full bg-white/10" />
            <div className="h-3 w-2/3 rounded-full bg-white/10" />
          </div>

          <div className="mt-5 grid grid-cols-[1.5fr_1fr] gap-3">
            <div className="min-h-[220px] rounded-2xl bg-[radial-gradient(circle_at_35%_25%,#ffe5ba_0%,#b8773f_28%,#3c3028_58%,#1a1715_100%)]" />
            <div className="grid gap-3">
              <div className="rounded-2xl bg-[radial-gradient(circle_at_55%_20%,#f5d9a5_0%,#5f4832_34%,#171514_100%)]" />
              <div className="rounded-2xl border border-orange-200/20 bg-[#221613] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-200">
                  Issue
                </p>
                <p className="mt-1.5 text-sm font-semibold text-white">
                  Public safety hazard
                </p>
              </div>
            </div>
          </div>
        </article>

        <aside className="rounded-3xl border border-[#eadfd1] bg-[#f9f2e8] p-5 text-[#21110b]">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b51512] text-white">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Mori — Smart Action Engine</p>
              <p className="mt-0.5 text-xs font-medium text-[#786b61]">
                Scan, verify, report
              </p>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-1.5 text-center text-[11px] font-semibold">
            {["Analyze", "Fact Check", "Report"].map((tab, index) => (
              <span
                key={tab}
                className={`rounded-xl px-2 py-2 ${
                  index === 0 ? "bg-white text-[#b51512]" : "text-[#6c5e54]"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              ["Issue", "Emergency Response"],
              ["Urgency", "Critical"],
              ["Readiness", "Medium (70/100)"],
              ["Civic Impact", "Critical"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a786a]">
                  {label}
                </p>
                <p className="mt-1 text-xs font-semibold">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b51512]">
              Recommended Action
            </p>
            <p className="mt-2 text-sm leading-6 text-[#4b3a32]">
              Monitor official updates and route verified evidence to emergency
              services for coordinated response.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#070504] px-6 py-20 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-[#ff5a2e]/10 blur-3xl" />

      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff8a3d]">
              Browser-native civic intelligence
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              The power of AI in your side panel.
            </h2>
            <p className="mt-5 max-w-[560px] text-base leading-relaxed text-stone-300/80 sm:text-lg">
              Mori lives directly in your browser's side panel, providing a
              seamless, non-intrusive workflow for analyzing the information you
              consume every day. Whether you're browsing Facebook, X, or local
              news sites, Mori is your personal intelligence layer for civic
              responsibility.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {panelCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff3126] to-[#ff8a3d] text-white">
                      <card.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-100">
                      {card.label}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#ffb06a]">
                    {card.meta}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-stone-300/75">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[36px] bg-gradient-to-br from-[#ff3126]/20 via-purple-700/10 to-[#ff9b3d]/20 blur-2xl" />
            <BrowserMockup />
            <div className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-stone-400">
              <Globe2 className="h-4 w-4 text-[#ff8a3d]" aria-hidden="true" />
              Works across social posts, local news, and online content
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
