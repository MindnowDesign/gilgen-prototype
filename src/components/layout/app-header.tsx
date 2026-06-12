"use client";

import { LanguageSelector } from "@/components/ui/language-selector";
import { GilgenLogo } from "@/components/welcome/gilgen-logo";
import { cn } from "@/lib/utils";

type AppHeaderProps = {
  logoVariant?: "light" | "dark";
  className?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
};

export function AppHeader({
  logoVariant = "light",
  className,
  leading,
  trailing,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between px-8 py-6 md:px-12",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-8">
        <GilgenLogo variant={logoVariant} />
        {leading}
      </div>
      <div className="flex shrink-0 items-center gap-4">
        {trailing}
        <LanguageSelector variant={logoVariant === "dark" ? "dark" : "light"} />
      </div>
    </header>
  );
}
