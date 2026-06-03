import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";

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
  return (
    <ConfigureQuestionLayout
      step={2}
      totalSteps={3}
      backHref="/configure"
      title="Where will the door be installed?"
      subtitle="Choose the environment that best describes your installation."
    >
      {INSTALLATION_OPTIONS.map((option) => (
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
