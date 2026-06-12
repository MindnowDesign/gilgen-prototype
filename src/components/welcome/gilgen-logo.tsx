"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

type GilgenLogoProps = {
  variant?: "light" | "dark";
  href?: string;
};

export function GilgenLogo({ variant = "light", href = "/" }: GilgenLogoProps) {
  const { t } = useLanguage();

  return (
    <Link href={href} aria-label={t.common.backToStart} className="shrink-0">
      <Image
        src="/brand/gilgen-logo.svg"
        alt="Gilgen Door Systems"
        width={115}
        height={28}
        priority
        className={cn(
          "h-[28px] w-[115px]",
          variant === "dark" && "brightness-0 invert"
        )}
      />
    </Link>
  );
}
