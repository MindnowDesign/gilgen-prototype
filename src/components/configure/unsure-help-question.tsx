"use client";

import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";
import { useConfigureSelection } from "@/components/configure/use-configure-selection";
import { useLanguage } from "@/i18n/language-provider";

const HELP_OPTIONS = [
  {
    id: "project",
    icon: "architecture",
    href: "/configure/planning/location",
  },
  {
    id: "existing",
    icon: "construction",
    href: "/configure/replacing/type",
  },
  {
    id: "exploring",
    icon: "travel_explore",
    href: "/configurator",
  },
] as const;

export function UnsureHelpQuestion() {
  const { t } = useLanguage();
  const copy = t.configure.unsureHelp;
  const { isSelected, toggleSelect, navigation } =
    useConfigureSelection(HELP_OPTIONS);

  const options = [
    {
      ...HELP_OPTIONS[0],
      title: copy.project.title,
      description: copy.project.description,
    },
    {
      ...HELP_OPTIONS[1],
      title: copy.existing.title,
      description: copy.existing.description,
    },
    {
      ...HELP_OPTIONS[2],
      title: copy.exploring.title,
      description: copy.exploring.description,
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
