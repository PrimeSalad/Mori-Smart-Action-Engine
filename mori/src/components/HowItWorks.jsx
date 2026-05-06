import {
  CheckCircle2,
  FileText,
  Globe2,
  SearchCheck,
} from "lucide-react";
import analyzeScreenshot from "../assets/mori-analyze-panel.png";
import factCheckScreenshot from "../assets/mori-fact-check-panel.png";
import reportScreenshot from "../assets/mori-report-panel.png";

const productScreenshots = [
  {
    src: analyzeScreenshot,
    title: "Analyze",
    description: "Mori detects urgency, civic impact, and next action.",
  },
  {
    src: factCheckScreenshot,
    title: "Fact Check",
    description: "Mori verifies claims with a transparency verdict.",
  },
  {
    src: reportScreenshot,
    title: "Report",
    description: "Mori prepares the report body and routing details.",
  },
];

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

function ProductScreenshots() {
  return (
    <div className="grid gap-4">
      <article className="overflow-hidden rounded-3xl border border-white/10 bg-[#11100f] shadow-[0_30px_90px_-30px_rgba(0,0,0,0.6)]">
        <img
          src={productScreenshots[0].src}
          alt="Mori analyze side panel showing emergency response analysis"
          className="aspect-[16/10] w-full object-cover"
        />
        <div className="border-t border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm font-semibold text-white">
            {productScreenshots[0].title}
          </p>
          <p className="mt-1 text-sm leading-6 text-stone-300/75">
            {productScreenshots[0].description}
          </p>
        </div>
      </article>

      <div className="grid gap-4 sm:grid-cols-2">
        {productScreenshots.slice(1).map((screenshot) => (
          <article
            key={screenshot.title}
            className="overflow-hidden rounded-3xl border border-white/10 bg-[#11100f] shadow-[0_24px_70px_-30px_rgba(0,0,0,0.55)]"
          >
            <img
              src={screenshot.src}
              alt={`Mori ${screenshot.title.toLowerCase()} side panel workflow`}
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="border-t border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm font-semibold text-white">
                {screenshot.title}
              </p>
              <p className="mt-1 text-sm leading-6 text-stone-300/75">
                {screenshot.description}
              </p>
            </div>
          </article>
        ))}
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
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
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
            <ProductScreenshots />
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
