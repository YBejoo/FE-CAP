import * as React from "react";
import { cn } from "~/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export function Avatar({ className, ...props }: AvatarProps) {
  return (
    <span
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <img
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  );
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export function AvatarFallback({ className, children, ...props }: AvatarFallbackProps) {
  return (
    <span
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
