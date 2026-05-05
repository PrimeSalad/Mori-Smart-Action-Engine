import { Globe, Cpu, FileText, Route } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Globe,
      title: "Web Platform",
      description:
        "No downloads, no installs. Open the site, report a problem, and Mori ActionPoint does the rest — right in your browser.",
    },
    {
      icon: Cpu,
      title: "Google Gemini AI",
      description:
        "Powered by Google Gemini 2.5 Flash. Analyzes text, images, and voice recordings to understand context and generate professional reports.",
    },
    {
      icon: FileText,
      title: "Auto-Generated Reports",
      description:
        "Transforms vague complaints into formal, actionable reports. Clear language. Structured details. Ready to send.",
    },
    {
      icon: Route,
      title: "Direct Agency Routing",
      description:
        "Not just categorized — directed. Mori ActionPoint tells you exactly which office handles the issue and how to reach them.",
    },
  ];

  return (
    <section id="features" className="bg-canvas py-[96px]">
      <div className="max-w-[1280px] mx-auto px-xs sm:px-md">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-[64px]">
          <div>
            <p className="text-[11px] font-600 uppercase tracking-[1.1px] text-primary mb-[16px]">
              Capabilities
            </p>
            <h2 className="text-[26px] sm:text-[36px] font-500 leading-[1.2] tracking-[-0.36px] text-ink">
              The Problem Is Action
            </h2>
          </div>
          <p className="text-[14px] font-400 leading-[1.5] text-body max-w-[420px] mt-[16px] lg:mt-0">
            Most complaints never reach the right people. They're unclear,
            unstructured, or sent to the wrong place. Mori ActionPoint changes that with AI-powered analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px]">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-canvas-elevated p-[32px] flex flex-col"
              style={{ borderRadius: "0px" }}
            >
              <div
                className="w-[48px] h-[48px] border border-hairline flex items-center justify-center mb-[24px]"
                style={{ borderRadius: "0px" }}
              >
                <feature.icon className="w-[20px] h-[20px] text-body"></feature.icon>
              </div>
              <h3 className="text-[18px] font-500 leading-[1.4] tracking-[0.08px] text-ink mb-[12px]">
                {feature.title}
              </h3>
              <p className="text-[14px] font-400 leading-[1.5] text-body">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
