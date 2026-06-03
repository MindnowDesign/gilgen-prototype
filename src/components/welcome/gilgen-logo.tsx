import Image from "next/image";

import { cn } from "@/lib/utils";

type GilgenLogoProps = {
  variant?: "light" | "dark";
};

export function GilgenLogo({ variant = "light" }: GilgenLogoProps) {
  return (
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
  );
}
