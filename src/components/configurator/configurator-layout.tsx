"use client";

import { MaterialIcon } from "@/components/icons/material-icon";
import { AppHeader } from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/language-provider";

type ConfiguratorLayoutProps = {
  children: React.ReactNode;
};

export function ConfiguratorLayout({ children }: ConfiguratorLayoutProps) {
  const { t } = useLanguage();

  return (
    <div className="h-dvh bg-surface text-black-950">
      <div className="grid h-full grid-rows-[auto_minmax(0,1fr)]">
        <AppHeader
          leading={
            <>
              <span
                aria-hidden
                className="h-6 w-px shrink-0 bg-black-400"
              />
              <span className="text-base font-medium text-black-950">
                {t.common.gilgenConfigurator}
              </span>
            </>
          }
          trailing={
            <Button type="button" variant="ghost">
              <MaterialIcon name="restart_alt" size={20} weight={300} />
              {t.common.reset}
            </Button>
          }
        />

        <div className="flex min-h-0 flex-col overflow-hidden px-4 pb-6 md:px-6">
          {children}
        </div>
      </div>
    </div>
  );
}
