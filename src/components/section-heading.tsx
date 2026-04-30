import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-8 bg-foreground/40" />
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-balance text-4xl leading-[1.05] tracking-tight md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="text-pretty text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
