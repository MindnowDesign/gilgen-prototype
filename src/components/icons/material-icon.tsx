import { cn } from "@/lib/utils";

type MaterialIconProps = {
  name: string;
  className?: string;
  size?: number;
  weight?: number;
};

export function MaterialIcon({
  name,
  className,
  size = 24,
  weight,
}: MaterialIconProps) {
  const useSymbols = weight !== undefined;

  return (
    <span
      className={cn(
        useSymbols ? "material-symbols-outlined" : "material-icons-outlined",
        "leading-none",
        className
      )}
      style={{
        fontSize: size,
        width: size,
        height: size,
        ...(useSymbols && {
          fontVariationSettings: `'FILL' 0, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`,
        }),
      }}
      aria-hidden
    >
      {name}
    </span>
  );
}
