import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";

const NEED_OPTIONS = [
  {
    id: "exact",
    title: "Exact Replacement",
    description:
      "Match the existing system with a direct, compatible replacement.",
    icon: "sync",
  },
  {
    id: "performance",
    title: "Improved Performance",
    description:
      "Upgrade reliability, efficiency, or operational performance.",
    icon: "speed",
  },
  {
    id: "modern",
    title: "Modern Alternative",
    description:
      "Explore updated technology and contemporary door solutions.",
    icon: "auto_awesome",
  },
] as const;

export function ReplacingNeedQuestion() {
  return (
    <ConfigureQuestionLayout
      step={3}
      totalSteps={3}
      backHref="/configure/replacing/type"
      title="What do you need?"
      subtitle="Choose the outcome that best describes your replacement goal."
    >
      {NEED_OPTIONS.map((option, index) => (
        <ConfigureOptionCard
          key={option.id}
          index={index + 1}
          title={option.title}
          description={option.description}
          icon={option.icon}
        />
      ))}
    </ConfigureQuestionLayout>
  );
}
