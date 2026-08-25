import { ArrowUpRight } from "lucide-react";
import mascot from "../assets/mori-mascot.png";
import { GOOGLE_DRIVE_DOWNLOAD_LINK } from "../config/links";

export default function CTABand() {
  return (
    <section className="bg-white px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="mx-auto grid max-w-[1060px] overflow-hidden rounded-2xl bg-signal text-white sm:grid-cols-[180px_1fr] lg:grid-cols-[220px_1fr_auto] lg:items-center">
        <div className="hidden h-full items-end justify-center bg-[#c51f2a] px-4 pt-6 sm:flex">
          <img src={mascot} alt="" className="w-36 lg:w-44" width="256" height="400" loading="lazy" />
        </div>
        <div className="p-7 sm:p-9 lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">Scan · Verify · Report</p>
          <h2 className="text-balance mt-3 max-w-2xl text-3xl font-extrabold leading-[1.06] tracking-[-0.05em] sm:text-4xl">
            Turn the next post into something useful.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
            Keep the source, check the claim, and prepare the right handoff without leaving the page.
          </p>
        </div>
        <div className="px-7 pb-7 sm:col-start-2 sm:px-9 lg:col-start-auto lg:px-10 lg:pb-0">
          <a
            href={GOOGLE_DRIVE_DOWNLOAD_LINK}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-bold text-signal transition-colors hover:bg-night hover:text-white lg:w-auto"
          >
            Download Mori
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
