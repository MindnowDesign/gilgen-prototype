"use client";

import { ConfigureOptionCard } from "@/components/configure/configure-option-card";
import { ConfigureQuestionLayout } from "@/components/configure/configure-question-layout";
import { useConfigureSelection } from "@/components/configure/use-configure-selection";
import { useLanguage } from "@/i18n/language-provider";

const NEED_OPTIONS = [
  {
    id: "exact",
    icon: "sync",
    href: "/configurator",
  },
  {
    id: "performance",
    icon: "speed",
    href: "/configurator",
  },
  {
    id: "modern",
    icon: "auto_awesome",
    href: "/configurator",
  },
] as const;

export function ReplacingNeedQuestion() {
  const { t } = useLanguage();
  const copy = t.configure.replacingNeed;
  const { isSelected, toggleSelect, navigation } =
    useConfigureSelection(NEED_OPTIONS);

  const options = [
    {
      ...NEED_OPTIONS[0],
      title: copy.exact.title,
      description: copy.exact.description,
    },
    {
      ...NEED_OPTIONS[1],
      title: copy.performance.title,
      description: copy.performance.description,
    },
    {
      ...NEED_OPTIONS[2],
      title: copy.modern.title,
      description: copy.modern.description,
    },
  ];

  return (
    <ConfigureQuestionLayout
      step={3}
      totalSteps={3}
      backHref="/configure/replacing/type"
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
