import Link from "next/link";

import { MaterialIcon } from "@/components/icons/material-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { GilgenLogo } from "./gilgen-logo";
import { WelcomeBackground } from "./welcome-background";

const STEPS = [
  { number: "01", label: "Questions" },
  { number: "02", label: "Configurator" },
] as const;

const HERO_TITLE = "Welcome to Gilgen Configurator";

const HERO_DESCRIPTION = (
  <>
    Before we start, please answer these{" "}
    <span className="font-semibold">3 questions</span> to design the best
    experience and solution for you and your needs.
  </>
);

const heroTitleClassName =
  "text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-[3.25rem] lg:leading-tight";

const heroDescriptionClassName =
  "mx-auto mt-8 w-full max-w-xl text-base leading-relaxed text-white md:text-lg";

const heroSectionClassName =
  "flex w-full max-w-3xl flex-col items-center text-center";

const heroMainClassName =
  "flex h-full min-h-0 flex-col items-center justify-center px-8 md:px-12";

const pageGridClassName = "grid min-h-dvh grid-rows-[auto_1fr_auto]";

const footerClassName =
  "flex flex-col gap-4 px-8 py-8 text-xs text-black-400 sm:flex-row sm:items-center sm:justify-between md:px-12";

function WelcomeHeroSteps({ visible }: { visible: boolean }) {
  return (
    <div
      className={cn(
        "mt-12 flex w-full flex-row flex-nowrap items-center justify-center",
        !visible && "invisible"
      )}
      role={visible ? "list" : undefined}
      aria-hidden={!visible}
    >
      {STEPS.map((step, index) => (
        <div key={step.number} className="flex items-center" role="listitem">
          {index > 0 ? (
            <span
              aria-hidden
              className="mx-8 h-6 w-px shrink-0 bg-white/20"
            />
          ) : null}
          <span className="flex items-center gap-3">
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center border text-xs font-semibold",
                "border-white/20 bg-white/10 text-white"
              )}
            >
              {step.number}
            </span>
            <span className="whitespace-nowrap text-sm font-medium text-black-200">
              {step.label}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function WelcomeHeroBlock({
  showHeading,
  showDescription,
  showSteps,
  showButton,
}: {
  showHeading: boolean;
  showDescription: boolean;
  showSteps: boolean;
  showButton: boolean;
}) {
  return (
    <div className={heroSectionClassName}>
      <div className={cn(!showHeading && "invisible")} aria-hidden={!showHeading}>
        <h1 className={heroTitleClassName}>{HERO_TITLE}</h1>
      </div>

      <div
        className={cn(!showDescription && "invisible")}
        aria-hidden={!showDescription}
      >
        <p className={heroDescriptionClassName}>{HERO_DESCRIPTION}</p>
      </div>

      <WelcomeHeroSteps visible={showSteps} />

      <div className={cn("mt-14", !showButton && "invisible")} aria-hidden={!showButton}>
        <Button asChild variant="cta">
          <Link href="/configure">
            Start
            <MaterialIcon name="arrow_forward" size={20} weight={300} />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function WelcomeFooter({ visible = true }: { visible?: boolean }) {
  return (
    <footer className={cn(footerClassName, !visible && "invisible")} aria-hidden={!visible}>
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
  );
}

export function WelcomeScreen() {
  return (
    <div className="relative min-h-dvh">
      <WelcomeBackground
        heroOverlay={
          <div className={pageGridClassName}>
            <header className="invisible flex items-center px-8 py-6">
              <GilgenLogo variant="dark" />
            </header>

            <main className={heroMainClassName}>
              <WelcomeHeroBlock
                showHeading
                showDescription={false}
                showSteps={false}
                showButton={false}
              />
            </main>

            <WelcomeFooter visible={false} />
          </div>
        }
      />

      <div className={cn("relative z-10 text-white", pageGridClassName)}>
        <header className="flex items-center px-8 py-6">
          <GilgenLogo variant="dark" />
        </header>

        <main className={heroMainClassName}>
          <WelcomeHeroBlock
            showHeading={false}
            showDescription
            showSteps
            showButton
          />
        </main>

        <WelcomeFooter />
      </div>
    </div>
  );
}
