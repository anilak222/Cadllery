"use client";

import * as React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Check, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
  "Concept commission",
  "Capsule",
  "Brand collaboration",
  "Press & editorial",
  "Other",
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [type, setType] = React.useState<string>(PROJECT_TYPES[0]);
  const root = React.useRef<HTMLFormElement>(null);

  useGSAP(
    () => {
      gsap.from(root.current?.querySelectorAll("[data-field]") ?? [], {
        autoAlpha: 0,
        y: 18,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
      });
    },
    { scope: root as React.RefObject<HTMLFormElement> }
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const message = (data.get("message") as string)?.trim();

    if (!name || name.length < 2) next.name = "Please enter your name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email.";
    if (!message || message.length < 20)
      next.message = "Please tell us a little more — at least a couple of sentences.";

    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          company: data.get("company") || "",
          type,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
      setType(PROJECT_TYPES[0]);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      ref={root}
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 md:p-10"
      noValidate
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field
          data-field
          label="Name"
          htmlFor="name"
          error={errors.name}
        >
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field
          data-field
          label="Email"
          htmlFor="email"
          error={errors.email}
        >
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@studio.com"
            aria-invalid={!!errors.email}
          />
        </Field>
        <Field data-field label="Company / brand" htmlFor="company">
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="Optional"
          />
        </Field>
        <div data-field className="flex flex-col gap-2">
          <Label htmlFor="type">Project type</Label>
          <div className="flex flex-wrap gap-2">
            {PROJECT_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={cn(
                  "rounded-full border px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-all cursor-pointer",
                  type === t
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <input type="hidden" name="type" value={type} />
        </div>
      </div>

      <div className="mt-6">
        <Field
          data-field
          label="Tell us about the project"
          htmlFor="message"
          error={errors.message}
        >
          <Textarea
            id="message"
            name="message"
            rows={7}
            placeholder="Brief, audience, references, timing — and anything else that would help us."
            aria-invalid={!!errors.message}
          />
        </Field>
      </div>

      <div
        data-field
        className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
      >
        <p className="text-xs text-muted-foreground">
          By sending, you agree the studio may store your message to respond.
        </p>
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Sending
            </>
          ) : status === "success" ? (
            <>
              <Check className="h-4 w-4" /> Sent
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Send brief
            </>
          )}
        </Button>
      </div>

      <div
        aria-live="polite"
        className={cn(
          "mt-6 overflow-hidden rounded-md text-sm transition-all",
          status === "success" && "max-h-24 border border-accent/30 bg-accent/10 p-4",
          status === "error" && "max-h-24 border border-destructive/30 bg-destructive/10 p-4",
          status !== "success" && status !== "error" && "max-h-0 p-0"
        )}
      >
        {status === "success" && (
          <p>Thanks — your brief is in. We&apos;ll be in touch within the week.</p>
        )}
        {status === "error" && (
          <p>
            Something went wrong sending the form. You can also email us directly at{" "}
            <a className="underline" href="mailto:studio@cadllery.com">
              studio@cadllery.com
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

function Field({ label, htmlFor, error, children, ...rest }: FieldProps) {
  return (
    <div {...rest} className={cn("flex flex-col gap-2", rest.className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
