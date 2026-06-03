import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";

const REPLACEMENT_TYPE_OPTIONS = [
  {
    id: "sliding",
    title: "Sliding Door",
    description: "Horizontal sliding systems for entrances and partitions.",
    icon: "door_sliding",
    href: "/configure/replacing/need",
  },
  {
    id: "swing",
    title: "Swing Door",
    description: "Hinged doors for standard openings and access points.",
    icon: "door_front",
    href: "/configure/replacing/need",
  },
  {
    id: "industrial",
    title: "Industrial Gate",
    description: "Heavy-duty gates for industrial and logistics sites.",
    icon: "fence",
    href: "/configure/replacing/need",
  },
] as const;

export function ReplacingTypeQuestion() {
  return (
    <ConfigureQuestionLayout
      step={2}
      totalSteps={3}
      backHref="/configure"
      title="What are you replacing?"
      subtitle="Select the door type that matches your existing installation."
    >
      {REPLACEMENT_TYPE_OPTIONS.map((option) => (
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
