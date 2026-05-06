import {
  BrainCircuit,
  Building2,
  Download,
  FileStack,
  ShieldQuestion,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "Intelligent Post Analysis",
    description:
      "Automatically extract the core facts from any social media post or news article. Mori identifies the issue category, urgency level, and recommended course of action in seconds.",
  },
  {
    icon: ShieldQuestion,
    title: "Mori Search Fact-Checking",
    description:
      "Verify suspicious claims with a deep-search engine that identifies credible sources and provides a transparency verdict, helping you fight misinformation before it spreads.",
  },
  {
    icon: Building2,
    title: "Automated Agency Routing",
    description:
      "No more guessing where to send a report. Mori intelligently maps identified issues to the correct government agencies and organizations, providing official email addresses and escalation paths.",
  },
  {
    icon: FileStack,
    title: "Professional Report Builder",
    description:
      "Transform social media evidence into formal, actionable reports. Mori generates structured drafts, manages screenshot evidence with cryptographic hashing for integrity, and provides real-time email previews.",
  },
  {
    icon: Download,
    title: "Enterprise-Grade Export",
    description:
      "Secure your documentation by downloading reports as professionally formatted PDFs or editable Word documents, ready for official submission or legal filing.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-[#0d0807] px-6 py-20 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff8a3d]">
            Key features
          </p>
          <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Built for verified civic action, not passive scrolling.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-300/80 sm:text-lg">
            Five focused capabilities that turn signals from your feed into
            evidence-backed reports — all without leaving your browser.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-6">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`group rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-[0_24px_70px_-40px_rgba(0,0,0,0.6)] transition duration-200 hover:-translate-y-1 hover:border-orange-200/30 sm:p-7 ${
                index < 3 ? "lg:col-span-2" : "lg:col-span-3"
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff3126] to-[#ff9b3d] text-white shadow-[0_0_36px_-8px_rgba(255,77,37,0.45)]">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-snug text-white sm:text-xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-300/75 sm:text-base">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
