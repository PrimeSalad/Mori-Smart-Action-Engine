import { ArrowRight, Play } from "lucide-react";
import { GOOGLE_DRIVE_DOWNLOAD_LINK, WATCH_DEMO_LINK } from "../config/links";

export default function CTABand() {
  const downloadHref = GOOGLE_DRIVE_DOWNLOAD_LINK || "#install";
  const demoHref = WATCH_DEMO_LINK || "#how-to-use";

  return (
    <section className="relative overflow-hidden bg-[#070504] px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-200/30 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff4a2f]/20 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,122,47,0.22),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] px-6 py-16 text-center shadow-[0_30px_90px_-30px_rgba(0,0,0,0.6)] sm:px-10 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb06a]">
          Scan. Verify. Report.
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready to turn awareness into action?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-300/80 sm:text-lg">
          Download Mori and use AI to scan, verify, and report issues that
          matter.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={downloadHref}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ff3126] to-[#ff8a3d] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_-12px_rgba(255,66,35,0.55)] transition duration-200 hover:translate-y-[-1px] hover:shadow-[0_22px_46px_-12px_rgba(255,66,35,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
          >
            Download Mori
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
            Learn How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
