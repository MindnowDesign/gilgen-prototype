"use client";

import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";
import { useConfigureSelection } from "@/components/configure/use-configure-selection";
import { useLanguage } from "@/i18n/language-provider";

const INSTALLATION_OPTIONS = [
  {
    id: "commercial",
    icon: "apartment",
    href: "/configure/planning/priority",
  },
  {
    id: "healthcare",
    icon: "local_hospital",
    href: "/configure/planning/priority",
  },
  {
    id: "industrial",
    icon: "factory",
    href: "/configure/planning/priority",
  },
] as const;

export function PlanningLocationQuestion() {
  const { t } = useLanguage();
  const copy = t.configure.planningLocation;
  const { isSelected, toggleSelect, navigation } = useConfigureSelection(
    INSTALLATION_OPTIONS
  );

  const options = [
    {
      ...INSTALLATION_OPTIONS[0],
      title: copy.commercial.title,
      description: copy.commercial.description,
    },
    {
      ...INSTALLATION_OPTIONS[1],
      title: copy.healthcare.title,
      description: copy.healthcare.description,
    },
    {
      ...INSTALLATION_OPTIONS[2],
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
