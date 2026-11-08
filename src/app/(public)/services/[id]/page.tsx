"use client";

import { use } from "react";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
  UserRound,
  Wrench,
  XCircle,
} from "lucide-react";
import { useGetMe, useGetServicesDetails } from "@/hooks";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

function formatPrice(value: string | number) {
  return Number(value).toLocaleString("en-BD");
}

function formatDay(day: string) {
  return day.charAt(0) + day.slice(1).toLowerCase();
}

function formatTime(time: string) {
  const [hourString, minute] = time.split(":");
  const hour = Number(hourString);
  const suffix = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;

  return `${formattedHour}:${minute} ${suffix}`;
}

export default function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { data: meResponse, isLoading: isAuthLoading } = useGetMe();
  const user = meResponse?.data;
  console.log(user);

  const { id } = use(params);

  const { data: response, isLoading, isError } = useGetServicesDetails(id);

  const service = response?.data;
  const technician = service?.technician;

  const technicianName =
    technician?.user?.name ?? technician?.userName ?? "Professional technician";

  const rating = technician?.avgRating;
  const address = technician?.user?.address;

  const dayOrder = [
    "SATURDAY",
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
  ];

  const weeklyAvailability = (technician?.availabilitySlots ?? [])
    .filter(
      (
        slot: { dayOfWeek: any; startTime: any; endTime: any },
        index: any,
        slots: any[],
      ) =>
        slots.findIndex(
          (item) =>
            item.dayOfWeek === slot.dayOfWeek &&
            item.startTime === slot.startTime &&
            item.endTime === slot.endTime,
        ) === index,
    )
    .sort(
      (a: { dayOfWeek: string }, b: { dayOfWeek: string }) =>
        dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek),
    );

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-24 text-center">
        <p className="text-muted-foreground">Loading service details...</p>
      </main>
    );
  }

  if (isError || !service) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to services
        </Link>

        <div className="py-20 text-center">
          <h1 className="text-3xl font-semibold">Service not found</h1>

          <p className="mt-3 text-muted-foreground">
            This service may no longer be available.
          </p>

          <Link
            href="/services"
            className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
          >
            Browse services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All services
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {service.category?.name ?? "General service"}
                </span>

                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  {technician?.isAvailable ? (
                    <>
                      <CheckCircle2 className="size-4 text-emerald-600" />
                      Technician available
                    </>
                  ) : (
                    <>
                      <XCircle className="size-4" />
                      Availability needs confirmation
                    </>
                  )}
                </span>
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                {service.name}
              </h1>

              <p className="mt-6 max-w-2xl whitespace-pre-line text-base leading-8 text-muted-foreground">
                {service.description ||
                  "Contact the professional to learn more about this service."}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="size-4" />
                  {service.duration} minutes
                </span>

                {rating != null && (
                  <span className="inline-flex items-center gap-2">
                    <Star className="size-4 fill-amber-500 text-amber-500" />
                    {Number(rating).toFixed(1)} rating
                  </span>
                )}

                {address && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4" />
                    {address}
                  </span>
                )}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border p-5">
                  <Clock3 className="size-5 text-primary" />

                  <p className="mt-4 text-sm text-muted-foreground">
                    Estimated duration
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    {service.duration} minutes
                  </p>
                </div>

                <div className="rounded-xl border border-border p-5">
                  <Wrench className="size-5 text-primary" />

                  <p className="mt-4 text-sm text-muted-foreground">
                    Service category
                  </p>

                  <p className="mt-1 text-lg font-semibold capitalize">
                    {service.category?.name ?? "General"}
                  </p>
                </div>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-8">
              <p className="text-sm text-muted-foreground">Service price</p>

              <p className="mt-2 text-4xl font-semibold tracking-tight">
                ৳{formatPrice(service.price)}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                For approximately {service.duration} minutes
              </p>

              <div className="my-6 border-t border-border" />

              <p className="mb-4 text-sm font-medium">Your service provider</p>

              <div className="flex items-center gap-3">
                {technician?.user?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={technician.user.image}
                    alt={technicianName}
                    className="size-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted">
                    <UserRound className="size-6 text-muted-foreground" />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate font-medium">{technicianName}</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {technician?.experienceYears ?? 0} years experience
                  </p>
                </div>
              </div>

              {address && (
                <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  {address}
                </p>
              )}

              {rating != null && (
                <p className="mt-3 flex items-center gap-2 text-sm">
                  <Star className="size-4 fill-amber-500 text-amber-500" />
                  {Number(rating).toFixed(1)} technician rating
                </p>
              )}
<Button
  type="button"
  disabled={!technician?.isAvailable || isAuthLoading}
  className="mt-6 inline-flex min-h-12 w-full"
  onClick={() => {
    if (!user) {
      router.push(
        `/login?callbackUrl=${encodeURIComponent(pathname)}`,
      );
      return;
    }

    router.push(`/services/${id}/booking`);
  }}
>
  Book this service
  <ArrowUpRight className="size-4" />
</Button>

              <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                Confirm the date and time with the technician before booking.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Professional profile
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Meet your technician
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              {technicianName} has {technician?.experienceYears ?? 0} years of
              experience and provides services in{" "}
              {address ?? "their service area"}.
            </p>

            <h3 className="mt-8 font-semibold">Skills and expertise</h3>

            {technician?.skills?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {technician.skills.map((skill: string, index: number) => (
                  <span
                    key={`${skill}-${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
index}`}
                    className="rounded-full border border-border px-3 py-2 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                No skills have been listed yet.
              </p>
            )}

            {technician?.hourlyRate != null && (
              <div className="mt-8 rounded-xl border border-border p-5">
                <p className="text-sm text-muted-foreground">
                  Technician hourly rate
                </p>

                <p className="mt-1 text-xl font-semibold">
                  ৳{formatPrice(technician.hourlyRate)} / hour
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  This is the technician&apos;s hourly rate. The service price
                  shown above is listed separately.
                </p>
              </div>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3">
              <CalendarDays className="size-5 text-primary" />

              <h2 className="text-lg font-semibold">Weekly availability</h2>
            </div>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Regular hours listed by the technician. Confirm the actual date
              before booking.
            </p>

            {weeklyAvailability.length > 0 ? (
              <div className="mt-5 divide-y divide-border">
                {weeklyAvailability.map(
                  (slot: {
                    dayOfWeek: string;
                    startTime: string;
                    endTime: string;
                  }) => (
                    <div
                      key={`${slot.dayOfWeek}-${slot.startTime}-${slot.endTime}`}
                      className="flex items-center justify-between gap-3 py-3 text-sm"
                    >
                      <span className="font-medium">
                        {formatDay(slot.dayOfWeek)}
                      </span>

                      <span className="text-right text-muted-foreground">
                        {formatTime(slot.startTime)} –{" "}
                        {formatTime(slot.endTime)}
                      </span>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <p className="mt-5 text-sm text-muted-foreground">
                No weekly availability has been provided.
              </p>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
