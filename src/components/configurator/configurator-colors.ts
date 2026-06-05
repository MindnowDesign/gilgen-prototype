export const CONFIGURATOR_COLOR_OPTIONS = [
  { id: "natural-aluminium", label: "Natural Aluminium", color: "#C6C8CA" },
  { id: "anthracite-black", label: "Anthracite Black", color: "#2F3136" },
  {
    id: "pure-white",
    label: "Pure White",
    color: "#F6F6F4",
    ring: true,
  },
  { id: "stainless-steel", label: "Stainless Steel", color: "#A7ADB3" },
  { id: "custom", label: "Custom", custom: true },
] as const;

export type ConfiguratorColorId =
  (typeof CONFIGURATOR_COLOR_OPTIONS)[number]["id"];

export const DEFAULT_CONFIGURATOR_COLOR_ID: ConfiguratorColorId =
  "natural-aluminium";

export function getConfiguratorColorHex(colorId: ConfiguratorColorId | string) {
  const option = CONFIGURATOR_COLOR_OPTIONS.find(
    (entry) => entry.id === colorId
  );

  if (!option || !("color" in option)) {
    return CONFIGURATOR_COLOR_OPTIONS[0].color;
  }

  return option.color;
}

export function isConfiguratorColorApplicable(colorId: ConfiguratorColorId | string) {
  return colorId !== "custom";
}
