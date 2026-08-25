import { Building2, FileOutput, Gauge, Link2, ShieldCheck } from "lucide-react";

const capabilities = [
  {
    icon: Link2,
    title: "Keep the source",
    description: "The post text and page link stay attached to the report.",
    className: "bg-signal text-white",
  },
  {
    icon: Gauge,
    title: "Read urgency",
    description: "See issue type, urgency, readiness, and civic impact at a glance.",
    className: "bg-[#f2f2f2] text-ink",
  },
  {
    icon: ShieldCheck,
    title: "Show confidence",
    description: "Review the verdict, confidence level, and checked claims.",
    className: "bg-night text-white",
  },
  {
    icon: Building2,
    title: "Find the right route",
    description: "Match the issue to a relevant public agency before sending.",
    className: "bg-[#f7e7e7] text-ink",
  },
  {
    icon: FileOutput,
    title: "Take the report with you",
    description: "Create an email draft or export to PDF and editable Word.",
    className: "bg-[#eeeeee] text-ink",
  },
];

export default function Features() {
  return (
    <section id="features" className="border-y border-line bg-paper-deep px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-[1060px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">What stays connected</p>
            <h2 className="text-balance mt-3 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] sm:text-5xl">
              More than another summary.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-body sm:text-base">
            The claim, evidence, decision, and handoff stay together until you are ready to act.
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-6">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            const spanClass = index < 2 ? "sm:col-span-3" : "sm:col-span-2";
            return (
              <li
                key={capability.title}
                className={`flex min-h-[230px] flex-col justify-between rounded-2xl p-5 sm:min-h-[250px] sm:p-6 ${spanClass} ${capability.className}`}
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                  <span className="font-mono text-xs opacity-60">0{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold leading-tight tracking-[-0.025em] sm:text-2xl">{capability.title}</h3>
                  <p className="mt-3 text-sm leading-6 opacity-75">{capability.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
