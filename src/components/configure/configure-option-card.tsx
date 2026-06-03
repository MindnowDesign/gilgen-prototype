import Link from "next/link";

import { MaterialIcon } from "@/components/icons/material-icon";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ConfigureOptionCardProps = {
  title: string;
  description: string;
  icon: string;
  href?: string;
};

export function ConfigureOptionCard({
  title,
  description,
  icon,
  href,
}: ConfigureOptionCardProps) {
  const card = (
    <Card
      className={cn(
        "h-full min-h-[320px] cursor-pointer rounded-[8px] bg-black-50 py-0 transition-all",
        "ring-black-100 hover:ring-yellow-600/60 hover:shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600"
      )}
    >
      <CardHeader className="!flex h-full flex-col gap-6 p-6">
        <span
          className={cn(
            "flex aspect-square w-full items-center justify-center rounded-[8px]",
            "bg-white text-black-700 transition-colors",
            "group-hover:bg-yellow-100 group-hover:text-black-950"
          )}
        >
          <MaterialIcon name={icon} size={88} weight={200} />
        </span>
        <div className="flex flex-col gap-2">
          <CardTitle className="text-lg font-semibold leading-tight text-black-950">
            {title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed text-black-500">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="group text-left">
        {card}
      </Link>
    );
  }

  return <button type="button" className="group text-left">{card}</button>;
}
