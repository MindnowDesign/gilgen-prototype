"use client";

import { ConfiguratorOptionSection } from "@/components/configurator/configurator-option-section";
import { useLanguage } from "@/i18n/language-provider";

const DOOR_CONFIGURATION_OPTIONS = [
  { id: "single" },
  { id: "double" },
  { id: "telescopic" },
] as const;

export function ConfiguratorDoorConfiguration() {
  const { t } = useLanguage();

  return (
    <ConfiguratorOptionSection
      title={t.configurator.doorConfiguration}
      options={DOOR_CONFIGURATION_OPTIONS.map((option) => ({
        id: option.id,
        label: t.configurator.configuration[option.id],
      }))}
      defaultSelectedId="double"
    />
  );
}
