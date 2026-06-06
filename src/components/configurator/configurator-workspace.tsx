"use client";

import { useState } from "react";

import {
  DEFAULT_CONFIGURATOR_COLOR_ID,
  type ConfiguratorColorId,
} from "@/components/configurator/configurator-colors";
import { ConfiguratorProductPanel } from "@/components/configurator/configurator-product-panel";
import { ConfiguratorSidebar } from "@/components/configurator/configurator-sidebar";
import { cn } from "@/lib/utils";

const SIDEBAR_TRANSITION =
  "duration-500 ease-out motion-reduce:transition-none";

type ConfiguratorWorkspaceProps = {
  doorName?: string;
  description?: string;
  backHref?: string;
};

export function ConfiguratorWorkspace({
  doorName = "Sliding Door System",
  description = "Commercial Application · High Traffic",
  backHref,
}: ConfiguratorWorkspaceProps) {
  const [selectedColorId, setSelectedColorId] = useState<ConfiguratorColorId>(
    DEFAULT_CONFIGURATOR_COLOR_ID
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className={cn(
        "relative isolate flex min-h-0 flex-1 flex-col gap-4 lg:min-h-0 lg:flex-1 lg:gap-x-6 lg:gap-y-0",
        "lg:grid lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:items-stretch",
        "lg:transition-[grid-template-columns] lg:will-change-[grid-template-columns]",
        SIDEBAR_TRANSITION,
        sidebarOpen
          ? "lg:[grid-template-columns:minmax(0,1fr)_380px] xl:[grid-template-columns:minmax(0,1fr)_420px]"
          : "lg:[grid-template-columns:minmax(0,1fr)_0px]"
      )}
    >
      <ConfiguratorProductPanel
        doorName={doorName}
        description={description}
        backHref={backHref}
        selectedColorId={selectedColorId}
        sidebarOpen={sidebarOpen}
        onSidebarOpenChange={setSidebarOpen}
      />
      <div
        className={cn(
          "relative z-20 min-h-0 overflow-hidden",
          sidebarOpen ? "flex flex-col" : "hidden lg:flex",
          "lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:[transform:translateZ(0)]"
        )}
        inert={!sidebarOpen || undefined}
        aria-hidden={!sidebarOpen}
      >
        <div
          className={cn(
            "flex h-full w-[380px] flex-col xl:w-[420px]",
            "lg:origin-top-right lg:transition-[transform,opacity] lg:will-change-[transform,opacity]",
            SIDEBAR_TRANSITION,
            sidebarOpen
              ? "lg:translate-x-0 lg:opacity-100"
              : "lg:pointer-events-none lg:translate-x-[calc(100%+32px)] lg:opacity-0"
          )}
        >
          <ConfiguratorSidebar
            selectedColorId={selectedColorId}
            onColorChange={setSelectedColorId}
          />
        </div>
      </div>
    </div>
  );
}
