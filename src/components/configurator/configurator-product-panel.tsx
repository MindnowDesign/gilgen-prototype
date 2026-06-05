"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

import {
  getConfiguratorColorHex,
  type ConfiguratorColorId,
} from "@/components/configurator/configurator-colors";
import { MaterialIcon } from "@/components/icons/material-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ConfiguratorDoorScene = dynamic(
  () =>
    import("@/components/configurator/configurator-door-scene").then(
      (mod) => mod.ConfiguratorDoorScene
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-full min-h-[368px] w-full max-w-2xl animate-pulse rounded-[4px] bg-black-100/40" />
    ),
  }
);

const ACTION_BUTTONS = [
  { label: "Full screen", icon: "open_in_full" },
  { label: "Change background", icon: "image" },
  { label: "Dimensions", icon: "straighten" },
] as const;

const PANEL_CONTROL_BUTTON_CLASS =
  "flex size-12 shrink-0 items-center justify-center rounded-[4px] border border-black-200 bg-white transition-colors hover:bg-black-50 md:size-14";

type ConfiguratorProductPanelProps = {
  doorName: string;
  description?: string;
  backHref?: string;
  selectedColorId: ConfiguratorColorId;
};

function ConfiguratorActionButton({
  label,
  icon,
}: {
  label: string;
  icon: string;
}) {
  return (
    <div className="group relative shrink-0">
      <button
        type="button"
        aria-label={label}
        className={cn(PANEL_CONTROL_BUTTON_CLASS, "text-black-950")}
      >
        <MaterialIcon name={icon} size={24} weight={300} />
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

export function ConfiguratorProductPanel({
  doorName,
  description = "Placeholder",
  backHref = "/configure",
  selectedColorId,
}: ConfiguratorProductPanelProps) {
  const frameColor = getConfiguratorColorHex(selectedColorId);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-visible">
      <div className="relative z-10 px-2 pt-2 md:px-4">
        <div className="mt-4 flex items-start gap-3">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="shrink-0 text-black-600 hover:bg-black-50 hover:text-black-950"
          >
            <Link href={backHref} aria-label="Back">
              <MaterialIcon name="arrow_back" size={20} weight={300} />
            </Link>
          </Button>

          <div className="min-w-0">
            <h1 className="text-[2rem] font-bold leading-tight tracking-tight">
              {doorName}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-black-500 md:text-base">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-0 flex min-h-[368px] flex-1 items-center justify-center overflow-visible px-2 md:px-4">
        <div className="pointer-events-auto h-full w-full max-w-3xl overflow-visible">
          <ConfiguratorDoorScene
            frameColor={frameColor}
            colorId={selectedColorId}
          />
        </div>
      </div>

      <div className="relative z-10 px-2 pb-2 md:px-4">
        <div className="flex items-end justify-end gap-4">
          <div className="flex shrink-0 gap-2">
            {ACTION_BUTTONS.map((action) => (
              <ConfiguratorActionButton
                key={action.label}
                label={action.label}
                icon={action.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
