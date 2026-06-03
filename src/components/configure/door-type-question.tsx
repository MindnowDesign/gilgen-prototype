import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";

const DOOR_TYPE_OPTIONS = [
  {
    id: "planning",
    title: "Planning a new project",
    description:
      "I'm exploring door solutions for a new building or renovation.",
    icon: "architecture",
    href: "/configure/planning/location",
  },
  {
    id: "replacing",
    title: "Replacing an existing door",
    description:
      "I need a compatible replacement for an existing installation.",
    icon: "construction",
    href: "/configure/replacing/type",
  },
  {
    id: "unsure",
    title: "I'm not sure",
    description: "Help me find the solution that fits my needs.",
    icon: "help_outline",
    href: "/configure/unsure/help",
  },
] as const;

export function DoorTypeQuestion() {
  return (
    <ConfigureQuestionLayout
      step={1}
      totalSteps={3}
      backHref="/"
      title="What are you working on?"
      subtitle="Select the option that best matches your project. You can refine your choice in the next steps."
    >
      {DOOR_TYPE_OPTIONS.map((option, index) => (
        <ConfigureOptionCard
          key={option.id}
          index={index + 1}
          title={option.title}
          description={option.description}
          icon={option.icon}
          href={option.href}
        />
      ))}
    </ConfigureQuestionLayout>
  );
}
