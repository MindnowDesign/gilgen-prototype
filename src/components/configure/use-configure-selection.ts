"use client";

import { useState } from "react";

type SelectableOption = {
  id: string;
  href?: string;
};

export function useConfigureSelection<T extends SelectableOption>(
  options: readonly T[]
) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedOption = options.find((option) => option.id === selectedId);

  const toggleSelect = (id: string) => {
    setSelectedId((current) => (current === id ? null : id));
  };

  return {
    isSelected: (id: string) => selectedId === id,
    toggleSelect,
    navigation: {
      nextHref: selectedOption?.href,
      nextDisabled: !selectedId,
    },
  };
}
