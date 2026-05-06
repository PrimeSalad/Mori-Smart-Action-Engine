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
    className: "left-0 top-[16%] -translate-x-4 md:-translate-x-8",
  },
  {
    label: "Fact-check: True",
    detail: "95% confidence",
    icon: CheckCircle2,
    className: "right-0 top-[28%] translate-x-2 md:translate-x-8",
  },
  {
    label: "Report Ready",
    detail: "Formal draft prepared",
    icon: ClipboardCheck,
    className: "-left-6 bottom-[32%] md:-left-12",
  },
  {
    label: "Agency Routing",
    detail: "LGU and BFP matched",
    icon: Route,
    className: "right-[4%] bottom-[12%]",
  },
];

function FloatingCard({ card }) {
  return (
    <div
      className={`absolute hidden min-w-[190px] rounded-2xl border border-white/10 bg-[#130b0a]/90 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:block ${card.className}`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff352b] to-[#ff9b3d] text-white shadow-[0_0_28px_rgba(255,84,39,0.35)]">
          <card.icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-sm font-black text-white">{card.label}</span>
          <span className="block text-xs font-medium text-stone-300/75">
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
      className="relative isolate overflow-hidden bg-[#070504] px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:min-h-screen lg:px-8 lg:pb-16"
    >
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_70%_28%,rgba(255,67,35,0.26),transparent_28%),radial-gradient(circle_at_82%_64%,rgba(255,158,60,0.22),transparent_26%),linear-gradient(180deg,#120816_0%,#090504_48%,#070504_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[40%] bg-[radial-gradient(ellipse_at_center,rgba(255,122,36,0.32),transparent_58%)]" />
      <div className="absolute left-[8%] top-[22%] -z-10 h-64 w-64 rounded-full bg-purple-700/20 blur-3xl" />

      <div className="mx-auto max-w-[1280px] rounded-[38px] border border-white/10 bg-gradient-to-b from-white/[0.075] to-white/[0.025] p-4 shadow-[0_32px_100px_rgba(0,0,0,0.45)] backdrop-blur sm:p-7 lg:min-h-[720px]">
        <div className="grid min-h-[680px] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="relative z-10 max-w-[650px] px-2 py-10 sm:px-4 lg:py-16">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200/20 bg-orange-300/10 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-orange-100">
              <span className="h-2 w-2 rounded-full bg-[#ff4a2f] shadow-[0_0_18px_rgba(255,74,47,0.8)]" />
              Scan. Verify. Report.
            </p>
            <div className="mt-2 flex flex-col gap-5 sm:gap-6">
              <h1 className="text-[58px] font-black leading-[0.84] tracking-normal text-white sm:text-[92px] lg:text-[132px]">
                MORI
              </h1>
              <p className="text-[28px] font-black italic leading-tight text-stone-100 sm:text-[40px] lg:text-[48px]">
                Smart Action Engine
              </p>
            </div>
            <p className="mt-6 max-w-[580px] text-base leading-8 text-stone-200/80 sm:text-lg">
              Mori is a powerful Chrome extension designed to bridge the gap
              between social media awareness and real-world civic action. Powered
              by advanced AI, Mori helps users identify, verify, and report
              critical community issues-from public safety hazards and
              infrastructure problems to digital threats and disinformation.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={downloadHref}
                className="group inline-flex min-h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#ff3126] to-[#ff8a3d] px-7 text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_20px_50px_rgba(255,66,35,0.36)] transition duration-200 hover:translate-y-[-1px] hover:shadow-[0_26px_70px_rgba(255,66,35,0.46)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
              >
                Download
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href={demoHref}
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-black uppercase tracking-[0.12em] text-white transition duration-200 hover:border-orange-200/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
              >
                <Play className="mr-2 h-4 w-4 fill-white" aria-hidden="true" />
                Watch Demo
              </a>
            </div>
            <p className="mt-5 text-sm font-semibold text-stone-300/75">
              Scan. Verify. Report. Take the right action with Mori.
            </p>
          </div>

          <div className="relative mx-auto min-h-[540px] w-full max-w-[610px]">
            <div className="absolute inset-x-[8%] bottom-8 h-40 rounded-[50%] bg-gradient-to-r from-[#53120d] via-[#ff8a2f] to-[#170806] opacity-70 blur-2xl" />
            <div className="absolute bottom-10 left-1/2 h-28 w-[70%] -translate-x-1/2 rounded-[50%] border border-orange-200/20 bg-gradient-to-b from-[#3a1b12] to-[#0a0504] shadow-[0_22px_70px_rgba(255,92,27,0.26)]" />
            <div className="absolute bottom-16 left-1/2 h-16 w-[58%] -translate-x-1/2 rounded-[50%] border border-white/10 bg-[#0d0707]" />

            <div className="absolute left-1/2 top-7 w-[74%] -translate-x-1/2">
              <div className="relative mx-auto flex aspect-[4/5] max-h-[560px] items-end justify-center">
                <img
                  src={mascot}
                  alt="Mori pixel Roman mascot"
                  className="relative z-10 h-full max-h-[560px] w-auto object-contain drop-shadow-[0_34px_44px_rgba(0,0,0,0.52)]"
                />
                <div className="absolute inset-x-[18%] top-[18%] -z-10 h-[58%] rounded-full bg-[#ff5a2e]/20 blur-3xl" />
              </div>
            </div>

            {floatingCards.map((card) => (
              <FloatingCard key={card.label} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
