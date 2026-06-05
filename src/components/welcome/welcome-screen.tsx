import Link from "next/link";

import { MaterialIcon } from "@/components/icons/material-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { GilgenLogo } from "./gilgen-logo";
import { WelcomeBackground } from "./welcome-background";

const STEPS = [
  { number: "01", label: "Door Type" },
  { number: "02", label: "Material & Finish" },
  { number: "03", label: "Dimensions" },
] as const;

export function WelcomeScreen() {
  return (
    <div className="relative min-h-dvh">
      <WelcomeBackground />

      <div className="relative z-10 grid min-h-dvh grid-rows-[auto_1fr_auto] text-white">
      <header className="flex items-center px-8 py-6">
        <GilgenLogo variant="dark" />
      </header>

      <main className="flex flex-col items-center justify-center px-8 md:px-12">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black-50 md:text-5xl lg:text-[3.25rem] lg:leading-tight">
            Welcome to Gilgen Configurator
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-black-200 md:text-lg">
            Before we start, please answer these{" "}
            <span className="font-semibold text-white">3 questions</span> to
            design the best experience and solution for you and your needs.
          </p>

          <ol className="mt-12 flex w-fit flex-col items-start gap-4">
            {STEPS.map((step) => (
              <li key={step.number} className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-9 items-center justify-center border text-xs font-semibold",
                    "border-white/20 bg-white/10 text-white"
                  )}
                >
                  {step.number}
                </span>
                <span className="text-sm font-medium text-black-200">
                  {step.label}
                </span>
              </li>
            ))}
          </ol>

          <Button asChild variant="cta" className="mt-14">
            <Link href="/configure">
              Start
              <MaterialIcon name="arrow_forward" size={20} />
            </Link>
          </Button>
        </div>
      </main>

      <footer className="flex flex-col gap-4 px-8 py-8 text-xs text-black-400 sm:flex-row sm:items-center sm:justify-between md:px-12">
        <p>© 2026 Gilgen Door Systems. All rights reserved.</p>
        <div className="flex flex-col gap-2 sm:items-end">
          <p>
            Need help?{" "}
            <Link
              href="#"
              className="font-semibold text-white underline-offset-2 hover:underline"
            >
              Contact us
            </Link>
          </p>
          <Button
            asChild
            variant="link"
            className="h-auto p-0 text-xs text-black-300 hover:text-white"
          >
            <Link href="/configurator">Go to configurator</Link>
          </Button>
        </div>
      </footer>
      </div>
    </div>
  );
}
