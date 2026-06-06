import { MaterialIcon } from "@/components/icons/material-icon";
import { Button } from "@/components/ui/button";
import { GilgenLogo } from "@/components/welcome/gilgen-logo";

type ConfiguratorLayoutProps = {
  children: React.ReactNode;
};

export function ConfiguratorLayout({ children }: ConfiguratorLayoutProps) {
  return (
    <div className="h-dvh bg-surface text-black-950">
      <div className="grid h-full grid-rows-[auto_minmax(0,1fr)]">
        <header className="relative z-10 flex items-center justify-between px-8 py-6 md:px-12">
          <div className="flex items-center gap-8">
            <GilgenLogo />
            <span
              aria-hidden
              className="h-6 w-px shrink-0 bg-black-400"
            />
            <span className="text-base font-medium text-black-950">
              Gilgen Configurator
            </span>
          </div>
          <Button type="button" variant="ghost">
            <MaterialIcon name="restart_alt" size={20} weight={300} />
            Reset
          </Button>
        </header>

        <div className="flex min-h-0 flex-col overflow-hidden px-4 pb-6 md:px-6">
          {children}
        </div>
      </div>
    </div>
  );
}
