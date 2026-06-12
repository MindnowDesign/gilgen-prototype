import Link from "next/link";

import { MaterialIcon } from "@/components/icons/material-icon";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FrameMarkers } from "@/components/ui/frame-button";
import { cn } from "@/lib/utils";

type ConfigureOptionCardProps = {
  index: number;
  title: string;
  description: string;
  icon: string;
  href?: string;
  selected?: boolean;
  onSelect?: () => void;
};

export function ConfigureOptionCard({
  index,
  title,
  description,
  icon,
  href,
  selected = false,
  onSelect,
}: ConfigureOptionCardProps) {
  const card = (
    <Card
      className={cn(
        "group relative aspect-square w-full cursor-pointer overflow-visible rounded-[4px] border border-black-50 bg-black-50 py-0 ring-0 transition-colors",
        "hover:border-0 hover:bg-yellow-300",
        selected && "border-0 bg-black-900 hover:bg-black-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600"
      )}
    >
      <FrameMarkers
        size={20}
        offset={5}
        hoverOffset={6}
        className={cn(
          "text-black-50 group-hover:text-black-950",
          selected && "text-black-900 group-hover:text-black-900"
        )}
      />
      <CardHeader className="!flex h-full flex-col gap-6 p-6">
        <span
          className={cn(
            "text-sm font-semibold text-black-950",
            selected && "text-black-50"
          )}
        >
          {String(index).padStart(2, "0")}
        </span>
        <div className="flex flex-1 w-full items-center justify-center">
          <MaterialIcon
            name={icon}
            size={88}
            weight={200}
            className={cn(
              "text-black-500 transition-colors group-hover/card:text-black-950",
              selected && "text-black-50 group-hover/card:text-black-50"
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <CardTitle
            className={cn(
              "text-lg font-semibold leading-tight whitespace-nowrap text-black-950",
              selected && "text-black-50"
            )}
          >
            {title}
          </CardTitle>
          <CardDescription
            className={cn(
              "min-h-[2.75rem] text-sm leading-[1.375rem] text-black-500 transition-colors group-hover/card:text-black-800",
              selected && "text-black-200 group-hover/card:text-black-200"
            )}
          >
            {description}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={onSelect}
        className="block w-full text-left"
      >
        {card}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className="block w-full text-left">
        {card}
      </Link>
    );
  }

  return (
    <button type="button" className="block w-full text-left">
      {card}
    </button>
  );
}
