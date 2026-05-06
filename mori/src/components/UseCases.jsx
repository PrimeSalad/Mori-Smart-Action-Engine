import {
  ArrowRight,
  BadgeCheck,
  DownloadCloud,
  FileCheck2,
  FolderOpen,
  Globe,
  MapPinned,
  Pin,
  Radar,
  SearchCheck,
  ShieldAlert,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldAlert,
    title: "Detect urgent civic issues faster",
  },
  {
    icon: BadgeCheck,
    title: "Verify claims before they spread",
  },
  {
    icon: MapPinned,
    title: "Route reports to the right agency",
  },
];

const installSteps = [
  {
    icon: DownloadCloud,
    title: "Step 1 — Download the extension",
    items: [
      "Go to our Google Drive link.",
      "Download mori-extension.zip.",
      "Extract the ZIP file to a folder on your computer.",
    ],
  },
  {
    icon: Globe,
    title: "Step 2 — Install in Chrome",
    items: [
      "Open Chrome and go to chrome://extensions/.",
      "Turn on Developer mode.",
      "Click Load unpacked.",
      "Select the extracted Mori folder.",
    ],
  },
  {
    icon: Pin,
    title: "Step 3 — Pin & open",
    items: [
      "Click the Extensions icon next to the address bar.",
      "Find Mori and click the Pin icon.",
      "Click the Mori icon to open the Smart Side Panel.",
    ],
  },
];

const workflowSteps = [
  {
    title: "Capture & intake",
    description:
      "Navigate to any social media post, news article, or online content. Click Capture Page in the Mori side panel to pull the text and link, or paste content manually.",
  },
  {
    title: "Analyze with AI",
    description:
      "Click Analyze with Mori. Mori identifies the civic issue, urgency level, recommended action, and relevant agency.",
  },
  {
    title: "Fact-check",
    description:
      "Use Mori Search Fact-Checking to search credible sources and generate a transparency verdict.",
  },
  {
    title: "Build your report",
    description:
      "Switch to the Report tab. Mori pre-fills the title, description, location, and supporting details. Add reporter details, attach screenshot evidence, and review the live email preview.",
  },
  {
    title: "Take action",
    description:
      "Create an email draft, download a PDF, or export an editable Word document.",
  },
];

function WhyMori() {
  return (
    <section className="bg-[#070504] px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff8a3d]">
              Why Mori
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              From awareness to accountable action.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-stone-300/80 sm:text-lg">
            In an era of information overload, Mori empowers citizens to stop
            being passive observers and start being active participants in their
            community's safety and integrity.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-3 lg:mt-14">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-3xl border border-white/10 bg-[#130c0a] p-6 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.6)] sm:p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8efe5] text-[#d92b18]">
                <benefit.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-semibold leading-snug text-white sm:text-xl">
                {benefit.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstallGuide() {
  return (
    <section
      id="install"
      className="relative overflow-hidden bg-[#f7efe5] px-6 py-20 text-[#1e0d08] sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="absolute right-0 top-0 -z-0 h-80 w-80 rounded-full bg-[#ff7b2e]/20 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c42114]">
            Deployment phase
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            How to install Mori.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[#5f4b40] sm:text-lg">
            Mori is currently in its deployment phase and can be installed as a
            developer extension from Google Drive.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:gap-5 lg:mt-14 lg:grid-cols-3">
          {installSteps.map((step) => (
            <article
              key={step.title}
              className="rounded-3xl border border-[#eadccc] bg-white p-6 shadow-[0_18px_50px_-20px_rgba(92,38,14,0.18)] sm:p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff3126] to-[#ff8a3d] text-white">
                <step.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-semibold leading-snug sm:text-xl">
                {step.title}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {step.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-[#5f4b40]"
                  >
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-[#d92b18]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workflow() {
  return (
    <section
      id="how-to-use"
      className="bg-[#0d0807] px-6 py-20 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff8a3d]">
              The Mori workflow
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              From captured evidence to official action.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-stone-300/80 sm:text-lg">
              A side-panel flow that keeps text, links, screenshots, and report
              drafts connected from the moment you capture them.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff3126] to-[#ff8a3d]">
                  <FolderOpen className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-white">
                    Evidence-ready
                  </p>
                  <p className="mt-1 text-sm text-stone-400">
                    Text, links, screenshots, and drafts stay connected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ol className="space-y-4">
            {workflowSteps.map((step, index) => (
              <li
                key={step.title}
                className="grid gap-5 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.07] to-white/[0.025] p-6 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.6)] sm:grid-cols-[64px_1fr] sm:p-7"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8efe5] text-xl font-bold text-[#d92b18]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-snug text-white sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-stone-300/75 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function SupportStrip() {
  const items = [
    ["Analyze", "Extract issue, urgency, impact, and action.", Radar],
    ["Fact Check", "Verify public claims with transparency scoring.", SearchCheck],
    ["Report", "Build evidence-backed drafts and exports.", FileCheck2],
  ];

  return (
    <section id="support" className="bg-[#070504] px-6 pb-4 lg:px-8">
      <div className="mx-auto max-w-[1200px] rounded-3xl border border-orange-200/15 bg-gradient-to-r from-[#180b09] to-[#25100b] p-6 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.6)] sm:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(([title, text, Icon]) => (
            <div key={title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#d92b18]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="leading-tight">
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-stone-300/75">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function UseCases() {
  return (
    <>
      <WhyMori />
      <InstallGuide />
      <Workflow />
      <SupportStrip />
    </>
  );
}
