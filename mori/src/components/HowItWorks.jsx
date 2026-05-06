import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe2,
  SearchCheck,
  X,
} from "lucide-react";
import { useState } from "react";
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

function ScreenshotButton({ screenshot, className = "", imageClassName = "" }) {
  return (
    <button
      type="button"
      onClick={() => screenshot.onOpen(screenshot)}
      className={`group relative block overflow-hidden rounded-3xl border border-white/10 bg-[#11100f] text-left shadow-[0_24px_70px_-30px_rgba(0,0,0,0.55)] transition duration-300 hover:-translate-y-1 hover:border-orange-200/35 hover:shadow-[0_30px_90px_-28px_rgba(255,90,42,0.3)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300 transform-gpu ${className}`}
      aria-label={`View ${screenshot.title} screenshot full size`}
      style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
    >
      <img
        src={screenshot.src}
        alt={screenshot.alt}
        className={`w-full rounded-3xl object-cover object-top transition duration-500 group-hover:scale-[1.03] ${imageClassName}`}
      />
      <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />
      <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white opacity-0 shadow-[0_12px_30px_-14px_rgba(0,0,0,0.7)] backdrop-blur transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        View full
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4 pt-14">
        <p className="text-sm font-semibold text-white drop-shadow">
          {screenshot.title}
        </p>
        <p className="mt-1 max-w-sm text-sm leading-5 text-stone-200/80">
          {screenshot.description}
        </p>
      </div>
    </button>
  );
}

function ProductScreenshots({ className = "" }) {
  const [activeScreenshot, setActiveScreenshot] = useState(null);
  const screenshots = productScreenshots.map((screenshot) => ({
    ...screenshot,
    onOpen: setActiveScreenshot,
    alt: `Mori ${screenshot.title.toLowerCase()} side panel workflow`,
  }));

  const activeIndex = activeScreenshot
    ? screenshots.findIndex((s) => s.title === activeScreenshot.title)
    : -1;

  const goToPrev = (e) => {
    e.stopPropagation();
    const prevIndex = activeIndex === 0 ? screenshots.length - 1 : activeIndex - 1;
    setActiveScreenshot(screenshots[prevIndex]);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    const nextIndex = activeIndex === screenshots.length - 1 ? 0 : activeIndex + 1;
    setActiveScreenshot(screenshots[nextIndex]);
  };

  return (
    <>
      <div className={`grid gap-3 lg:h-full lg:grid-rows-[1.14fr_0.86fr] ${className}`}>
        <ScreenshotButton
          screenshot={screenshots[0]}
          imageClassName="aspect-[16/9] lg:h-full lg:aspect-auto"
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:h-full">
          {screenshots.slice(1).map((screenshot) => (
            <ScreenshotButton
              key={screenshot.title}
              screenshot={screenshot}
              imageClassName="aspect-[16/10] lg:h-full lg:aspect-auto"
            />
          ))}
        </div>
      </div>

      {activeScreenshot && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 sm:p-12 md:p-16 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeScreenshot.title} screenshot preview`}
          onClick={() => setActiveScreenshot(null)}
        >
          <button
            type="button"
            onClick={goToPrev}
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 z-10 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10" aria-hidden="true" />
          </button>

          <div
            className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-[#0b0706] shadow-[0_30px_120px_-30px_rgba(0,0,0,0.9)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveScreenshot(null)}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
              aria-label="Close screenshot preview"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <img
              src={activeScreenshot.src}
              alt={activeScreenshot.alt}
              className="max-h-[92vh] w-full object-contain"
            />
          </div>

          <button
            type="button"
            onClick={goToNext}
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 z-10 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
            aria-label="Next screenshot"
          >
            <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#070504] px-6 py-16 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-[#ff5a2e]/10 blur-3xl" />

      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-start gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-stretch lg:gap-12">
          <div className="flex h-full flex-col">
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

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:flex-1 lg:grid-cols-1 lg:grid-rows-3">
              {panelCards.map((card) => (
                <div
                  key={card.label}
                  className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff3126] to-[#ff8a3d] text-white">
                      <card.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-100">
                      {card.label}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#ffb06a]">
                    {card.meta}
                  </p>
                  <p className="mt-2 text-sm leading-5 text-stone-300/75">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex h-full flex-col">
            <div className="absolute -inset-4 -z-10 rounded-[36px] bg-gradient-to-br from-[#ff3126]/20 via-purple-700/10 to-[#ff9b3d]/20 blur-2xl" />
            <ProductScreenshots className="flex-1" />
            <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-stone-400">
              <Globe2 className="h-4 w-4 text-[#ff8a3d]" aria-hidden="true" />
              Works across social posts, local news, and online content
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
