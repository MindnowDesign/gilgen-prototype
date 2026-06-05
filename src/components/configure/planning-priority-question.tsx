"use client";

import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";
import { useConfigureSelection } from "@/components/configure/use-configure-selection";

const PRIORITY_OPTIONS = [
  {
    id: "design",
    title: "Design & Architecture",
    description:
      "Aesthetic integration and alignment with the building design.",
    icon: "design_services",
    href: "/configurator",
  },
  {
    id: "security",
    title: "Security & Protection",
    description: "Safety, access control, and protective performance.",
    icon: "shield",
    href: "/configurator",
  },
  {
    id: "accessibility",
    title: "Accessibility & Flow",
    description: "Ease of movement and inclusive access for all users.",
    icon: "accessible",
    href: "/configurator",
  },
] as const;

export function PlanningPriorityQuestion() {
  const { isSelected, toggleSelect, navigation } =
    useConfigureSelection(PRIORITY_OPTIONS);

  return (
    <ConfigureQuestionLayout
      step={3}
      totalSteps={3}
      backHref="/configure/planning/location"
      title="What's most important for your project?"
      subtitle="Select the priority that matters most for your door solution."
      navigation={navigation}
    >
      {PRIORITY_OPTIONS.map((option, index) => (
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
