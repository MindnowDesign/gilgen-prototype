"use client";

import { ConfiguratorOptionSection } from "@/components/configurator/configurator-option-section";
import { useLanguage } from "@/i18n/language-provider";

const GLASS_TYPE_OPTIONS = [
  {
    id: "clear",
    imageSrc: "/configurator/clear.png?v=2",
  },
  {
    id: "frosted",
    imageSrc: "/configurator/frosted.png?v=2",
  },
  {
    id: "tinted",
    imageSrc: "/configurator/tinted.png?v=2",
  },
] as const;

export function ConfiguratorGlassType() {
  const { t } = useLanguage();

  return (
    <ConfiguratorOptionSection
      title={t.configurator.glassType}
      options={GLASS_TYPE_OPTIONS.map((option) => ({
        id: option.id,
        imageSrc: option.imageSrc,
        label: t.configurator.glass[option.id],
      }))}
      defaultSelectedId="clear"
      showImages
    />
  );
}
