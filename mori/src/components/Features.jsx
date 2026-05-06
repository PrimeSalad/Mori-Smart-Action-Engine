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
    <section id="features" className="bg-[#0d0807] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ff8a3d]">
            Key features
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
            Built for verified civic action, not passive scrolling.
          </h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={`group rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.075] to-white/[0.035] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.25)] transition duration-200 hover:-translate-y-1 hover:border-orange-200/30 ${
                index < 3 ? "lg:col-span-2" : "lg:col-span-3"
              }`}
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff3126] to-[#ff9b3d] text-white shadow-[0_0_36px_rgba(255,77,37,0.32)]">
                <feature.icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-black text-white">{feature.title}</h3>
              <p className="mt-4 text-base leading-7 text-stone-300/75">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
