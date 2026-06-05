"use client";

import { useState } from "react";

import {
  DEFAULT_CONFIGURATOR_COLOR_ID,
  type ConfiguratorColorId,
} from "@/components/configurator/configurator-colors";
import { ConfiguratorProductPanel } from "@/components/configurator/configurator-product-panel";
import { ConfiguratorSidebar } from "@/components/configurator/configurator-sidebar";

type ConfiguratorWorkspaceProps = {
  doorName?: string;
  description?: string;
  backHref?: string;
};

export function ConfiguratorWorkspace({
  doorName = "Sliding Door System",
  description = "Placeholder",
  backHref,
}: ConfiguratorWorkspaceProps) {
  const [selectedColorId, setSelectedColorId] = useState<ConfiguratorColorId>(
    DEFAULT_CONFIGURATOR_COLOR_ID
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 lg:h-[calc(100dvh-5.5rem)] lg:flex-row lg:gap-6">
      <ConfiguratorProductPanel
        doorName={doorName}
        description={description}
        backHref={backHref}
        selectedColorId={selectedColorId}
      />
      <ConfiguratorSidebar
        selectedColorId={selectedColorId}
        onColorChange={setSelectedColorId}
      />
    </div>
  );
}
