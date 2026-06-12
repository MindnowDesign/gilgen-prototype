"use client";

import { useEffect, useRef, useState } from "react";

import { MaterialIcon } from "@/components/icons/material-icon";
import { LOCALES } from "@/i18n/translations";
import { useLanguage } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

type LanguageSelectorProps = {
  variant?: "light" | "dark";
};

export function LanguageSelector({ variant = "light" }: LanguageSelectorProps) {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLabel =
    LOCALES.find((entry) => entry.value === locale)?.label ?? "English";

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.common.language}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex items-center gap-2 rounded-[4px] border px-3 py-2 text-sm font-medium transition-colors",
          variant === "dark"
            ? "border-white/20 bg-white/10 text-white hover:bg-white/15"
            : "border-black-100/80 bg-white text-black-950 hover:bg-black-50"
        )}
      >
        <MaterialIcon name="language" size={18} weight={300} />
        <span>{currentLabel}</span>
        <MaterialIcon
          name="keyboard_arrow_down"
          size={18}
          weight={300}
          className={cn(
            "transition-transform",
            open && "rotate-180",
            variant === "dark" ? "text-white/70" : "text-black-500"
          )}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={t.common.language}
          className={cn(
            "absolute top-full right-0 z-50 mt-2 min-w-full overflow-hidden rounded-[4px] border py-1 shadow-lg",
            variant === "dark"
              ? "border-white/20 bg-[#1a1a1a] text-white"
              : "border-black-100/80 bg-white text-black-950"
          )}
        >
          {LOCALES.map((entry) => {
            const selected = entry.value === locale;

            return (
              <li key={entry.value} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    setLocale(entry.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 px-3 py-2 text-left text-sm transition-colors",
                    variant === "dark"
                      ? selected
                        ? "bg-white/10 font-medium"
                        : "hover:bg-white/5"
                      : selected
                        ? "bg-black-50 font-medium"
                        : "hover:bg-black-50"
                  )}
                >
                  <span>{entry.label}</span>
                  {selected ? (
                    <MaterialIcon
                      name="check"
                      size={16}
                      weight={400}
                      className={
                        variant === "dark" ? "text-white" : "text-black-700"
                      }
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
