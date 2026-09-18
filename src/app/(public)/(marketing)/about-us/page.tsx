"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import siteDetails from "@/config/publicSiteData";

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              About {siteDetails.name}
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Making Home Services
              <span className="text-primary"> Simple & Reliable</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {siteDetails.name} connects homeowners with trusted professionals, making it
              easier to find the right technician and get your home projects
              done with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src="/about.webp"
              alt="FixItNow home services"
              width={700}
              height={550}
              className="h-auto w-full object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Our Story
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your home, our priority
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              Finding a reliable home service professional should not be
              difficult. FixItNow was created to make that process simple,
              transparent, and convenient.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              From plumbing and electrical work to cleaning and home
              maintenance, our platform helps customers discover skilled
              technicians and book services that fit their needs.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Trusted and skilled professionals",
                "Simple and convenient booking",
                "Flexible service scheduling",
                "Secure and reliable experience",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why FixItNow */}
      <section className="bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Why FixItNow
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need in one place
            </h2>

            <p className="mt-4 text-muted-foreground">
              We make finding and booking home services easier for everyone.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border bg-background p-6">
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <ShieldCheck className="size-6 text-primary" />
              </div>

              <h3 className="text-xl font-semibold">Trusted Professionals</h3>

              <p className="mt-3 leading-6 text-muted-foreground">
                Connect with skilled technicians who are ready to help with your
                home service needs.
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-6">
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <Wrench className="size-6 text-primary" />
              </div>

              <h3 className="text-xl font-semibold">Quality Services</h3>

              <p className="mt-3 leading-6 text-muted-foreground">
                Discover a wide range of services designed to keep your home
                comfortable and well maintained.
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-6">
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <Users className="size-6 text-primary" />
              </div>

              <h3 className="text-xl font-semibold">Customer Focused</h3>

              <p className="mt-3 leading-6 text-muted-foreground">
                From booking to completion, we focus on making your experience
                simple and hassle-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section>
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-24">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Our Mission
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Better services. Happier homes.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Our mission is to build a trusted platform where customers can
            easily find reliable home service professionals and technicians can
            grow their businesses by connecting with more customers.
          </p>

          <Button asChild size="lg" className="mt-8">
            <Link href="/services">
              Explore Our Services
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
