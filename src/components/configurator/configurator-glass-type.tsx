import { ConfiguratorOptionSection } from "@/components/configurator/configurator-option-section";

const GLASS_TYPE_OPTIONS = [
  {
    id: "clear",
    label: "Clear",
    imageSrc: "/configurator/clear.png?v=2",
  },
  {
    id: "frosted",
    label: "Frosted",
    imageSrc: "/configurator/frosted.png?v=2",
  },
  {
    id: "tinted",
    label: "Tinted",
    imageSrc: "/configurator/tinted.png?v=2",
  },
] as const;

export function ConfiguratorGlassType() {
  return (
    <ConfiguratorOptionSection
      title="Glass type"
      options={GLASS_TYPE_OPTIONS}
      defaultSelectedId="clear"
      showImages
    />
  );
}
