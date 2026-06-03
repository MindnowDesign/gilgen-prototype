import Link from "next/link";

import { MaterialIcon } from "@/components/icons/material-icon";
import { Button } from "@/components/ui/button";
import { GilgenLogo } from "@/components/welcome/gilgen-logo";

export default function ConfiguratorPage() {
  return (
    <div className="min-h-dvh bg-white text-black-950">
      <div className="grid min-h-dvh grid-rows-[auto_1fr]">
        <header className="flex items-center px-8 py-6 md:px-12">
          <GilgenLogo />
        </header>

        <main className="flex flex-col items-center justify-center px-8 pb-16 md:px-12">
          <div className="flex max-w-lg flex-col items-center text-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Gilgen Configurator
            </h1>
            <p className="mt-4 text-base leading-relaxed text-black-500">
              The product configurator is coming soon. You will be able to
              explore door solutions here.
            </p>
            <Button
              asChild
              variant="ghost"
              className="mt-8 h-10 gap-1.5 px-3 text-sm font-medium text-black-600 hover:bg-black-50 hover:text-black-950"
            >
              <Link href="/configure/unsure/help">
                <MaterialIcon name="arrow_back" size={20} />
                Back
              </Link>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
