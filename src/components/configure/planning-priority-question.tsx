"use client";

import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";
import { useConfigureSelection } from "@/components/configure/use-configure-selection";
import { useLanguage } from "@/i18n/language-provider";

const PRIORITY_OPTIONS = [
  {
    id: "design",
    icon: "design_services",
    href: "/configurator",
  },
  {
    id: "security",
    icon: "shield",
    href: "/configurator",
  },
  {
    id: "accessibility",
    icon: "accessible",
    href: "/configurator",
  },
] as const;

export function PlanningPriorityQuestion() {
  const { t } = useLanguage();
  const copy = t.configure.planningPriority;
  const { isSelected, toggleSelect, navigation } =
    useConfigureSelection(PRIORITY_OPTIONS);

  const options = [
    {
      ...PRIORITY_OPTIONS[0],
      title: copy.design.title,
      description: copy.design.description,
    },
    {
      ...PRIORITY_OPTIONS[1],
      title: copy.security.title,
      description: copy.security.description,
    },
    {
      ...PRIORITY_OPTIONS[2],
      title: copy.accessibility.title,
      description: copy.accessibility.description,
    },
  ];

  return (
    <ConfigureQuestionLayout
      step={3}
      totalSteps={3}
      backHref="/configure/planning/location"
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
