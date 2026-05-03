import { MousePointerClick, Brain, Building, FileText } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: MousePointerClick,
      number: "01",
      title: "Spot a Problem Online",
      description:
        "You see a complaint on social media — an overcharged fare, a fire, a dark street. One click activates FixFinder.",
    },
    {
      icon: Brain,
      number: "02",
      title: "FixFinder Identifies the Issue",
      description:
        "The AI reads the post and classifies it — transport violation, emergency, infrastructure concern, and more.",
    },
    {
      icon: Building,
      number: "03",
      title: "Finds the Responsible Agency",
      description:
        "FixFinder maps the issue to the right office — LTFRB for fares, Bureau of Fire for emergencies, local government for roads.",
    },
    {
      icon: FileText,
      number: "04",
      title: "Auto-Generates a Report",
      description:
        "Not a rant. A clear, formal, actionable report — plus exactly where to send it. Real action in seconds.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-canvas py-[96px]">
      <div className="max-w-[1280px] mx-auto px-xs sm:px-md">
        <p className="text-[11px] font-600 uppercase tracking-[1.1px] text-primary mb-[16px]">
          Process
        </p>
        <h2 className="text-[26px] sm:text-[36px] font-500 leading-[1.2] tracking-[-0.36px] text-ink mb-[64px]">
          How FixFinder Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[8px]">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-canvas-elevated p-[32px] flex flex-col"
              style={{ borderRadius: "0px" }}
            >
              <div className="flex items-center justify-between mb-[24px]">
                <div
                  className="w-[48px] h-[48px] border border-hairline flex items-center justify-center"
                  style={{ borderRadius: "0px" }}
                >
                  <step.icon className="w-[20px] h-[20px] text-body"></step.icon>
                </div>
                <span className="text-[11px] font-600 uppercase tracking-[1.1px] text-muted">
                  {step.number}
                </span>
              </div>
              <h3 className="text-[18px] font-500 leading-[1.4] tracking-[0.08px] text-ink mb-[12px]">
                {step.title}
              </h3>
              <p className="text-[14px] font-400 leading-[1.5] text-body">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
