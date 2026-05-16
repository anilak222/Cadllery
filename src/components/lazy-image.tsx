"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type Props = Omit<ImageProps, "onLoad"> & {
  containerClassName?: string;
  reveal?: boolean;
};

export function LazyImage({
  className,
  containerClassName,
  alt,
  reveal = true,
  ...props
}: Props) {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-secondary",
        containerClassName
      )}
    >
      <Skeleton
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100"
        )}
      />
      <Image
        {...props}
        alt={alt}
        loading={props.priority ? undefined : "lazy"}
        onLoad={() => setLoaded(true)}
        className={cn(
          "relative block h-full w-full object-cover transition-[opacity,transform,filter] duration-[1100ms] ease-out will-change-[opacity,transform]",
          reveal &&
            (loaded
              ? "opacity-100 scale-100 blur-0"
              : "opacity-0 scale-[1.04] blur-md"),
          className
        )}
      />
    </div>
  );
}
