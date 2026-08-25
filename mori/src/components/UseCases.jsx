import { ArrowDownToLine, ArrowUpRight, Check, CircleHelp, Play } from "lucide-react";
import { GOOGLE_DRIVE_DOWNLOAD_LINK, WATCH_DEMO_LINK } from "../config/links";

const workflow = [
  ["Capture", "Open a post or article and pull in its text and source link."],
  ["Analyze", "Review the issue, urgency, public impact, and next action."],
  ["Verify", "Inspect the checked claim, verdict, and confidence level."],
  ["Review", "Edit the draft, add evidence, and confirm the destination."],
  ["Export", "Create an email or keep a PDF or editable Word copy."],
];

const installSteps = [
  {
    title: "Download and extract",
    items: ["Download the Mori ZIP from Google Drive.", "Extract it to a folder you will keep."],
  },
  {
    title: "Load it in Chrome",
    items: ["Open chrome://extensions.", "Turn on Developer mode and choose Load unpacked."],
  },
  {
    title: "Pin and open",
    items: ["Select the extracted Mori folder.", "Pin Mori and open the side panel."],
  },
];

function Workflow() {
  return (
    <section id="how-to-use" className="bg-white px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[900px]">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">How it works</p>
          <h2 className="text-balance mx-auto mt-3 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] sm:text-5xl">
            Five moves from post to proper report.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-body">
            You stay in control at every step. Mori prepares the work; nothing is sent automatically.
          </p>
        </div>

        <ol className="mx-auto mt-12 max-w-[760px] overflow-hidden rounded-2xl border border-line bg-white">
          {workflow.map(([title, description], index) => (
            <li key={title} className="flex gap-4 border-b border-line p-5 last:border-b-0 sm:items-center sm:gap-5 sm:px-6 sm:py-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#fbe9e9] text-sm font-extrabold text-signal">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1 sm:grid sm:grid-cols-[150px_1fr] sm:items-center sm:gap-5">
                <h3 className="text-base font-extrabold sm:text-lg">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-body sm:mt-0">{description}</p>
              </div>
              <Check className="hidden h-5 w-5 shrink-0 text-signal sm:block" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function InstallGuide() {
  return (
    <section id="install" className="border-y border-line bg-paper-deep px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1060px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">Early-access install</p>
            <h2 className="text-balance mt-3 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] sm:text-5xl">
              Set up Mori in three steps.
            </h2>
          </div>
          <a
            href={GOOGLE_DRIVE_DOWNLOAD_LINK}
            className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-lg bg-signal px-6 text-sm font-bold text-white transition-colors hover:bg-signal-dark"
          >
            <ArrowDownToLine className="h-4 w-4" aria-hidden="true" />
            Download ZIP
          </a>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {installSteps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-line bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-signal text-sm font-extrabold text-white">{index + 1}</span>
                <h3 className="text-lg font-extrabold tracking-[-0.02em]">{step.title}</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {step.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-body">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-sm text-muted">Chrome will label this as an unpacked extension while Mori is in deployment.</p>
      </div>
    </section>
  );
}

function Support() {
  return (
    <section id="support" className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto flex max-w-[900px] flex-col items-center rounded-2xl border border-line bg-paper-deep px-6 py-10 text-center sm:px-10">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[#fbe9e9] text-signal">
          <CircleHelp className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.04em]">Need help with setup?</h2>
        <p className="mt-3 max-w-xl text-base leading-7 text-body">
          The walkthrough covers the full install, from extracting the ZIP to opening the Mori side panel.
        </p>
        <div className="mt-6 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <a href={WATCH_DEMO_LINK} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-signal px-5 text-sm font-bold text-white transition-colors hover:bg-signal-dark">
            <Play className="h-4 w-4 fill-current" aria-hidden="true" />
            Watch setup demo
          </a>
          <a
            href="https://github.com/PrimeSalad/Mori-Smart-Action-Engine"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-line bg-white px-5 text-sm font-bold transition-colors hover:bg-[#f2f2f2]"
          >
            View GitHub
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function UseCases() {
  return (
    <>
      <Workflow />
      <InstallGuide />
      <Support />
    </>
  );
}
