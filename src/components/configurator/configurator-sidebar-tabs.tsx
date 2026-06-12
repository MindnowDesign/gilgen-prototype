"use client";

import { useState } from "react";

import { ConfiguratorColorsSection } from "@/components/configurator/configurator-colors-section";
import { type ConfiguratorColorId } from "@/components/configurator/configurator-colors";
import { ConfiguratorDoorConfiguration } from "@/components/configurator/configurator-door-configuration";
import { ConfiguratorGlassType } from "@/components/configurator/configurator-glass-type";
import { ConfiguratorProfileStyle } from "@/components/configurator/configurator-profile-style";
import { MaterialIcon } from "@/components/icons/material-icon";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

type SidebarTabId = "design" | "performance" | "summary";

type FolderTabProps = {
  id: SidebarTabId;
  label: string;
  icon: string;
  selected: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelect: () => void;
};

function FolderTab({
  id,
  label,
  icon,
  selected,
  isFirst,
  isLast,
  onSelect,
}: FolderTabProps) {
  return (
    <button
      type="button"
      role="tab"
      id={`configurator-tab-${id}`}
      aria-selected={selected}
      aria-controls={`configurator-tabpanel-${id}`}
      onClick={onSelect}
      className={cn(
        "relative m-0 flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-t-[4px] border-0 px-2 py-2.5 text-xs transition-colors",
        selected
          ? "z-10 -mb-px bg-white pb-[calc(0.625rem+1px)] font-semibold text-black-950"
          : "bg-black-100 font-normal text-black-500 hover:text-black-800"
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
      <MaterialIcon name={icon} size={16} weight={300} className="shrink-0" />
      <span className="min-w-0 truncate">{label}</span>
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
  const { t } = useLanguage();

  return (
    <div
      role="tabpanel"
      id={`configurator-tabpanel-${activeTab}`}
      aria-labelledby={`configurator-tab-${activeTab}`}
      className="[&>section:first-child]:mt-0"
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
          {t.configurator.performancePlaceholder}
        </p>
      ) : null}

      {activeTab === "summary" ? (
        <p className="text-sm leading-relaxed text-black-500">
          {t.configurator.summaryPlaceholder}
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
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<SidebarTabId>("design");

  const sidebarTabs = [
    { id: "design" as const, label: t.configurator.tabs.design, icon: "palette" },
    {
      id: "performance" as const,
      label: t.configurator.tabs.performance,
      icon: "tune",
    },
    { id: "summary" as const, label: t.configurator.tabs.summary, icon: "description" },
  ];

  const activeTabIndex = sidebarTabs.findIndex((tab) => tab.id === activeTab);
  const nextTab = sidebarTabs[activeTabIndex + 1];

  return (
    <div className="relative flex h-full w-full min-h-0 flex-col">
      <div className="pt-2">
        <div
          role="tablist"
          aria-label={t.configurator.tabs.ariaLabel}
          className="mt-4 flex items-start gap-2 bg-surface"
        >
          {sidebarTabs.map((tab, index) => (
            <FolderTab
              key={tab.id}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              selected={activeTab === tab.id}
              isFirst={index === 0}
              isLast={index === sidebarTabs.length - 1}
              onSelect={() => setActiveTab(tab.id)}
            />
          ))}
        </div>
      </div>

      <aside className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-b-[4px] bg-white">
        <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-8">
          <ConfiguratorSidebarTabPanel
            activeTab={activeTab}
            selectedColorId={selectedColorId}
            onColorChange={onColorChange}
          />
        </div>

        <div className="shrink-0 space-y-4 border-t border-black-100/80 px-6 py-6 md:px-8 md:py-6">
          <div className="rounded-[4px] bg-black-950 p-5">
            <p className="text-2xl font-bold tracking-tight text-white">
              CHF 10&apos;000
            </p>
            <p className="mt-1 text-xs text-black-400">{t.configurator.totalPrice}</p>
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
            {t.common.next}
            <MaterialIcon name="arrow_forward" size={20} weight={300} />
          </Button>
        </div>
      </aside>
    </div>
  );
}
