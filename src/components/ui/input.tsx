import * as React from "react";

import { cn } from "@/utils/cn";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-10 w-full rounded-lg border border-neutral-dark px-2.5 py-3 text-xs ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-foreground placeholder:text-neutral-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white",
      className,
    )}
    ref={ref}
    {...props}
  />
));

Input.displayName = "Input";
