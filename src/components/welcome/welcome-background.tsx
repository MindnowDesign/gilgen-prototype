"use client";

import type { ReactNode } from "react";

import { ColorBends } from "@/components/background/color-bends";

type WelcomeBackgroundProps = {
  heroOverlay?: ReactNode;
};

export function WelcomeBackground({ heroOverlay }: WelcomeBackgroundProps) {
  return (
    <div className="absolute inset-0 bg-[#080808]">
      <div className="absolute inset-0 isolate">
        {heroOverlay}

        <div className="absolute inset-0 mix-blend-difference" aria-hidden>
          <ColorBends
            colors={["#FFE344"]}
            rotation={-155}
            speed={0.15}
            scale={1.2}
            frequency={1}
            warpStrength={1}
            mouseInfluence={0}
            noise={0.83}
            parallax={0.15}
            iterations={2}
            intensity={1.9}
            bandWidth={5}
            transparent
          />
        </div>
      </div>
    </div>
  );
}
