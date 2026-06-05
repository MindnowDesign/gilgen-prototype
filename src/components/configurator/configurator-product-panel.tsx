import Link from "next/link";

import { MaterialIcon } from "@/components/icons/material-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ACTION_BUTTONS = [
  { label: "Full screen", icon: "open_in_full" },
  { label: "Change background", icon: "image" },
  { label: "Dimensions", icon: "straighten" },
] as const;

type ConfiguratorProductPanelProps = {
  doorName: string;
  description?: string;
  backHref?: string;
};

function ConfiguratorActionButton({
  label,
  icon,
}: {
  label: string;
  icon: string;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        aria-label={label}
        className="flex size-12 items-center justify-center rounded-[4px] border border-black-200 bg-white text-black-950 transition-colors hover:bg-black-50 md:size-14"
      >
        <MaterialIcon name={icon} size={24} />
      </button>
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2",
          "rounded-[4px] bg-black-950 px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-white",
          "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
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
}: ConfiguratorProductPanelProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="px-2 pt-2 md:px-4 md:pt-4">
        <Button
          asChild
          variant="ghost"
          className="-ml-3 h-10 gap-1.5 px-3 text-sm font-medium text-black-600 hover:bg-black-50 hover:text-black-950"
        >
          <Link href={backHref}>
            <MaterialIcon name="arrow_back" size={20} />
            Back
          </Link>
        </Button>

        <h1 className="mt-4 text-[2rem] font-bold leading-tight tracking-tight">
          {doorName}
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-black-500 md:text-base">
          {description}
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center px-2 md:px-4" />

      <div className="px-2 pb-2 md:px-4 md:pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-8 md:gap-12">
            {["Spec 1", "Spec 2", "Spec 3"].map((label) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-xs text-black-400">{label}</span>
                <span className="text-lg font-semibold tracking-tight md:text-xl">
                  —
                </span>
              </div>
            ))}
          </div>

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

        <div className="mt-6 flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="size-12 rounded-[4px] border border-black-200 bg-white md:size-14"
              aria-hidden
            />
          ))}
        </div>
      </div>
    </div>
  );
}
