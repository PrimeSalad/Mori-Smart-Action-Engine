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
    title: "Step 1: Download the Extension",
    items: [
      "Go to our Google Drive link.",
      "Download mori-extension.zip.",
      "Extract the ZIP file to a folder on your computer.",
    ],
  },
  {
    icon: Globe,
    title: "Step 2: Install in Chrome",
    items: [
      "Open Google Chrome and go to chrome://extensions/.",
      "Turn on Developer mode.",
      "Click Load unpacked.",
      "Select the extracted Mori folder.",
    ],
  },
  {
    icon: Pin,
    title: "Step 3: Pin & Open",
    items: [
      "Click the Extensions icon next to the browser address bar.",
      "Find Mori and click the Pin icon.",
      "Click the Mori icon anytime to open the Smart Side Panel.",
    ],
  },
];

const workflowSteps = [
  {
    title: "Capture & Intake",
    description:
      "Navigate to any social media post, news article, or online content. Click Capture Page in the Mori side panel to pull the text and link, or paste the content manually.",
  },
  {
    title: "Analyze with AI",
    description:
      "Click Analyze with Mori. Mori identifies the civic issue, urgency level, recommended action, and relevant agency.",
  },
  {
    title: "Fact-Check",
    description:
      "Use Mori Search Fact-Checking to search credible sources and generate a transparency verdict.",
  },
  {
    title: "Build Your Report",
    description:
      "Switch to the Report tab. Mori pre-fills the title, description, location, and supporting details. Add reporter details, attach screenshot evidence, and review the live email preview.",
  },
  {
    title: "Take Action",
    description:
      "Create an email draft, download a PDF, or export an editable Word document.",
  },
];

function WhyMori() {
  return (
    <section className="bg-[#070504] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ff8a3d]">
              Why Mori?
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
              From awareness to accountable action.
            </h2>
          </div>
          <p className="text-lg leading-8 text-stone-300/80">
            In an era of information overload, Mori empowers citizens to stop
            being passive observers and start being active participants in their
            community's safety and integrity.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-[28px] border border-white/10 bg-[#130c0a] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)]"
            >
              <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8efe5] text-[#d92b18]">
                <benefit.icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-black text-white">{benefit.title}</h3>
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
      className="relative overflow-hidden bg-[#f7efe5] px-4 py-24 text-[#1e0d08] sm:px-6 lg:px-8"
    >
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#ff7b2e]/20 blur-3xl" />
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#c42114]">
            Deployment phase
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
            How to Install Mori
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#5f4b40]">
            Mori is currently in its deployment phase and can be installed as a
            developer extension from Google Drive.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {installSteps.map((step) => (
            <article
              key={step.title}
              className="rounded-[28px] border border-[#eadccc] bg-white p-6 shadow-[0_24px_70px_rgba(92,38,14,0.1)]"
            >
              <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff3126] to-[#ff8a3d] text-white">
                <step.icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="text-xl font-black">{step.title}</h3>
              <ul className="mt-5 space-y-3">
                {step.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-[#5f4b40]">
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
    <section id="how-to-use" className="bg-[#0d0807] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ff8a3d]">
              The Mori Workflow
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
              A side-panel flow from captured evidence to official action.
            </h2>
            <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.055] p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff3126] to-[#ff8a3d]">
                  <FolderOpen className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-black text-white">Evidence-ready</p>
                  <p className="text-sm text-stone-400">
                    Text, links, screenshots, and report drafts stay connected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {workflowSteps.map((step, index) => (
              <article
                key={step.title}
                className="grid gap-4 rounded-[28px] border border-white/10 bg-gradient-to-r from-white/[0.08] to-white/[0.035] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:grid-cols-[76px_1fr]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8efe5] text-2xl font-black text-[#d92b18]">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{step.title}</h3>
                  <p className="mt-2 text-base leading-7 text-stone-300/75">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
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
      <section id="support" className="bg-[#070504] px-4 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1180px] rounded-[30px] border border-orange-200/20 bg-gradient-to-r from-[#180b09] to-[#25100b] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Analyze", "Extract issue, urgency, impact, and action."],
              ["Fact Check", "Verify public claims with transparency scoring."],
              ["Report", "Build evidence-backed drafts and exports."],
            ].map(([title, text], index) => (
              <div key={title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#d92b18]">
                  {index === 0 && <Radar className="h-5 w-5" aria-hidden="true" />}
                  {index === 1 && (
                    <SearchCheck className="h-5 w-5" aria-hidden="true" />
                  )}
                  {index === 2 && (
                    <FileCheck2 className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
                <div>
                  <h3 className="font-black text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-stone-300/75">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
