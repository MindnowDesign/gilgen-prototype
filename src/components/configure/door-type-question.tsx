"use client";

import Link from "next/link";

import { MaterialIcon } from "@/components/icons/material-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GilgenLogo } from "@/components/welcome/gilgen-logo";
import { cn } from "@/lib/utils";

const DOOR_TYPE_OPTIONS = [
  {
    id: "planning",
    title: "Planning a new project",
    description:
      "I'm exploring door solutions for a new building or renovation.",
    icon: "architecture",
  },
  {
    id: "replacing",
    title: "Replacing an existing door",
    description:
      "I need a compatible replacement for an existing installation.",
    icon: "construction",
  },
  {
    id: "unsure",
    title: "I'm not sure",
    description: "Help me find the right solution.",
    icon: "help_outline",
  },
] as const;

export function DoorTypeQuestion() {
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
              <Link href="/">
                <MaterialIcon name="arrow_back" size={20} />
                Back
              </Link>
            </Button>
          </div>

          <div className="flex w-full max-w-3xl flex-col items-center text-center">
            <p className="mb-6 text-xs font-medium tracking-[0.2em] text-black-400 uppercase">
              Question 1 of 3
            </p>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              What are you working on?
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-black-500">
              Select the option that best matches your project. You can refine
              your choice in the next steps.
            </p>
          </div>

          <div className="mt-12 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
            {DOOR_TYPE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className="group text-left"
              >
                <Card
                  className={cn(
                    "h-full cursor-pointer rounded-[6px] py-0 transition-all",
                    "ring-black-100 hover:ring-yellow-600/60 hover:shadow-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600"
                  )}
                >
                  <CardHeader className="gap-4 px-5 py-6">
                    <span
                      className={cn(
                        "flex size-11 items-center justify-center rounded-[6px]",
                        "bg-black-50 text-black-700 transition-colors",
                        "group-hover:bg-yellow-100 group-hover:text-black-950"
                      )}
                    >
                      <MaterialIcon name={option.icon} size={24} />
                    </span>
                    <CardTitle className="text-lg font-semibold text-black-950">
                      {option.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-black-500">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
