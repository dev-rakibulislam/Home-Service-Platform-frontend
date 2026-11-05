"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  Phone,
  Wrench,
  RefreshCw,
  ClipboardList,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingStatus, TechnicianBooking } from "@/api";
import { useGetMyBookings, useUpdateMyBooking } from "@/hooks";

const filters = [
  "ALL",
  "PENDING",
  "ACCEPTED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const;

type FilterStatus = (typeof filters)[number];

const statusVariant: Record<
  BookingStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  PENDING: "secondary",
  ACCEPTED: "default",
  IN_PROGRESS: "default",
  COMPLETED: "outline",
  CANCELLED: "destructive",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString("en-BD", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatPrice(price: string) {
  return Number(price).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="mt-2 text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <span className="break-words">{children}</span>
    </div>
  );
}

function BookingCard({
  booking,
  isUpdating,
  onAccept,
  onReject,
}: {
  booking: TechnicianBooking;
  isUpdating: boolean;
  onAccept: () => void;
  onReject: () => void;
}) {
  const customer = booking.customer;
  const service = booking.service;

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3 space-y-0">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wrench className="size-5 text-muted-foreground" />
            {service.name}
          </CardTitle>

          <p className="text-xs text-muted-foreground">
            Booking ID: {booking.id}
          </p>
        </div>

        <Badge variant={statusVariant[booking.status]}>
          {booking.status.replace("_", " ")}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Service details */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Service Details</h3>

          <p className="text-sm text-muted-foreground">{service.description}</p>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="font-semibold">৳{formatPrice(service.price)}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-semibold">{service.duration} minutes</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Service status</p>
              <Badge variant={service.isActive ? "outline" : "secondary"}>
                {service.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Booking date */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Booking Schedule</h3>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoItem icon={CalendarDays}>
              {formatDate(booking.bookingDate)}
            </InfoItem>

            <InfoItem icon={Clock}>{formatTime(booking.bookingDate)}</InfoItem>
          </div>
        </div>

        <Separator />

        {/* Customer details */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Customer Information</h3>

          <div className="flex items-center gap-3">
            <Avatar className="size-11">
              <AvatarImage
                src={customer.image ?? undefined}
                alt={customer.name}
              />
              <AvatarFallback>
                {customer.name?.charAt(0)?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="font-medium">{customer.name}</p>
              <p className="text-xs text-muted-foreground">Customer</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <InfoItem icon={Mail}>{customer.email}</InfoItem>

            <InfoItem icon={Phone}>
              {customer.phoneNumber ?? "Phone not provided"}
            </InfoItem>

            <InfoItem icon={MapPin}>
              {customer.address ?? "Address not provided"}
            </InfoItem>
          </div>
        </div>

        {/* Actions */}
        {booking.status === "PENDING" && (
          <>
            <Separator />

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={onReject}
                disabled={isUpdating}
              >
                Reject
              </Button>

              <Button onClick={onAccept} disabled={isUpdating}>
                Accept Booking
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function TechnicianBookingsPage() {
  const [filter, setFilter] = useState<FilterStatus>("ALL");

  const { data, isLoading, isError, refetch, isFetching } = useGetMyBookings();

  const updateMutation = useUpdateMyBooking();

  const response = data as
    | { success: boolean; data: TechnicianBooking[] }
    | undefined;

  const bookings = response?.data ?? [];

  const filteredBookings = useMemo(() => {
    if (filter === "ALL") return bookings;

    return bookings.filter((booking) => booking.status === filter);
  }, [bookings, filter]);

  const counts = useMemo(() => {
    return {
      ALL: bookings.length,
      PENDING: bookings.filter((b) => b.status === "PENDING").length,
      ACCEPTED: bookings.filter((b) => b.status === "ACCEPTED").length,
      IN_PROGRESS: bookings.filter((b) => b.status === "IN_PROGRESS").length,
      COMPLETED: bookings.filter((b) => b.status === "COMPLETED").length,
      CANCELLED: bookings.filter((b) => b.status === "CANCELLED").length,
    };
  }, [bookings]);

  function handleUpdate(id: string, status: BookingStatus) {
    const action = status === "ACCEPTED" ? "accept" : "cancel";

    if (!window.confirm(`Are you sure you want to ${action} this booking?`)) {
      return;
    }

    updateMutation.mutate({
      id,
      payload: { status },
    });
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-24" />
          ))}
        </div>

        <Skeleton className="h-12 w-full" />

        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-72 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-12">
          <p className="text-sm text-muted-foreground">
            Failed to load bookings.
          </p>

          <Button onClick={() => refetch()}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Bookings</h1>

          <p className="text-sm text-muted-foreground">
            Manage your service bookings and customer requests.
          </p>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard title="Total" value={counts.ALL} />
        <StatCard title="Pending" value={counts.PENDING} />
        <StatCard title="Accepted" value={counts.ACCEPTED} />
        <StatCard title="In Progress" value={counts.IN_PROGRESS} />
        <StatCard title="Completed" value={counts.COMPLETED} />
      </div>

      {/* Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Booking List</h2>
          <p className="text-sm text-muted-foreground">
            {filteredBookings.length} bookings found
          </p>
        </div>

        <Select
          value={filter}
          onValueChange={(value) => setFilter(value as FilterStatus)}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter bookings" />
          </SelectTrigger>

          <SelectContent>
            {filters.map((item) => (
              <SelectItem key={item} value={item}>
                {item === "ALL" ? "All Bookings" : item.replace("_", " ")} (
                {counts[item]})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Update error */}
      {updateMutation.isError && (
        <Card>
          <CardContent className="pt-6 text-sm text-destructive">
            {updateMutation.error instanceof Error
              ? updateMutation.error.message
              : "Failed to update booking."}
          </CardContent>
        </Card>
      )}

      {/* Booking list */}
      {filteredBookings.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <ClipboardList className="mb-4 size-10 text-muted-foreground" />

            <h3 className="font-semibold">No bookings found</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {filter === "ALL"
                ? "You haven't received any bookings yet."
                : `No ${filter.toLowerCase().replace("_", " ")} bookings found.`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              isUpdating={
                updateMutation.isPending &&
                updateMutation.variables?.id === booking.id
              }
              onAccept={() => handleUpdate(booking.id, "ACCEPTED")}
              onReject={() => handleUpdate(booking.id, "CANCELLED")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
