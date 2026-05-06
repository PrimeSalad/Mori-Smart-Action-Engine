import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Play,
  Route,
  SearchCheck,
} from "lucide-react";
import mascot from "../assets/mori-mascot.png";
import { GOOGLE_DRIVE_DOWNLOAD_LINK, WATCH_DEMO_LINK } from "../config/links";

const floatingCards = [
  {
    label: "Analyze with Mori",
    detail: "Critical issue detected",
    icon: SearchCheck,
    className: "-left-4 top-[10%] sm:-left-10 lg:-left-16",
    anim: "float-card-1",
  },
  {
    label: "Fact-check: True",
    detail: "95% confidence",
    icon: CheckCircle2,
    className: "-right-4 top-[24%] sm:-right-10 lg:-right-16",
    anim: "float-card-2",
  },
  {
    label: "Report Ready",
    detail: "Formal draft prepared",
    icon: ClipboardCheck,
    className: "-left-4 bottom-[28%] sm:-left-10 lg:-left-16",
    anim: "float-card-3",
  },
  {
    label: "Agency Routing",
    detail: "LGU and BFP matched",
    icon: Route,
    className: "-right-4 bottom-[10%] sm:-right-10 lg:-right-16",
    anim: "float-card-4",
  },
];

function FloatingCard({ card }) {
  return (
    <div
      className={`absolute z-20 hidden min-w-[200px] rounded-2xl border border-white/10 bg-[#130b0a]/90 p-3 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:block ${card.anim} ${card.className}`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff352b] to-[#ff9b3d] text-white shadow-[0_0_28px_-6px_rgba(255,84,39,0.55)]">
          <card.icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-white">{card.label}</span>
          <span className="mt-0.5 block text-xs text-stone-300/70">
            {card.detail}
          </span>
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const downloadHref = GOOGLE_DRIVE_DOWNLOAD_LINK || "#install";
  const demoHref = WATCH_DEMO_LINK || "#how-to-use";

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#070504] px-6 pb-20 pt-32 sm:pt-36 lg:px-8 lg:pb-28"
    >
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_28%,rgba(255,67,35,0.26),transparent_28%),radial-gradient(circle_at_82%_64%,rgba(255,158,60,0.22),transparent_26%),linear-gradient(180deg,#120816_0%,#090504_48%,#070504_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[40%] bg-[radial-gradient(ellipse_at_center,rgba(255,122,36,0.32),transparent_58%)]" />
      <div className="absolute left-[8%] top-[22%] -z-10 h-64 w-64 rounded-full bg-purple-700/20 blur-3xl" />

      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.02fr] lg:gap-14">
          {/* Left: Copy */}
          <div className="relative z-10 max-w-[620px]">
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-200/20 bg-orange-300/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-orange-100">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff4a2f] shadow-[0_0_14px_rgba(255,74,47,0.85)]" />
                Scan. Verify. Report.
              </p>

              <h1 className="mt-6 text-[64px] font-extrabold leading-[0.9] tracking-tight text-white sm:text-[88px] lg:text-[104px]">
                MORI
              </h1>
              <p className="mt-3 text-2xl font-bold leading-tight text-stone-100 sm:text-3xl lg:text-[34px]">
                Smart Action Engine
              </p>

              <p className="mt-6 max-w-[560px] text-base leading-7 text-stone-300/80 sm:text-lg sm:leading-8">
                Mori is a Chrome extension that bridges social media awareness
                and real-world civic action. Powered by AI, it helps you
                identify, verify, and report critical community issues — from
                public safety hazards and infrastructure problems to digital
                threats and disinformation.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={downloadHref}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff3126] to-[#ff8a3d] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_-12px_rgba(255,66,35,0.55)] transition duration-200 hover:translate-y-[-1px] hover:shadow-[0_22px_46px_-12px_rgba(255,66,35,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
                >
                  Download
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
                <a
                  href={demoHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
                >
                  <Play className="h-4 w-4 fill-white" aria-hidden="true" />
                  Watch Demo
                </a>
              </div>
          </div>

          {/* Right: Mascot */}
          <div className="relative mx-auto w-full max-w-[530px] overflow-visible">
            <div className="relative aspect-[4/5] w-full overflow-visible">
              {/* Stage glow + base */}
              <div className="absolute inset-x-[10%] bottom-12 h-36 rounded-[50%] bg-gradient-to-r from-[#53120d] via-[#ff8a2f] to-[#170806] opacity-70 blur-2xl" />
              <div className="absolute bottom-14 left-1/2 h-24 w-[66%] -translate-x-1/2 rounded-[50%] border border-orange-200/20 bg-gradient-to-b from-[#3a1b12] to-[#0a0504] shadow-[0_22px_70px_-20px_rgba(255,92,27,0.45)]" />
              <div className="absolute bottom-20 left-1/2 h-14 w-[54%] -translate-x-1/2 rounded-[50%] border border-white/10 bg-[#0d0707]" />
              <div className="absolute inset-x-[20%] top-[20%] -z-10 h-[54%] rounded-full bg-[#ff5a2e]/20 blur-3xl" />

              <img
                src={mascot}
                alt="Mori pixel Roman mascot"
                className="relative z-10 mx-auto h-[84%] w-auto max-w-[400px] translate-x-4 translate-y-20 object-contain drop-shadow-[0_34px_44px_rgba(0,0,0,0.5)]"
              />

              {floatingCards.map((card) => (
                <FloatingCard key={card.label} card={card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
