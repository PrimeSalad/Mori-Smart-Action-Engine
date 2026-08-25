import { BadgeCheck, BookOpen, Play } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { GOOGLE_DRIVE_DOWNLOAD_LINK, YOUTUBE_DEMO_EMBED_LINK } from "../config/links";

const installationSteps = [
  ["Download Mori", "Save the Mori ZIP."],
  ["Extract the ZIP", "Keep the extracted folder."],
  ["Open Extensions", "Go to chrome://extensions."],
  ["Load Mori", "Enable Developer mode, then Load unpacked."],
  ["Pin and open", "Pin Mori and open its side panel."],
];

function ProductVideo() {
  return (
    <div className="w-full max-w-[640px] overflow-hidden rounded-2xl border border-line bg-night shadow-product">
      <iframe
        className="aspect-video w-full"
        src={YOUTUBE_DEMO_EMBED_LINK}
        title="Mori Chrome extension walkthrough"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

function HowToUse({ isActive }) {
  return (
    <article className="w-full max-w-[800px] overflow-hidden rounded-2xl border border-line bg-white shadow-product">
      <header className="flex flex-wrap items-end justify-between gap-2 border-b border-line px-4 py-3 sm:px-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-signal">Chrome installation</p>
          <h2 className="mt-1 text-lg font-extrabold tracking-[-0.03em]">Add Mori to Chrome</h2>
        </div>
        <p className="text-xs text-body">Five quick steps · Early access</p>
      </header>
      <ol className="grid grid-cols-2 gap-px bg-line md:grid-cols-5">
        {installationSteps.map(([title, description], index) => (
          <li
            key={title}
            className={`flex min-h-[88px] gap-3 bg-white p-3 transition-[opacity,transform] duration-200 ease-out md:min-h-[118px] md:flex-col md:gap-2 md:p-4 ${
              isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: isActive ? `${80 + index * 35}ms` : "0ms" }}
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#fbe9e9] text-xs font-extrabold text-signal">{index + 1}</span>
            <div className="min-w-0">
              <h3 className="text-xs font-extrabold leading-4 sm:text-sm">{title}</h3>
              <p className="mt-1 text-[11px] leading-4 text-body">{description}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}

export default function HowItWorks() {
  const [showGuide, setShowGuide] = useState(false);

  const toggleGuide = () => {
    setShowGuide((current) => !current);
  };

  return (
    <section className="w-full bg-white px-4 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-[980px]">
        <header className="grid gap-7 sm:grid-cols-[170px_1fr] sm:items-center sm:gap-10">
          <div className="mx-auto grid h-32 w-32 place-items-center rounded-full border-2 border-signal p-1 sm:h-36 sm:w-36">
            <span className="grid h-full w-full place-items-center rounded-full bg-signal">
              <img src={logo} alt="Mori logo" className="h-24 w-24 object-contain sm:h-28 sm:w-28" />
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-normal tracking-[-0.03em] sm:text-3xl">mori.extension</h1>
              <BadgeCheck className="h-5 w-5 fill-signal text-white" aria-label="Mori profile" />
              <a href={GOOGLE_DRIVE_DOWNLOAD_LINK} className="rounded-lg bg-signal px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-signal-dark">Download</a>
              <button
                type="button"
                onClick={toggleGuide}
                aria-pressed={showGuide}
                aria-controls="product-stage"
                className="inline-flex min-h-10 min-w-[118px] items-center justify-center rounded-lg bg-[#efefef] px-4 text-sm font-bold transition-[background-color,transform] duration-200 hover:bg-line active:scale-[0.98]"
              >
                <span key={showGuide ? "product" : "guide"} className="button-label-enter inline-flex items-center gap-2">
                  {showGuide ? <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" /> : <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />}
                  {showGuide ? "View product" : "How to use"}
                </span>
              </button>
            </div>

            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
              <div><dt className="inline font-bold">3</dt> <dd className="inline">tools</dd></div>
              <div><dt className="inline font-bold">1</dt> <dd className="inline">side panel</dd></div>
              <div><dt className="inline font-bold">0</dt> <dd className="inline">context switches</dd></div>
            </dl>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-body sm:text-base">
              <strong className="block text-ink">Mori · Smart Action Engine</strong>
              Analyze, verify, and report what you see online while the original page stays open.
            </p>
          </div>
        </header>

        <div id="product-stage" className="relative mt-6 h-[330px] border-t border-line sm:mt-8 sm:h-[384px]" aria-live="polite">
          <div
            aria-hidden={showGuide}
            inert={showGuide}
            className={`absolute inset-x-0 top-5 flex h-[300px] items-center justify-center transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:top-6 sm:h-[360px] ${
              showGuide ? "pointer-events-none -translate-y-2 scale-[0.985] opacity-0" : "translate-y-0 scale-100 opacity-100"
            }`}
          >
            <ProductVideo />
          </div>

          <div
            aria-hidden={!showGuide}
            inert={!showGuide}
            className={`absolute inset-x-0 top-5 flex h-[300px] items-center justify-center transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:top-6 sm:h-[360px] ${
              showGuide ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-[0.985] opacity-0"
            }`}
          >
            <HowToUse isActive={showGuide} />
          </div>
        </div>
      </div>
    </section>
  );
}
