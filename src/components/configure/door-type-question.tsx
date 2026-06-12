"use client";

import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";
import { useConfigureSelection } from "@/components/configure/use-configure-selection";
import { useLanguage } from "@/i18n/language-provider";

const DOOR_TYPE_OPTIONS = [
  {
    id: "planning",
    icon: "architecture",
    href: "/configure/planning/location",
  },
  {
    id: "replacing",
    icon: "construction",
    href: "/configure/replacing/type",
  },
  {
    id: "unsure",
    icon: "help_outline",
    href: "/configure/unsure/help",
  },
] as const;

export function DoorTypeQuestion() {
  const { t } = useLanguage();
  const copy = t.configure.doorType;
  const { isSelected, toggleSelect, navigation } =
    useConfigureSelection(DOOR_TYPE_OPTIONS);

  const options = [
    {
      ...DOOR_TYPE_OPTIONS[0],
      title: copy.planning.title,
      description: copy.planning.description,
    },
    {
      ...DOOR_TYPE_OPTIONS[1],
      title: copy.replacing.title,
      description: copy.replacing.description,
    },
    {
      ...DOOR_TYPE_OPTIONS[2],
      title: copy.unsure.title,
      description: copy.unsure.description,
    },
  ];

  return (
    <ConfigureQuestionLayout
      step={1}
      totalSteps={3}
      backHref="/"
      title={copy.title}
      subtitle={copy.subtitle}
      navigation={navigation}
    >
      {options.map((option, index) => (
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
