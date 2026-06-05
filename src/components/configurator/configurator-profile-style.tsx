import { ConfiguratorOptionSection } from "@/components/configurator/configurator-option-section";

const PROFILE_STYLE_OPTIONS = [
  {
    id: "frameless",
    label: "Frameless",
    imageSrc: "/configurator/profile-frameless.png?v=3",
  },
  {
    id: "slim-frame",
    label: "Slim Frame",
    imageSrc: "/configurator/profile-slim-frame.png?v=3",
  },
  {
    id: "standard-frame",
    label: "Standard Frame",
    imageSrc: "/configurator/profile-standard-frame.png?v=3",
  },
] as const;

export function ConfiguratorProfileStyle() {
  return (
    <ConfiguratorOptionSection
      title="Profile Style"
      options={PROFILE_STYLE_OPTIONS}
      defaultSelectedId="standard-frame"
      showImages
    />
  );
}
