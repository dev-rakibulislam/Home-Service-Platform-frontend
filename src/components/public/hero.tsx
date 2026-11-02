import {
  ArrowRight,
  CircleCheck,
  Phone,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Zap,
  Star,
  BadgeCheck,
  ArrowDownRight,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {

    return (
      <section className="relative isolate overflow-hidden bg-[#f2f8fa]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_12%,rgba(14,165,190,0.13),transparent_36%),radial-gradient(ellipse_at_5%_95%,rgba(34,197,160,0.1),transparent_34%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.04fr_0.96fr] lg:px-8 lg:py-24">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-sm font-medium text-teal-900 shadow-sm">
              <Sparkles className="size-4 text-teal-600" />
              Home care, made easy
            </div>
            <h1 className="mt-6 max-w-2xl text-5xl leading-[1.08] font-semibold tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-[4.4rem]">
              A better home starts with the{" "}
              <span className="text-teal-700">right hands.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              From a leaky tap to a cooler afternoon, find a skilled local
              professional and book a time that works for you.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4 text-teal-700" /> Trusted
                professionals
              </span>
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="size-4 text-teal-700" /> Clear upfront
                pricing
              </span>
            </div>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-teal-700"
            >
              Explore all services <ArrowDownRight className="size-4" />
            </Link>
          </div>

          <div className="relative mx-auto hidden w-full max-w-xl md:block xl:ml-auto">
            {" "}
            <div
              className="absolute -inset-4 rotate-2 rounded-[2.5rem] bg-teal-200/50"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] bg-slate-200 shadow-2xl shadow-slate-900/15">
              <Image
                src="/hero-image.webp"
                alt="A home service professional ready to help"
                width={900}
                height={760}
                priority
                className="aspect-[1.08/1] h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent p-6 pt-24 text-white sm:p-8 sm:pt-28">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/75">
                      Your home, in good hands
                    </p>
                    <p className="mt-1 text-2xl font-semibold">
                      Help is closer than you think.
                    </p>
                  </div>
                  <div className="hidden rounded-2xl border border-white/20 bg-white/15 p-3 backdrop-blur sm:block">
                    <Wrench className="size-6" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-left-8">
              <span className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Star className="size-5 fill-current" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900">
                  Quality you can count on
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  Real pros. Real homes.
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
