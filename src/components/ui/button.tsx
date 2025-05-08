import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, forwardRef } from "react";

import { cn } from "@/utils/cn";

interface IButtonProps extends ComponentProps<"button"> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, type, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

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
