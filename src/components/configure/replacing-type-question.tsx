"use client";

import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";
import { useConfigureSelection } from "@/components/configure/use-configure-selection";

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
  const { isSelected, toggleSelect, navigation } = useConfigureSelection(
    REPLACEMENT_TYPE_OPTIONS
  );

  return (
    <ConfigureQuestionLayout
      step={2}
      totalSteps={3}
      backHref="/configure"
      title="What are you replacing?"
      subtitle="Select the door type that matches your existing installation."
      navigation={navigation}
    >
      {REPLACEMENT_TYPE_OPTIONS.map((option, index) => (
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
