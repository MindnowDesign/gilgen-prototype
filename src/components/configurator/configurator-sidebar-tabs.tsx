"use client";

import { useState } from "react";

import { ConfiguratorColorsSection } from "@/components/configurator/configurator-colors-section";
import { type ConfiguratorColorId } from "@/components/configurator/configurator-colors";
import { ConfiguratorDoorConfiguration } from "@/components/configurator/configurator-door-configuration";
import { ConfiguratorGlassType } from "@/components/configurator/configurator-glass-type";
import { ConfiguratorProfileStyle } from "@/components/configurator/configurator-profile-style";
import { MaterialIcon } from "@/components/icons/material-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SIDEBAR_TABS = [
  { id: "design", label: "Design", icon: "palette" },
  { id: "performance", label: "Performance", icon: "tune" },
  { id: "summary", label: "Summary", icon: "description" },
] as const;

type SidebarTabId = (typeof SIDEBAR_TABS)[number]["id"];

type FolderTabProps = {
  tab: (typeof SIDEBAR_TABS)[number];
  selected: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelect: () => void;
};

function FolderTab({
  tab,
  selected,
  isFirst,
  isLast,
  onSelect,
}: FolderTabProps) {
  return (
    <button
      type="button"
      role="tab"
      id={`configurator-tab-${tab.id}`}
      aria-selected={selected}
      aria-controls={`configurator-tabpanel-${tab.id}`}
      onClick={onSelect}
      className={cn(
        "relative m-0 flex w-[120px] shrink-0 items-center justify-center gap-1.5 rounded-t-[4px] border-0 px-3 py-2.5 text-xs font-medium transition-colors",
        selected
          ? "z-10 -mb-px bg-white pb-[calc(0.625rem+1px)] text-black-950"
          : "bg-black-100 text-black-500 hover:text-black-800"
      )}
    >
      {selected && !isFirst ? (
        <span
          aria-hidden
          className="absolute bottom-0 -left-1 size-1 rounded-br-[4px] shadow-[2px_0_0_0_white]"
        />
      ) : null}
      {selected && !isLast ? (
        <span
          aria-hidden
          className="absolute bottom-0 -right-1 size-1 rounded-bl-[4px] shadow-[-2px_0_0_0_white]"
        />
      ) : null}
      <MaterialIcon name={tab.icon} size={16} weight={300} />
      {tab.label}
    </button>
  );
}

function ConfiguratorSidebarTabPanel({
  activeTab,
  selectedColorId,
  onColorChange,
}: {
  activeTab: SidebarTabId;
  selectedColorId: ConfiguratorColorId;
  onColorChange: (colorId: ConfiguratorColorId) => void;
}) {
  return (
    <div
      role="tabpanel"
      id={`configurator-tabpanel-${activeTab}`}
      aria-labelledby={`configurator-tab-${activeTab}`}
    >
      {activeTab === "design" ? (
        <>
          <ConfiguratorDoorConfiguration />
          <ConfiguratorProfileStyle />
          <ConfiguratorGlassType />
          <ConfiguratorColorsSection
            selectedColorId={selectedColorId}
            onColorChange={onColorChange}
          />
        </>
      ) : null}

      {activeTab === "performance" ? (
        <p className="text-sm leading-relaxed text-black-500">
          Performance options will appear here.
        </p>
      ) : null}

      {activeTab === "summary" ? (
        <p className="text-sm leading-relaxed text-black-500">
          Your configuration summary will appear here.
        </p>
      ) : null}
    </div>
  );
}

export function ConfiguratorSidebar({
  selectedColorId,
  onColorChange,
}: {
  selectedColorId: ConfiguratorColorId;
  onColorChange: (colorId: ConfiguratorColorId) => void;
}) {
  const [activeTab, setActiveTab] = useState<SidebarTabId>("design");
  const activeTabIndex = SIDEBAR_TABS.findIndex((tab) => tab.id === activeTab);
  const currentTab = SIDEBAR_TABS[activeTabIndex];
  const nextTab = SIDEBAR_TABS[activeTabIndex + 1];

  return (
    <div className="relative z-10 flex w-full shrink-0 flex-col lg:w-[380px] xl:w-[420px]">
      <div
        role="tablist"
        aria-label="Door configuration sections"
        className="flex items-end gap-2 bg-surface"
      >
        {SIDEBAR_TABS.map((tab, index) => (
          <FolderTab
            key={tab.id}
            tab={tab}
            selected={activeTab === tab.id}
            isFirst={index === 0}
            isLast={index === SIDEBAR_TABS.length - 1}
            onSelect={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      <aside className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-b-[4px] bg-white">
        <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-8">
          <h2 className="text-xl font-bold tracking-tight">{currentTab.label}</h2>
          <ConfiguratorSidebarTabPanel
            activeTab={activeTab}
            selectedColorId={selectedColorId}
            onColorChange={onColorChange}
          />
        </div>

        <div className="shrink-0 space-y-4 border-t border-black-100 p-6 md:p-8 pt-4">
          <div className="rounded-[4px] bg-black-950 p-5">
            <p className="text-2xl font-bold tracking-tight text-white">
              CHF 10&apos;000
            </p>
            <p className="mt-1 text-xs text-black-400">Total price</p>
          </div>

          <Button
            type="button"
            variant="cta"
            className="w-full"
            disabled={!nextTab}
            onClick={() => {
              if (nextTab) setActiveTab(nextTab.id);
            }}
          >
            Next
            <MaterialIcon name="arrow_forward" size={20} weight={300} />
          </Button>
        </div>
      </aside>
    </div>
  );
}
