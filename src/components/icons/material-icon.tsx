import { cn } from "@/lib/utils";

type MaterialIconProps = {
  name: string;
  className?: string;
  size?: number;
};

export function MaterialIcon({ name, className, size = 24 }: MaterialIconProps) {
  return (
    <span
      className={cn("material-icons-outlined leading-none", className)}
      style={{ fontSize: size, width: size, height: size }}
      aria-hidden
    >
      {name}
    </span>
  );
}
