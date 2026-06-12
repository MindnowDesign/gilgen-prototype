"use client";

import { ConfiguratorOptionSection } from "@/components/configurator/configurator-option-section";
import { useLanguage } from "@/i18n/language-provider";

const PROFILE_STYLE_OPTIONS = [
  {
    id: "frameless",
    imageSrc: "/configurator/profile-frameless.png?v=3",
  },
  {
    id: "slim-frame",
    imageSrc: "/configurator/profile-slim-frame.png?v=3",
  },
  {
    id: "standard-frame",
    imageSrc: "/configurator/profile-standard-frame.png?v=3",
  },
] as const;

const PROFILE_LABEL_KEYS = {
  frameless: "frameless",
  "slim-frame": "slimFrame",
  "standard-frame": "standardFrame",
} as const;

export function ConfiguratorProfileStyle() {
  const { t } = useLanguage();

  return (
    <ConfiguratorOptionSection
      title={t.configurator.profileStyle}
      options={PROFILE_STYLE_OPTIONS.map((option) => ({
        id: option.id,
        imageSrc: option.imageSrc,
        label: t.configurator.profile[PROFILE_LABEL_KEYS[option.id]],
      }))}
      defaultSelectedId="standard-frame"
      showImages
    />
  );
}
