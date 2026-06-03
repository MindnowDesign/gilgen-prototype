import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";

const HELP_OPTIONS = [
  {
    id: "project",
    title: "I'm looking for a door solution for a project",
    description:
      "New builds, renovations, and project-based door requirements.",
    icon: "architecture",
    href: "/configure/planning/location",
  },
  {
    id: "existing",
    title: "I need help with an existing door",
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
  return (
    <ConfigureQuestionLayout
      step={2}
      totalSteps={3}
      backHref="/configure"
      title="How can we help you?"
      subtitle="Tell us where you are in your journey so we can guide you to the right path."
    >
      {HELP_OPTIONS.map((option) => (
        <ConfigureOptionCard
          key={option.id}
          title={option.title}
          description={option.description}
          icon={option.icon}
          href={option.href}
        />
      ))}
    </ConfigureQuestionLayout>
  );
}
