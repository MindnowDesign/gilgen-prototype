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
};

export function ConfigureQuestionLayout({
  step,
  totalSteps,
  backHref,
  title,
  subtitle,
  children,
}: ConfigureQuestionLayoutProps) {
  return (
    <div className="min-h-dvh bg-white text-black-950">
      <div className="grid min-h-dvh grid-rows-[auto_1fr]">
        <header className="flex items-center px-8 py-6 md:px-12">
          <GilgenLogo />
        </header>

        <main className="flex flex-col items-center px-8 pb-16 md:px-12">
          <div className="mb-8 flex w-full max-w-4xl justify-start">
            <Button
              asChild
              variant="ghost"
              className="h-10 gap-1.5 px-3 text-sm font-medium text-black-600 hover:bg-black-50 hover:text-black-950"
            >
              <Link href={backHref}>
                <MaterialIcon name="arrow_back" size={20} />
                Back
              </Link>
            </Button>
          </div>

          <div className="flex w-full max-w-3xl flex-col items-center text-center">
            <p className="mb-6 text-xs font-medium tracking-[0.2em] text-black-400 uppercase">
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
        </main>
      </div>
    </div>
  );
}
