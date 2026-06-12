"use client";

import {
  CONFIGURATOR_COLOR_OPTIONS,
  type ConfiguratorColorId,
} from "@/components/configurator/configurator-colors";
import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

const COLOR_LABEL_KEYS = {
  "natural-aluminium": "naturalAluminium",
  "anthracite-black": "anthraciteBlack",
  "pure-white": "pureWhite",
  "stainless-steel": "stainlessSteel",
  custom: "custom",
} as const;

const COLOR_BUTTON_CLASS =
  "flex aspect-square w-full items-center justify-center rounded-[4px] border border-black-100/80 bg-white transition-colors hover:border-yellow-300 hover:bg-yellow-300";

type ConfiguratorColorSwatchProps = {
  label: string;
  color?: string;
  custom?: boolean;
  ring?: boolean;
  selected?: boolean;
  onSelect: () => void;
};

function ConfiguratorColorSwatch({
  label,
  color,
  custom = false,
  ring = false,
  selected = false,
  onSelect,
}: ConfiguratorColorSwatchProps) {
  return (
    <div className="group relative w-full">
      <button
        type="button"
        aria-label={label}
        aria-pressed={selected}
        onClick={onSelect}
        className={cn(
          COLOR_BUTTON_CLASS,
          selected &&
            "border-black-900 bg-black-900 hover:border-black-900 hover:bg-black-900"
        )}
      >
        <span
          className={cn(
            "aspect-square w-[64%] rounded-full",
            ring && "ring-1 ring-black-200 ring-inset",
            selected && "border-[1.5px] border-black-50"
          )}
          style={
            custom
              ? {
                  background:
                    "conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                }
              : { backgroundColor: color }
          }
        />
      </button>
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2",
          "rounded-[4px] bg-black-950 px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-white",
          "opacity-0 transition-opacity group-hover:opacity-100"
        )}
      >
        {label}
      </span>
    </div>
  );
}

type ConfiguratorColorsSectionProps = {
  selectedColorId: ConfiguratorColorId;
  onColorChange: (colorId: ConfiguratorColorId) => void;
};

export function ConfiguratorColorsSection({
  selectedColorId,
  onColorChange,
}: ConfiguratorColorsSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="mt-8" aria-labelledby="configurator-colors-label">
      <h3
        id="configurator-colors-label"
        className="text-sm font-semibold text-black-950"
      >
        {t.configurator.colors}
      </h3>

      <div className="mt-3 grid w-full grid-cols-5 gap-2">
        {CONFIGURATOR_COLOR_OPTIONS.map((option) => {
          const labelKey = COLOR_LABEL_KEYS[option.id];
          const label = t.configurator.colorLabels[labelKey];

          return (
            <ConfiguratorColorSwatch
              key={option.id}
              label={label}
              color={"color" in option ? option.color : undefined}
              custom={"custom" in option ? option.custom : false}
              ring={"ring" in option ? option.ring : false}
              selected={selectedColorId === option.id}
              onSelect={() => onColorChange(option.id)}
            />
          );
        })}
      </div>
    </section>
  );
}
