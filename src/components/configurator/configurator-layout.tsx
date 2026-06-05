import { GilgenLogo } from "@/components/welcome/gilgen-logo";

type ConfiguratorLayoutProps = {
  children: React.ReactNode;
};

export function ConfiguratorLayout({ children }: ConfiguratorLayoutProps) {
  return (
    <div className="min-h-dvh bg-surface text-black-950">
      <div className="grid min-h-dvh grid-rows-[auto_1fr]">
        <header className="relative z-10 flex items-center px-8 py-6 md:px-12">
          <GilgenLogo />
        </header>

        <div className="px-4 pb-4 md:px-6 md:pb-6">{children}</div>
      </div>
    </div>
  );
}
