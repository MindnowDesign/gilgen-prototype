import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center rounded-[4px] border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "[&_svg:last-child]:transition-transform [&_svg:last-child]:group-hover/button:translate-x-0.5",
    "[&_.material-icons-outlined:last-child]:transition-transform [&_.material-icons-outlined:last-child]:group-hover/button:translate-x-0.5",
    "[&_.material-symbols-outlined:last-child]:transition-transform [&_.material-symbols-outlined:last-child]:group-hover/button:translate-x-0.5",
    "[&_.material-symbols-outlined:first-child]:transition-transform [&_.material-symbols-outlined:first-child]:group-hover/button:-translate-x-0.5",
    "[&_[data-button-icon=end]]:transition-transform [&_[data-button-icon=end]]:group-hover/button:translate-x-0.5",
    "[&_[data-button-icon=start]]:transition-transform [&_[data-button-icon=start]]:group-hover/button:-translate-x-0.5",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        cta: "bg-yellow-300 font-bold tracking-wide text-black-950 uppercase hover:bg-yellow-400 focus-visible:ring-yellow-500/40",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        cta: "h-14 w-auto gap-2 px-6 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[4px] px-2 text-xs in-data-[slot=button-group]:rounded-[4px] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[4px] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-[4px] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 px-5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[4px] in-data-[slot=button-group]:rounded-[4px] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[4px] in-data-[slot=button-group]:rounded-[4px]",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"
  const resolvedSize = size ?? (variant === "cta" ? "cta" : "default")

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={resolvedSize}
      className={cn(buttonVariants({ variant, size: resolvedSize }), className)}
      {...props}
    />
  )
}

function ButtonIcon({
  position = "end",
  className,
  ...props
}: React.ComponentProps<"span"> & {
  position?: "start" | "end"
}) {
  return (
    <span
      data-button-icon={position}
      className={cn(
        "inline-flex shrink-0 transition-transform",
        position === "end" && "group-hover/button:translate-x-0.5",
        position === "start" && "group-hover/button:-translate-x-0.5",
        className
      )}
      {...props}
    />
  )
}

export { Button, ButtonIcon, buttonVariants }
