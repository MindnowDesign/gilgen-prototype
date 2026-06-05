"use client";

import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";
import { useConfigureSelection } from "@/components/configure/use-configure-selection";

const HELP_OPTIONS = [
  {
    id: "project",
    title: "Project door solution",
    description:
      "New builds, renovations, and project-based door requirements.",
    icon: "architecture",
    href: "/configure/planning/location",
  },
  {
    id: "existing",
    title: "Existing door support",
    description:
      "Replacement, upgrades, or support for an installed system.",
    icon: "construction",
    href: "/configure/replacing/type",
  },
  {
    id: "exploring",
    title: "I'm just exploring options",
    description: "Browse solutions without a specific project in mind.",
    icon: "travel_explore",
    href: "/configurator",
  },
] as const;

export function UnsureHelpQuestion() {
  const { isSelected, toggleSelect, navigation } =
    useConfigureSelection(HELP_OPTIONS);

  return (
    <ConfigureQuestionLayout
      step={2}
      totalSteps={3}
      backHref="/configure"
      title="How can we help you?"
      subtitle="Tell us where you are in your journey so we can guide you to the right path."
      navigation={navigation}
    >
      {HELP_OPTIONS.map((option, index) => (
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
