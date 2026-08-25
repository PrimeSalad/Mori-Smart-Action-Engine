import { BadgeCheck, Check, FileText, SearchCheck, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import analyzeScreenshot from "../assets/mori-analyze-panel.png";
import factCheckScreenshot from "../assets/mori-fact-check-panel.png";
import reportScreenshot from "../assets/mori-report-panel.png";
import logo from "../assets/logo.png";
import { GOOGLE_DRIVE_DOWNLOAD_LINK, WATCH_DEMO_LINK } from "../config/links";

const views = [
  {
    id: "analyze",
    label: "Analyze",
    title: "Understand the post",
    description: "Mori extracts the issue, urgency, civic impact, location clues, and the next useful action from the active page.",
    icon: SearchCheck,
    image: analyzeScreenshot,
    alt: "Mori Analyze tab identifying a critical brush fire from a Facebook post",
  },
  {
    id: "verify",
    label: "Fact check",
    title: "Check the claim",
    description: "Review a clear verdict, confidence level, checked claims, and the details that support the result.",
    icon: ShieldCheck,
    image: factCheckScreenshot,
    alt: "Mori Fact Check tab showing a true verdict with 95 percent confidence",
  },
  {
    id: "report",
    label: "Report",
    title: "Prepare the handoff",
    description: "Mori drafts the subject and report body, keeps the source attached, and suggests a destination before anything is sent.",
    icon: FileText,
    image: reportScreenshot,
    alt: "Mori Report tab preparing an agency-ready email about a brush fire",
  },
];

const installationSteps = [
  ["Download Mori", "Click Download and save the Mori ZIP file to your computer."],
  ["Extract the ZIP", "Right-click the downloaded ZIP, choose Extract All, and keep the extracted folder."],
  ["Open Extensions", "In Chrome, enter chrome://extensions in the address bar and press Enter."],
  ["Load Mori", "Turn on Developer mode, click Load unpacked, then select the extracted Mori folder."],
  ["Pin and open", "Open Chrome's Extensions menu, pin Mori, then click its icon to open the side panel."],
];

function ProductView() {
  const [activeViewId, setActiveViewId] = useState(views[0].id);
  const activeView = views.find((view) => view.id === activeViewId) ?? views[0];

  return (
    <div>
      <div className="grid grid-cols-3" aria-label="Mori product views">
        {views.map((view) => {
          const Icon = view.icon;
          const isActive = view.id === activeView.id;
          return (
            <button
              key={view.id}
              type="button"
              onClick={() => setActiveViewId(view.id)}
              aria-pressed={isActive}
              className={`flex min-h-12 items-center justify-center gap-2 border-t text-[10px] font-bold uppercase tracking-[0.08em] transition-colors sm:text-xs sm:tracking-[0.1em] ${
                isActive ? "-mt-px border-signal text-signal" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{view.label}</span>
            </button>
          );
        })}
      </div>

      <article className="grid overflow-hidden rounded-2xl border border-line bg-[#eee8dc] lg:grid-cols-[1.4fr_0.6fr]">
        <img
          key={activeView.id}
          src={activeView.image}
          alt={activeView.alt}
          className="product-image aspect-[16/10] h-full w-full border-b border-line object-cover object-top lg:border-b-0 lg:border-r"
          width="1280"
          height="800"
        />
        <div className="flex min-h-[260px] flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-signal">{activeView.label}</p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.035em]">{activeView.title}</h2>
            <p className="mt-4 text-sm leading-7 text-body sm:text-base">{activeView.description}</p>
          </div>
          <p className="mt-8 border-t border-[#d2c8b8] pt-4 text-xs font-semibold text-muted">Real Mori interface · Select a tab to preview</p>
        </div>
      </article>
    </div>
  );
}

function HowToUse() {
  return (
    <div className="pt-8">
      <article className="overflow-hidden rounded-2xl border border-line bg-white">
        <header className="border-b border-line px-5 py-5 sm:px-7">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-signal">Chrome installation</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.035em]">Add Mori to Chrome</h2>
          <p className="mt-2 text-sm leading-6 text-body">Install the current early-access build manually in five steps.</p>
        </header>
        <ol>
          {installationSteps.map(([title, description], index) => (
            <li key={title} className="flex gap-4 border-b border-line px-5 py-5 last:border-b-0 sm:items-center sm:px-7">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fbe9e9] text-sm font-extrabold text-signal">{index + 1}</span>
              <div className="min-w-0 flex-1 sm:grid sm:grid-cols-[130px_1fr] sm:items-center sm:gap-5">
                <h3 className="font-extrabold">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-body sm:mt-0">{description}</p>
              </div>
              <Check className="hidden h-5 w-5 text-signal sm:block" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </article>
    </div>
  );
}

export default function HowItWorks() {
  const [showGuide, setShowGuide] = useState(false);
  const contentRef = useRef(null);

  const toggleGuide = () => {
    setShowGuide((current) => !current);
    requestAnimationFrame(() => contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <section className="min-h-screen bg-white px-4 py-10 sm:px-6 sm:py-16">
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
              <a href={WATCH_DEMO_LINK} className="rounded-lg bg-[#efefef] px-4 py-2 text-sm font-bold transition-colors hover:bg-line">Demo</a>
              <button type="button" onClick={toggleGuide} aria-pressed={showGuide} className="rounded-lg bg-[#efefef] px-4 py-2 text-sm font-bold transition-colors hover:bg-line">
                {showGuide ? "View product" : "How to use"}
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

        <div ref={contentRef} className="mt-12 scroll-mt-8 border-t border-line">
          {showGuide ? <HowToUse /> : <ProductView />}
        </div>
      </div>
    </section>
  );
}
