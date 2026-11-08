
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Package,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ClipboardList,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Loading } from "@/components/shared/loading";
import { BookingStatus } from "@/api";
import { CustomerBooking } from "@/api/booking.api";
import { useGetCustomerBookings } from "@/hooks";

const LIMIT = 10;

const FILTERS = [
  "ALL",
  "PENDING",
  "ACCEPTED",
  "IN_PROGRESS",
  "COMPLETED",
  "REJECTED",
  "CANCELLED",
] as const;

type FilterStatus = (typeof FILTERS)[number];

const STATUS_STYLES: Record<BookingStatus, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  ACCEPTED: "bg-blue-100 text-blue-700",
  REJECTED: "bg-red-100 text-red-700",
  IN_PROGRESS: "bg-violet-100 text-violet-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-gray-100 text-gray-700",
};

function formatStatus(status: string) {
  return status.replaceAll("_", " ");
}

function formatDate(date: string) {
  const value = new Date(date);

  return value.toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(time?: string) {
  if (!time) return "Time not specified";

  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getPrice(booking: CustomerBooking) {
  const price = booking.totalPrice ?? booking.service?.price ?? 0;

  return Number(price).toLocaleString("en-BD");
}

function BookingCard({
  booking,
}: {
  booking: CustomerBooking;
}) {
  const technicianName =
    booking.technician?.user?.name ??
    booking.technician?.userName ??
    "Not assigned";

  return (
    <article className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Booking ID: {booking.id.slice(0, 8)}
            </span>

            <span
  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
    STATUS_STYLES[booking.status] ??
    "bg-gray-100 text-gray-700"
  }`}
>
  {formatStatus(booking.status)}
</span>
          </div>

          <h3 className="text-lg font-semibold">
            {booking.service?.name ?? "Service"}
          </h3>

          {booking.service?.category?.name && (
            <p className="text-sm text-muted-foreground">
              {booking.service.category.name}
            </p>
          )}
        </div>

        <div className="shrink-0">
          <p className="text-xs text-muted-foreground">
            Service Price
          </p>
          <p className="text-xl font-bold">
            ৳{getPrice(booking)}
          </p>
        </div>
      </div>

      <div className="my-4 border-t" />

      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="size-4 shrink-0" />
          <span>{formatDate(booking.bookingDate)}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock3 className="size-4 shrink-0" />
          <span>{formatTime(booking.bookingTime)}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Package className="size-4 shrink-0" />
          <span>{booking.service?.duration ?? 0} minutes</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="size-4 shrink-0" />
          <span className="truncate">
            {technicianName}
          </span>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <Link
            href={`/dashboard/customer/bookings/${booking.id}`}
          >
            View Details
            <ArrowUpRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

export default function CustomerBookingsPage() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<FilterStatus>("ALL");

  const {
    data: response,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetCustomerBookings(page, LIMIT);

  const bookings = response?.data ?? [];
  const metaData = response?.metaData;

  const filteredBookings =
    filter === "ALL"
      ? bookings
      : bookings.filter(
          (booking) => booking.status === filter,
        );

  const total = metaData?.total ?? bookings.length;
  const totalPages = metaData?.totalPages ?? 1;

  const statusCounts = bookings.reduce(
    (counts, booking) => {
      counts[booking.status] =
        (counts[booking.status] ?? 0) + 1;

      return counts;
    },
    {} as Partial<Record<BookingStatus, number>>,
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <main className="space-y-4 p-4 sm:p-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>

        <div className="rounded-xl border p-8 text-center">
          <p className="text-muted-foreground">
            Failed to load your bookings.
          </p>

          <Button
            onClick={() => refetch()}
            className="mt-4"
          >
            <RefreshCw className="mr-2 size-4" />
            Try Again
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">
            My Bookings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and track all your service bookings.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={`mr-2 size-4 ${
              isFetching ? "animate-spin" : ""
            }`}
          />
          Refresh
        </Button>
      </div>

      {/* Booking statistics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">
            Total Bookings
          </p>
          <p className="mt-2 text-2xl font-bold">{total}</p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">
            Pending
          </p>
          <p className="mt-2 text-2xl font-bold text-amber-600">
            {statusCounts.PENDING ?? 0}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">
            Accepted
          </p>
          <p className="mt-2 text-2xl font-bold text-blue-600">
            {statusCounts.ACCEPTED ?? 0}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">
            Completed
          </p>
          <p className="mt-2 text-2xl font-bold text-green-600">
            {statusCounts.COMPLETED ?? 0}
          </p>
        </div>
      </div>

      {/* Filters */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold">Booking History</h2>

          <span className="text-sm text-muted-foreground">
            {filteredBookings.length} shown
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                filter === item
                  ? "border-primary bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {item === "ALL"
                ? `All (${total})`
                : `${formatStatus(item)} (${statusCounts[item as BookingStatus] ?? 0})`}
            </button>
          ))}
        </div>

        {/* Booking list */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed px-4 py-12 text-center">
            <ClipboardList className="mx-auto size-10 text-muted-foreground" />

            <h3 className="mt-4 font-semibold">
              No bookings found
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {filter === "ALL"
                ? "You haven't booked any services yet."
                : `You don't have any ${formatStatus(filter).toLowerCase()} bookings.`}
            </p>

            {filter === "ALL" && (
              <Button asChild className="mt-5">
                <Link href="/services">
                  Explore Services
                </Link>
              </Button>
            )}
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-5">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((current) => current - 1)}
            >
              <ChevronLeft className="mr-1 size-4" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages || isFetching}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
