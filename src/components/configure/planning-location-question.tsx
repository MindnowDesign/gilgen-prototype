"use client";

import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";
import { useConfigureSelection } from "@/components/configure/use-configure-selection";

const INSTALLATION_OPTIONS = [
  {
    id: "commercial",
    title: "Commercial Building",
    description:
      "Offices, retail, hospitality, and other commercial spaces.",
    icon: "apartment",
    href: "/configure/planning/priority",
  },
  {
    id: "healthcare",
    title: "Healthcare Facility",
    description: "Hospitals, clinics, and care environments.",
    icon: "local_hospital",
    href: "/configure/planning/priority",
  },
  {
    id: "industrial",
    title: "Industrial Facility",
    description: "Warehouses, production sites, and logistics hubs.",
    icon: "factory",
    href: "/configure/planning/priority",
  },
] as const;

export function PlanningLocationQuestion() {
  const { isSelected, toggleSelect, navigation } = useConfigureSelection(
    INSTALLATION_OPTIONS
  );

  return (
    <ConfigureQuestionLayout
      step={2}
      totalSteps={3}
      backHref="/configure"
      title="Where will the door be installed?"
      subtitle="Choose the environment that best describes your installation."
      navigation={navigation}
    >
      {INSTALLATION_OPTIONS.map((option, index) => (
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
