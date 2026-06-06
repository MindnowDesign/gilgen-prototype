"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";

type ConfiguratorOption = {
  id: string;
  label: string;
  imageSrc?: string;
};

type ConfiguratorOptionSectionProps = {
  title: string;
  options: readonly ConfiguratorOption[];
  defaultSelectedId: string;
  className?: string;
  showImages?: boolean;
};

export function ConfiguratorOptionSection({
  title,
  options,
  defaultSelectedId,
  className,
  showImages = false,
}: ConfiguratorOptionSectionProps) {
  const labelId = useId();
  const [selectedId, setSelectedId] = useState(defaultSelectedId);

  return (
    <section className={cn("mt-8", className)} aria-labelledby={labelId}>
      <h3 id={labelId} className="text-sm font-semibold text-black-950">
        {title}
      </h3>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {options.map((option) => {
          const selected = selectedId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setSelectedId(option.id)}
              className={cn(
                "flex flex-col items-center justify-center rounded-[4px] border px-2 text-center text-xs font-medium leading-snug transition-colors",
                showImages
                  ? "min-h-[4.75rem] gap-1.5 py-2"
                  : "h-14",
                selected
                  ? "border-black-900 bg-black-900 text-white"
                  : "border-black-100/80 bg-transparent text-black-950 hover:border-yellow-300 hover:bg-yellow-300"
              )}
            >
              {showImages && option.imageSrc ? (
                <span className="flex aspect-square w-full items-center justify-center rounded-[2px] bg-transparent">
                  <img
                    src={option.imageSrc}
                    alt=""
                    className="size-[90%] object-contain"
                  />
                </span>
              ) : null}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
