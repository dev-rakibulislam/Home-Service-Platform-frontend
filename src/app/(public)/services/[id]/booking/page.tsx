"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock3,
  MapPin,
  Star,
  UserRound,
} from "lucide-react";

import { useGetMe, useGetServicesDetails } from "@/hooks";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/shared/loading";
import BookingForm from "@/components/bookings/booking-form";

type BookingPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function BookingPage({
  params,
}: BookingPageProps) {
  const { id } = use(params);

  const router = useRouter();

  const {
    data: meResponse,
    isLoading: isAuthLoading,
  } = useGetMe();

  const user = meResponse?.data;

  const {
    data: response,
    isLoading,
    isError,
  } = useGetServicesDetails(id);

  const service = response?.data;
  const technician = service?.technician;

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.replace(
        `/login?callbackUrl=${encodeURIComponent(
          `/services/${id}/booking`,
        )}`,
      );
    }
  }, [isAuthLoading, user, router, id]);

  if (isAuthLoading || isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Loading />;
  }

  if (isError || !service) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-xl space-y-4 text-center">
          <h1 className="text-2xl font-semibold">
            Service not found
          </h1>

          <p className="text-muted-foreground">
            Unable to load this service. Please try again.
          </p>

          <Button asChild>
            <Link href={`/services/${id}`}>
              Back to Service
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  if (!technician?.isAvailable) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-xl space-y-4 text-center">
          <h1 className="text-2xl font-semibold">
            Technician Unavailable
          </h1>

          <p className="text-muted-foreground">
            This technician is currently unavailable for bookings.
          </p>

          <Button asChild>
            <Link href={`/services/${id}`}>
              Back to Service
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  const technicianName =
    technician.user?.name ??
    technician.userName ??
    "Professional Technician";

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="-ml-3"
        >
          <Link href={`/services/${id}`}>
            <ArrowLeft className="mr-2 size-4" />
            Back to Service
          </Link>
        </Button>

        <div className="mt-5">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Book Your Service
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Select your preferred date and available time.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Booking form */}
        <div>
          <BookingForm
            serviceId={service.id}
            duration={service.duration}
            availabilitySlots={
              technician.availabilitySlots ?? []
            }
          />
        </div>

        {/* Service and technician details */}
        <aside className="space-y-5">
          <section className="space-y-4 rounded-xl border p-5">
            <h2 className="font-semibold">
              Service Summary
            </h2>

            <div>
              <p className="text-lg font-semibold">
                {service.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {service.category?.name}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Service Price
              </span>

              <span className="text-lg font-bold">
                ৳{Number(service.price).toLocaleString("en-BD")}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock3 className="size-4" />
              {service.duration} minutes
            </div>

            {service.description && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            )}
          </section>

          <section className="space-y-4 rounded-xl border p-5">
            <h2 className="font-semibold">
              Your Technician
            </h2>

            <div className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted">
                <UserRound className="size-6" />
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium">
                  {technicianName}
                </p>

                <p className="text-xs text-muted-foreground">
                  @{technician.userName}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Star className="size-4" />
                Rating
              </span>

              <span className="font-medium">
                {technician.avgRating ?? "N/A"}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Experience
              </span>

              <span className="font-medium">
                {technician.experienceYears ?? 0} years
              </span>
            </div>

            {technician.user?.address && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0" />

                <span>{technician.user.address}</span>
              </div>
            )}
          </section>
        </aside>
      </div>
    </main>
  );
}
