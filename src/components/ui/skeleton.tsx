import { ComponentProps } from "react";

import { cn } from "@/utils/cn";

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-skeleton animate-pulse", className)}
      {...props}
    />
  );
}
