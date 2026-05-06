import { ArrowRight, Play } from "lucide-react";
import { GOOGLE_DRIVE_DOWNLOAD_LINK } from "../config/links";

export default function CTABand() {
  const downloadHref = GOOGLE_DRIVE_DOWNLOAD_LINK || "#install";

  return (
    <section className="relative overflow-hidden bg-[#070504] px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-200/30 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff4a2f]/20 blur-3xl" />
      <div className="relative mx-auto max-w-[1180px] rounded-[38px] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,122,47,0.22),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.035))] px-6 py-20 text-center shadow-[0_32px_100px_rgba(0,0,0,0.42)] sm:px-10">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ffb06a]">
          Scan. Verify. Report.
        </p>
        <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl">
          Ready to turn awareness into action?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-300/80">
          Download Mori and use AI to scan, verify, and report issues that matter.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={downloadHref}
            className="group inline-flex min-h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#ff3126] to-[#ff8a3d] px-7 text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_20px_50px_rgba(255,66,35,0.36)] transition duration-200 hover:translate-y-[-1px] hover:shadow-[0_26px_70px_rgba(255,66,35,0.46)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
          >
            Download Mori
            <ArrowRight
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
          <a
            href="#how-to-use"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-black uppercase tracking-[0.12em] text-white transition duration-200 hover:border-orange-200/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
          >
            <Play className="mr-2 h-4 w-4 fill-white" aria-hidden="true" />
            Learn How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
