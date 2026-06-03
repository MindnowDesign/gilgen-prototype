"use client";

import { ColorBends } from "@/components/background/color-bends";

export function WelcomeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-[#080808]" aria-hidden>
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
  );
}
