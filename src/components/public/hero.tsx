import { ArrowRight, CircleCheck, Phone, ShieldCheck, Snowflake, Sparkles, Zap,Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
  return (
      <section className="relative isolate">
        {/* Background décor */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-b from-primary/10 via-background to-background"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        />
        <div
          aria-hidden
          className="absolute -top-24 -left-24 -z-10 size-96 rounded-full bg-primary/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute top-10 -right-28 -z-10 size-[28rem] rounded-full bg-primary/10 blur-3xl"
        />

        <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-28 lg:pb-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Copy */}
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm font-medium shadow-sm backdrop-blur">
                <Sparkles className="size-4 text-primary" />
                FixItNow Services, made simple
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Services That Keep Your Home{" "}
                <span className="bg-gradient-to-r from-primary via-primary/70 to-primary/40 bg-clip-text text-transparent">
                  Running Smoothly
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                From cooling to plumbing and power, book trusted, insured
                professionals who treat your home like their own — right when
                you need them.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/services">
                    Explore Services
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <Link href="/technicians">Find a Technician</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-10 grid max-w-md grid-cols-3 divide-x divide-border/70 rounded-2xl border bg-background/70 py-4 shadow-sm backdrop-blur">
                {[
                  { value: "500+", label: "Verified pros" },
                  { value: "4.9/5", label: "Customer rating" },
                  { value: "12k+", label: "Jobs completed" },
                ].map((stat) => (
                  <div key={stat.label} className="px-4 text-center">
                    <p className="text-xl font-bold sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating feature card */}
            <div className="relative mx-auto hidden w-full max-w-md lg:block">
              <div
                aria-hidden
                className="absolute -top-8 -right-8 size-40 rounded-full bg-primary/2 blur-2xl"
              />

              {/* Hero Image */}
              <div className="relative hidden lg:block">
                <div className="overflow-hidden rounded-3xl">
                  <Image
                    src="/hero-image.webp"
                    alt="Professional home service technician"
                    width={700}
                    height={600}
                    priority
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-8 flex -rotate-3 items-center gap-3 rounded-2xl border bg-background/50 p-4 shadow-lg  backdrop-blur">
                <div className="flex size-11 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Same-day service</p>
                  <p className="text-xs text-muted-foreground">
                    Quality service you can trust
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
