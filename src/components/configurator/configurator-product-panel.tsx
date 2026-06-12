"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import {
  getConfiguratorColorHex,
  type ConfiguratorColorId,
} from "@/components/configurator/configurator-colors";
import { MaterialIcon } from "@/components/icons/material-icon";
import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

const ConfiguratorDoorScene = dynamic(
  () =>
    import("@/components/configurator/configurator-door-scene").then(
      (mod) => mod.ConfiguratorDoorScene
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-full min-h-[368px] w-full animate-pulse rounded-[4px] bg-black-100/40" />
    ),
  }
);

const PANEL_CONTROL_BUTTON_CLASS =
  "flex size-12 shrink-0 items-center justify-center rounded-[4px] border border-black-100/80 bg-white transition-colors hover:bg-black-50 md:size-14";

const PANEL_CONTROL_HEIGHT_CLASS = "h-12 md:h-14";

const SIDEBAR_TRANSITION =
  "duration-500 ease-out motion-reduce:transition-none";

const SIDEBAR_TRANSITION_MS = 500;

type ConfiguratorProductPanelProps = {
  doorName: string;
  description?: string;
  backHref?: string;
  selectedColorId: ConfiguratorColorId;
  sidebarOpen: boolean;
  onSidebarOpenChange: (open: boolean) => void;
};

function ConfiguratorDescription({ text }: { text: string }) {
  const parts = text
    .split(" · ")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    return text;
  }

  return (
    <span className="inline-flex items-center gap-3">
      {parts.flatMap((part, index) => [
        ...(index > 0
          ? [
              <span
                key={`${part}-separator`}
                aria-hidden
                className="inline-block size-1 shrink-0 bg-black-400"
              />,
            ]
          : []),
        <span key={part}>{part}</span>,
      ])}
    </span>
  );
}

function ConfiguratorDoorSelector({ value }: { value: string }) {
  return (
    <div className="relative min-w-0 shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded="true"
        className={cn(
          "flex w-[200px] items-center justify-between rounded-[4px] border border-black-100/80 bg-white px-3 text-sm font-medium text-black-950 transition-colors md:px-4",
          PANEL_CONTROL_HEIGHT_CLASS
        )}
      >
        <span className="truncate">{value}</span>
        <MaterialIcon
          name="keyboard_arrow_down"
          size={20}
          weight={300}
          className="shrink-0 text-black-500"
        />
      </button>
    </div>
  );
}

function ConfiguratorActionButton({
  label,
  icon,
  onClick,
  pressed,
  buttonClassName,
  iconSize = 24,
  tooltipPlacement = "top",
}: {
  label: string;
  icon: string;
  onClick?: () => void;
  pressed?: boolean;
  buttonClassName?: string;
  iconSize?: number;
  tooltipPlacement?: "top" | "bottom";
}) {
  return (
    <div className="group relative shrink-0">
      <button
        type="button"
        aria-label={label}
        aria-pressed={pressed}
        onClick={onClick}
        className={cn(PANEL_CONTROL_BUTTON_CLASS, "text-black-950", buttonClassName)}
      >
        <MaterialIcon name={icon} size={iconSize} weight={300} />
      </button>
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 z-10 -translate-x-1/2",
          "rounded-[4px] bg-black-950 px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-white",
          "opacity-0 transition-opacity group-hover:opacity-100",
          tooltipPlacement === "bottom"
            ? "top-full mt-2"
            : "bottom-full mb-2"
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function ConfiguratorProductPanel({
  doorName,
  description,
  backHref = "/configure",
  selectedColorId,
  sidebarOpen,
  onSidebarOpenChange,
}: ConfiguratorProductPanelProps) {
  const { t } = useLanguage();
  const frameColor = getConfiguratorColorHex(selectedColorId);
  const [viewExpanded, setViewExpanded] = useState(false);

  const actionButtons = [
    { label: t.configurator.changeBackground, icon: "image" },
    { label: t.configurator.dimensions, icon: "straighten" },
  ] as const;

  useEffect(() => {
    if (sidebarOpen) {
      setViewExpanded(false);
      return;
    }

    const timer = window.setTimeout(
      () => setViewExpanded(true),
      SIDEBAR_TRANSITION_MS
    );
    return () => window.clearTimeout(timer);
  }, [sidebarOpen]);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-visible lg:contents">
      <div className="relative z-10 px-2 pt-2 md:px-4 lg:col-start-1 lg:row-start-1">
        <div className="mt-4 flex items-start gap-3">
          <Link
            href={backHref}
            aria-label={t.common.back}
            className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-transparent text-black-950 transition-colors hover:bg-black-100/60"
          >
            <MaterialIcon name="arrow_back" size={24} weight={300} />
          </Link>

          <div className="min-w-0">
            <h1 className="text-[2rem] font-bold leading-tight tracking-tight">
              {doorName}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-black-500 md:text-base">
              <ConfiguratorDescription text={description ?? t.configurator.description} />
            </p>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "relative z-0 flex min-h-0 flex-1 items-stretch overflow-visible lg:col-start-1 lg:row-start-2 lg:min-h-0 lg:self-stretch",
          "transition-[padding] will-change-[padding]",
          SIDEBAR_TRANSITION,
          sidebarOpen ? "px-2 md:px-4" : "px-0"
        )}
      >
        <div
          className={cn(
            "pointer-events-auto h-full min-h-[368px] w-full overflow-visible",
            "transition-[max-width] will-change-[max-width]",
            SIDEBAR_TRANSITION,
            sidebarOpen ? "mx-auto max-w-3xl" : "max-w-none"
          )}
        >
          <ConfiguratorDoorScene
            frameColor={frameColor}
            colorId={selectedColorId}
            sidebarOpen={sidebarOpen}
            expanded={viewExpanded}
          />
        </div>
      </div>

      <div className="relative z-10 px-2 md:px-4 lg:col-start-1 lg:row-start-3 lg:w-full lg:self-end">
        <div className="flex items-end justify-between gap-4">
          <ConfiguratorDoorSelector value={t.configurator.slidingDoor} />
          <div className="flex shrink-0 gap-2">
            <ConfiguratorActionButton
              label={sidebarOpen ? t.configurator.hideSidebar : t.configurator.showSidebar}
              icon={sidebarOpen ? "open_in_full" : "close_fullscreen"}
              pressed={!sidebarOpen}
              onClick={() => onSidebarOpenChange(!sidebarOpen)}
            />
            {actionButtons.map((action) => (
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
