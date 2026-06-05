"use client";

import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";
import { useConfigureSelection } from "@/components/configure/use-configure-selection";

const NEED_OPTIONS = [
  {
    id: "exact",
    title: "Exact Replacement",
    description:
      "Match the existing system with a direct, compatible replacement.",
    icon: "sync",
    href: "/configurator",
  },
  {
    id: "performance",
    title: "Improved Performance",
    description:
      "Upgrade reliability, efficiency, or operational performance.",
    icon: "speed",
    href: "/configurator",
  },
  {
    id: "modern",
    title: "Modern Alternative",
    description:
      "Explore updated technology and contemporary door solutions.",
    icon: "auto_awesome",
    href: "/configurator",
  },
] as const;

export function ReplacingNeedQuestion() {
  const { isSelected, toggleSelect, navigation } =
    useConfigureSelection(NEED_OPTIONS);

  return (
    <ConfigureQuestionLayout
      step={3}
      totalSteps={3}
      backHref="/configure/replacing/type"
      title="What do you need?"
      subtitle="Choose the outcome that best describes your replacement goal."
      navigation={navigation}
    >
      {NEED_OPTIONS.map((option, index) => (
        <ConfigureOptionCard
          key={option.id}
          index={index + 1}
          title={option.title}
          description={option.description}
          icon={option.icon}
          selected={isSelected(option.id)}
          onSelect={() => toggleSelect(option.id)}
        />
      ))}
    </ConfigureQuestionLayout>
  );
}
