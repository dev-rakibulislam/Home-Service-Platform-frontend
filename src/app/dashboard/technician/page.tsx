"use client";

import Link from "next/link";
import {
  CalendarDays,
  ClipboardList,
  Clock,
  CheckCircle2,

  ArrowRight,
  CalendarClock,
  Wrench,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingStatus, TechnicianBooking } from "@/api";
import { useGetMyBookings } from "@/hooks";

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

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const statsConfig = [
  {
    label: "Total Bookings",
    key: "total",
    icon: ClipboardList,
  },
  {
    label: "Pending",
    key: "pending",
    icon: Clock,
  },
  {
    label: "Accepted",
    key: "accepted",
    icon: CheckCircle2,
  },
  {
    label: "In Progress",
    key: "inProgress",
    icon: Wrench,
  },
  {
    label: "Completed",
    key: "completed",
    icon: CalendarDays,
  },
] as const;

export default function TechnicianDashboardPage() {
  const { data, isLoading, isError, refetch } = useGetMyBookings();

  const bookings: TechnicianBooking[] = data?.data ?? [];

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "PENDING").length,
    accepted: bookings.filter((b) => b.status === "ACCEPTED").length,
    inProgress: bookings.filter((b) => b.status === "IN_PROGRESS").length,
    completed: bookings.filter((b) => b.status === "COMPLETED").length,
  };

  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-56" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-28" />
          ))}
        </div>

        <Skeleton className="h-72" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-10">
          <p>Failed to load dashboard data.</p>
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Technician Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Overview of your bookings and activities.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/technician/bookings">
            View All Bookings
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statsConfig.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.key}>
              <CardContent className="flex items-center justify-between p-5">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold">
                    {stats[item.key]}
                  </p>
                </div>

                <div className="rounded-md bg-muted p-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Quick Actions</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="flex items-center justify-between gap-4 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-muted p-3">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Manage Bookings</p>
                  <p className="text-sm text-muted-foreground">
                    View and manage customer bookings.
                  </p>
                </div>
              </div>

              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/technician/bookings">
                  Open
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between gap-4 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-muted p-3">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Manage Availability</p>
                  <p className="text-sm text-muted-foreground">
                    Manage your available time slots.
                  </p>
                </div>
              </div>

              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/technician/availability">
                  Open
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Bookings */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Recent Bookings</h2>
            <p className="text-sm text-muted-foreground">
              Your latest customer bookings.
            </p>
          </div>

          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/technician/bookings">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            {recentBookings.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-12 text-center">
                <ClipboardList className="h-10 w-10 text-muted-foreground" />
                <p className="font-medium">No bookings yet</p>
                <p className="text-sm text-muted-foreground">
                  Your bookings will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {recentBookings.map((booking, index) => (
                  <div
                    key={`${booking.id}-${index}`}
                    className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">
                        {booking.service.name}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {booking.customer.name}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span>{formatDate(booking.bookingDate)}</span>
                        <span>•</span>
                        <span>
                          ৳{Number(booking.service.price).toLocaleString("en-BD")}
                        </span>
                      </div>
                    </div>

                    <Badge variant={statusVariant[booking.status]}>
                      {booking.status.replace("_", " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
