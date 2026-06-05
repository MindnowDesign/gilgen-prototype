import { ConfiguratorOptionSection } from "@/components/configurator/configurator-option-section";

const DOOR_CONFIGURATION_OPTIONS = [
  { id: "single", label: "Single Sliding" },
  { id: "double", label: "Double Sliding" },
  { id: "telescopic", label: "Telescopic" },
] as const;

export function ConfiguratorDoorConfiguration() {
  return (
    <ConfiguratorOptionSection
      title="Door Configuration"
      options={DOOR_CONFIGURATION_OPTIONS}
      defaultSelectedId="double"
    />
  );
}
