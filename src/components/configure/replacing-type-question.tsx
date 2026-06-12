"use client";

import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";
import { useConfigureSelection } from "@/components/configure/use-configure-selection";
import { useLanguage } from "@/i18n/language-provider";

const REPLACEMENT_TYPE_OPTIONS = [
  {
    id: "sliding",
    icon: "door_sliding",
    href: "/configure/replacing/need",
  },
  {
    id: "swing",
    icon: "door_front",
    href: "/configure/replacing/need",
  },
  {
    id: "industrial",
    icon: "fence",
    href: "/configure/replacing/need",
  },
] as const;

export function ReplacingTypeQuestion() {
  const { t } = useLanguage();
  const copy = t.configure.replacingType;
  const { isSelected, toggleSelect, navigation } = useConfigureSelection(
    REPLACEMENT_TYPE_OPTIONS
  );

  const options = [
    {
      ...REPLACEMENT_TYPE_OPTIONS[0],
      title: copy.sliding.title,
      description: copy.sliding.description,
    },
    {
      ...REPLACEMENT_TYPE_OPTIONS[1],
      title: copy.swing.title,
      description: copy.swing.description,
    },
    {
      ...REPLACEMENT_TYPE_OPTIONS[2],
      title: copy.industrial.title,
      description: copy.industrial.description,
    },
  ];

  return (
    <ConfigureQuestionLayout
      step={2}
      totalSteps={3}
      backHref="/configure"
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
