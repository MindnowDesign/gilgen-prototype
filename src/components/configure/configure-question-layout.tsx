import Link from "next/link";

import { MaterialIcon } from "@/components/icons/material-icon";
import { Button } from "@/components/ui/button";
import { GilgenLogo } from "@/components/welcome/gilgen-logo";

type ConfigureQuestionLayoutProps = {
  step: number;
  totalSteps: number;
  backHref: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  navigation: {
    nextHref?: string;
    nextDisabled?: boolean;
  };
};

export function ConfigureQuestionLayout({
  step,
  totalSteps,
  backHref,
  title,
  subtitle,
  children,
  navigation,
}: ConfigureQuestionLayoutProps) {
  return (
    <div className="min-h-dvh bg-white text-black-950">
      <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
        <header className="flex items-center px-8 py-6 md:px-12">
          <GilgenLogo />
        </header>

        <main className="flex flex-col items-center p-14">
          <div className="flex w-full max-w-3xl flex-col items-center text-center">
            <p className="mb-6 text-xs font-[500] tracking-[0.2em] text-black-400 uppercase">
              Question {step} of {totalSteps}
            </p>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-black-500">
              {subtitle}
            </p>
          </div>

          <div className="mt-12 grid w-full max-w-4xl gap-6 sm:grid-cols-3">
            {children}
          </div>

          <div className="mt-12 flex w-full max-w-4xl items-center justify-between">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-black-700 bg-transparent font-bold tracking-wide text-black-700 uppercase hover:bg-black-50 hover:text-black-700 focus-visible:ring-black-700/40"
            >
              <Link href={backHref}>
                <MaterialIcon name="arrow_back" size={20} weight={300} />
                Back
              </Link>
            </Button>

            {navigation.nextDisabled || !navigation.nextHref ? (
              <Button variant="cta" size="lg" disabled>
                Next
                <MaterialIcon name="arrow_forward" size={20} weight={300} />
              </Button>
            ) : (
              <Button asChild variant="cta" size="lg">
                <Link href={navigation.nextHref}>
                  Next
                  <MaterialIcon name="arrow_forward" size={20} weight={300} />
                </Link>
              </Button>
            )}
          </div>
        </main>

        <footer className="flex justify-center px-8 py-6 md:px-12">
          <Button
            asChild
            variant="link"
            className="text-sm text-black-500 hover:text-black-950"
          >
            <Link href="/configurator">Go to configurator</Link>
          </Button>
        </footer>
      </div>
    </div>
  );
}
