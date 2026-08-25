import {
  ArrowUpRight,
  Bookmark,
  Building2,
  CheckCircle2,
  FileDown,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Play,
  ScanSearch,
  Send,
} from "lucide-react";
import analyzeScreenshot from "../assets/mori-analyze-panel.png";
import logo from "../assets/logo.png";
import { GOOGLE_DRIVE_DOWNLOAD_LINK, WATCH_DEMO_LINK } from "../config/links";

const highlights = [
  { label: "Scan", icon: ScanSearch },
  { label: "Verify", icon: CheckCircle2 },
  { label: "Report", icon: Send },
  { label: "Route", icon: Building2 },
  { label: "Export", icon: FileDown },
];

export default function Hero() {
  return (
    <section id="home" className="border-b border-line bg-paper-deep px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1120px] items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-body">
            <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
            Chrome extension · Early access
          </div>
          <h1 className="text-balance mt-6 max-w-xl text-[clamp(3.25rem,7vw,5.6rem)] font-extrabold leading-[0.94] tracking-[-0.065em]">
            See it. Check it. <span className="text-signal">Report it.</span>
          </h1>
          <p className="text-pretty mt-7 max-w-lg text-lg leading-8 text-body sm:text-xl sm:leading-9">
            Mori turns the post on your screen into a verified, agency-ready report without making you leave the page.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={GOOGLE_DRIVE_DOWNLOAD_LINK}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-signal px-6 text-sm font-bold text-white transition-colors hover:bg-signal-dark"
            >
              Download Mori
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={WATCH_DEMO_LINK}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line bg-white px-6 text-sm font-bold transition-colors hover:bg-[#f2f2f2]"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Watch demo
            </a>
          </div>
          <p className="mt-4 text-xs font-medium text-muted">Manual Chrome setup for the current early-access build.</p>
        </div>

        <article className="mx-auto w-full max-w-[560px] overflow-hidden rounded-2xl border border-line bg-white shadow-product">
          <header className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-signal p-1">
                <img src={logo} alt="" className="h-full w-full object-contain" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-bold">mori.action</span>
                <span className="block text-xs text-muted">Civic tools for Chrome</span>
              </span>
            </div>
            <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
          </header>

          <img
            src={analyzeScreenshot}
            alt="Mori analyzing a social media post about a brush fire in Chrome"
            className="product-image aspect-[16/10] w-full border-y border-line object-cover object-top"
            width="1280"
            height="800"
            fetchPriority="high"
          />

          <div className="px-4 pb-4 pt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Heart className="h-6 w-6" aria-hidden="true" />
                <MessageCircle className="h-6 w-6" aria-hidden="true" />
                <Send className="h-6 w-6" aria-hidden="true" />
              </div>
              <Bookmark className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-3 text-sm font-bold">The active post stays in view.</p>
            <p className="mt-1 text-sm leading-6 text-body">
              <strong className="font-bold text-ink">mori.action</strong> Analyze urgency, verify the claim, then prepare the handoff in one side panel.
            </p>
          </div>
        </article>
      </div>

      <div className="mx-auto mt-14 max-w-[860px] border-t border-line pt-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.14em] text-muted">Everything in one side panel</p>
        <ul className="mt-6 grid grid-cols-3 gap-5 sm:grid-cols-5">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-signal bg-white text-signal sm:h-[72px] sm:w-[72px]">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="mt-2 block text-xs font-bold sm:text-sm">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
