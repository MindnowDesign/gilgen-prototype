"use client";

import Link from "next/link";

import { AppHeader } from "@/components/layout/app-header";
import { MaterialIcon } from "@/components/icons/material-icon";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

import { WelcomeBackground } from "./welcome-background";

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
  const { t } = useLanguage();

  const steps = [
    { number: "01", label: t.welcome.stepQuestions },
    { number: "02", label: t.welcome.stepConfigurator },
  ] as const;

  return (
    <div
      className={cn(
        "mt-12 flex w-full flex-row flex-nowrap items-center justify-center",
        !visible && "invisible"
      )}
      role={visible ? "list" : undefined}
      aria-hidden={!visible}
    >
      {steps.map((step, index) => (
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
  const { t } = useLanguage();

  return (
    <div className={heroSectionClassName}>
      <div className={cn(!showHeading && "invisible")} aria-hidden={!showHeading}>
        <h1 className={heroTitleClassName}>{t.welcome.heroTitle}</h1>
      </div>

      <div
        className={cn(!showDescription && "invisible")}
        aria-hidden={!showDescription}
      >
        <p className={heroDescriptionClassName}>
          {t.welcome.heroDescriptionBefore}{" "}
          <span className="font-semibold">{t.welcome.heroDescriptionHighlight}</span>
          {t.welcome.heroDescriptionAfter}
        </p>
      </div>

      <WelcomeHeroSteps visible={showSteps} />

      <div className={cn("mt-14", !showButton && "invisible")} aria-hidden={!showButton}>
        <Button asChild variant="cta">
          <Link href="/configure">
            {t.common.start}
            <MaterialIcon name="arrow_forward" size={20} weight={300} />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function WelcomeFooter({ visible = true }: { visible?: boolean }) {
  const { t } = useLanguage();

  return (
    <footer className={cn(footerClassName, !visible && "invisible")} aria-hidden={!visible}>
      <p>{t.welcome.copyright}</p>
      <div className="flex flex-col gap-2 sm:items-end">
        <p>
          {t.welcome.needHelp}{" "}
          <Link
            href="#"
            className="font-semibold text-white underline-offset-2 hover:underline"
          >
            {t.welcome.contactUs}
          </Link>
        </p>
        <Button
          asChild
          variant="link"
          className="h-auto p-0 text-xs text-black-300 hover:text-white"
        >
          <Link href="/configurator">{t.common.goToConfigurator}</Link>
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
            <AppHeader logoVariant="dark" className="invisible" />

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
        <AppHeader logoVariant="dark" />

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
