import { ComponentProps, forwardRef } from "react";

import { cn } from "@/utils/cn";

export const Button = forwardRef<HTMLButtonElement, ComponentProps<"button">>(
  ({ className, type, ...props }, ref) => {
    const Comp = "button";

    return (
      <Comp
        className={cn(
          "bg-primary h-10 rounded-lg text-white px-3 transition-all text-xs font-semibold",
          "hover:bg-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-light disabled:text-neutral-dark cursor-pointer",
          className,
        )}
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
