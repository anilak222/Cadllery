"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

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
      <Image
        {...props}
        alt={alt}
        loading={props.priority ? undefined : "lazy"}
        onLoad={() => setLoaded(true)}
        className={cn(
          "block h-full w-full object-cover transition-[opacity,transform,filter] duration-[1100ms] ease-out will-change-transform",
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
