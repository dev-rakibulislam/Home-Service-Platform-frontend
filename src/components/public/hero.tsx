import { ArrowRight, CircleCheck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
        {/* Content */}
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center rounded-full border bg-muted px-4 py-2 text-sm font-medium">
            🛠️ Trusted home services, made simple
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Your Home Deserves
            <span className="text-primary"> The Best Care</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Find trusted professionals for all your home service needs. Book
            reliable technicians, choose your preferred time, and get the job
            done with confidence.
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

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CircleCheck className="size-4 text-primary" />
              Verified Technicians
            </div>

            <div className="flex items-center gap-2">
              <CircleCheck className="size-4 text-primary" />
              Easy Booking
            </div>

            <div className="flex items-center gap-2">
              <CircleCheck className="size-4 text-primary" />
              Secure Payment
            </div>
          </div>
        </div>

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

          {/* Floating card */}
          <div className="absolute bottom-4 left-4 rounded-xl border bg-background/95 p-4 shadow-lg backdrop-blur sm:bottom-6 sm:left-6">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <ShieldCheck className="size-5 text-primary" />
              </div>

              <div>
                <p className="text-sm font-semibold">Trusted Professionals</p>
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
