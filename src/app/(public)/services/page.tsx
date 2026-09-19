import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  Clock,
  Droplet,
  Phone,
  PlugZap,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  Timer,
  Wallet,
  Wrench,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "1",
    name: "AC Repair",
    description: "Professional air conditioner repair service",
    price: "1200.45",
    duration: 60,
    isActive: true,
    icon: Snowflake,
    accent: "text-sky-600",
    tint: "bg-sky-500/10",
  },
  {
    id: "2",
    name: "Plumbing",
    description: "Reliable plumbing repair and installation service",
    price: "800",
    duration: 45,
    isActive: true,
    icon: Droplet,
    accent: "text-blue-600",
    tint: "bg-blue-500/10",
  },
  {
    id: "3",
    name: "Electrical Repair",
    description: "Professional electrical repair and maintenance",
    price: "1000",
    duration: 60,
    isActive: true,
    icon: PlugZap,
    accent: "text-amber-600",
    tint: "bg-amber-500/10",
  },
];

const perks = [
  {
    icon: BadgeCheck,
    title: "Verified Professionals",
    description:
      "Every technician is background-checked, trained and rated by real customers.",
  },
  {
    icon: Timer,
    title: "On-Time, Every Time",
    description:
      "Schedule to the minute and we'll show up when we say we will — guaranteed.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "Upfront quotes before any work begins. No hidden fees, no surprises.",
  },
  {
    icon: ShieldCheck,
    title: "Service Guarantee",
    description:
      "If you're not happy with the job, we'll make it right or refund you.",
  },
];

const steps = [
  {
    icon: CalendarCheck2,
    step: "01",
    title: "Book in Minutes",
    description:
      "Pick your service, choose a time slot and confirm your booking in a few taps.",
  },
  {
    icon: Wrench,
    step: "02",
    title: "Expert Arrives",
    description:
      "A verified technician arrives on schedule, fully equipped to get the job done.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Done Right",
    description:
      "Quality workmanship backed by our guarantee. Pay securely after the job is done.",
  },
];

export default function ServicePage() {
  return (
    <main className="overflow-x-clip">
      {/* ── Hero ─────────────────────────────────────────── */}
      

      {/* ── Services grid ───────────────────────────────── */}
      <section id="services" className="scroll-mt-20 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold tracking-widest text-primary uppercase">
                What we fix
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Popular Services
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Pick a service that fits your needs — every booking comes with a
                verified expert and our service guarantee.
              </p>
            </div>

            <a
              href="#services"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              View all services
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="group relative overflow-hidden rounded-3xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div
                  aria-hidden
                  className={`absolute -top-16 -right-16 size-40 rounded-full blur-3xl transition-all duration-500 ${service.tint}`}
                />

                <div className="relative flex items-start justify-between">
                  <span
                    className={`flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${service.tint} ${service.accent}`}
                  >
                    <service.icon className="size-7" strokeWidth={1.8} />
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    Available
                  </span>
                </div>

                <h3 className="relative mt-5 text-xl font-semibold">
                  {service.name}
                </h3>
                <p className="relative mt-2 text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t pt-5">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Starting from
                    </p>
                    <p className="mt-1 text-2xl font-bold text-primary">
                      ৳{Number(service.price).toLocaleString("en-BD")}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="size-4" />
                    {service.duration} min
                  </div>
                </div>

                <Button
                  type="button"
                  className="group/btn mt-5 w-full rounded-full"
                >
                  Book Service
                  <ArrowRight className="transition-transform group-hover/btn:translate-x-0.5" />
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Perks ────────────────────────────────────────── */}
      <section className="border-y bg-muted/30 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">
              Why FixItNow
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Home Service, Done Differently
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="group rounded-3xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <perk.icon className="size-6" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-semibold">{perk.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {perk.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">
              How it works
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Fixed in Three Easy Steps
            </h2>
          </div>

          <div className="relative mt-12 grid gap-6 md:grid-cols-3">
            <div
              aria-hidden
              className="absolute top-12 right-[16%] left-[16%] hidden border-t-2 border-dashed border-primary/30 md:block"
            />

            {steps.map((step) => (
              <div key={step.step} className="relative">
                <div className="flex flex-col items-center rounded-3xl border bg-background p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <span className="absolute top-4 left-4 text-4xl font-black text-muted/30 select-none">
                    {step.step}
                  </span>

                  <span className="relative flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <step.icon className="size-7" strokeWidth={1.8} />
                  </span>

                  <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12 lg:py-20">
            <div
              aria-hidden
              className="absolute -top-20 -left-20 size-72 rounded-full bg-white/10 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -right-20 -bottom-24 size-80 rounded-full bg-black/10 blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Ready to Fix It Now?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Book a verified expert in under two minutes. Same-day slots are
                available — don&apos;t wait for small problems to get bigger.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="rounded-full"
                >
                  <a href="#services">
                    Browse Services
                    <ArrowRight />
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="rounded-full text-primary-foreground hover:bg-white/15 hover:text-primary-foreground"
                >
                  <Link href="/contact">
                    <Phone data-icon="inline-start" />
                    Contact Support
                  </Link>
                </Button>
              </div>

              <p className="mt-6 flex items-center justify-center gap-2 text-sm text-primary-foreground/70">
                <ShieldCheck className="size-4" />
                Backed by our 100% satisfaction guarantee
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
