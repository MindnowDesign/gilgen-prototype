import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type GilgenLogoProps = {
  variant?: "light" | "dark";
  href?: string;
};

export function GilgenLogo({ variant = "light", href = "/" }: GilgenLogoProps) {
  return (
    <Link href={href} aria-label="Back to start" className="shrink-0">
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
