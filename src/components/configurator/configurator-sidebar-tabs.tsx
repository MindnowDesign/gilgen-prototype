"use client";

import { useState } from "react";

import { ConfiguratorDoorConfiguration } from "@/components/configurator/configurator-door-configuration";
import { ConfiguratorProfileStyle } from "@/components/configurator/configurator-profile-style";
import { MaterialIcon } from "@/components/icons/material-icon";
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

function ConfiguratorSidebarTabPanel({ activeTab }: { activeTab: SidebarTabId }) {
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

export function ConfiguratorSidebar() {
  const [activeTab, setActiveTab] = useState<SidebarTabId>("design");

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
        <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
          <h2 className="text-xl font-bold tracking-tight">Build your door</h2>
          <ConfiguratorSidebarTabPanel activeTab={activeTab} />
        </div>

        <div className="mx-4 mb-4 rounded-[4px] bg-black-950 p-5 md:mx-6 md:mb-6">
          <p className="text-2xl font-bold tracking-tight text-white">—</p>
          <p className="mt-1 text-xs text-black-400">Total price</p>
        </div>
      </aside>
    </div>
  );
}
