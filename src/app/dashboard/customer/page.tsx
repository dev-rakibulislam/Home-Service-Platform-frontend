"use client";

import Link from "next/link";
import {
  CalendarDays,
  ChevronRight,
  ClipboardList,
  UserRound,
  Wrench,
} from "lucide-react";

import { useGetMyRecentBookings } from "@/hooks";
import { Loading } from "@/components/shared/loading";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CustomerOverview() {
  const { data, isLoading } = useGetMyRecentBookings();

  if (isLoading) {
    return <Loading />;
  }

  const bookings = data?.data ?? [];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Overview
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage your bookings and services from here.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Recent Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Recent Bookings</CardTitle>

              <CardDescription>
                Your latest service bookings.
              </CardDescription>
            </div>

            <Button variant="ghost" asChild>
              <Link href="/dashboard/customer/bookings">
                View all
                <ChevronRight className="ml-1 size-4" />
              </Link>
            </Button>
          </CardHeader>

          <CardContent>
            {bookings.length === 0 ? (
              <div className="flex min-h-40 flex-col items-center justify-center text-center">
                <ClipboardList className="mb-3 size-8 text-muted-foreground" />

                <p className="font-medium">
                  No bookings yet
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Book a service to see your bookings here.
                </p>

                <Button className="mt-4" asChild>
                  <Link href="/services">
                    Book a Service
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y">
                {bookings.map((booking: any) => (
                  <div
                    key={booking.id}
                    className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">
                          {booking.service?.name}
                        </h3>

                        <BookingStatus status={booking.status} />
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <UserRound className="size-3.5" />
                          {booking.technician?.name ?? "Not assigned"}
                        </span>

                        <span className="flex items-center gap-1">
                          <CalendarDays className="size-3.5" />
                          {formatDate(booking.bookingDate)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <span className="font-semibold">
                        ৳{Number(booking?.service?.price).toLocaleString()}
                      </span>

                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link
                          href={`/dashboard/customer/bookings/${booking.id}`}
                        >
                          Details
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>

            <CardDescription>
              Common actions for your account.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <QuickAction
              href="/services"
              icon={<Wrench className="size-5" />}
              title="Book a Service"
              description="Find and book a service"
            />

            <QuickAction
              href="/dashboard/customer/bookings"
              icon={<ClipboardList className="size-5" />}
              title="My Bookings"
              description="View all your bookings"
            />

            <QuickAction
              href="/dashboard/customer/profile"
              icon={<UserRound className="size-5" />}
              title="My Profile"
              description="View your account information"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </div>

      <ChevronRight className="size-4 text-muted-foreground" />
    </Link>
  );
}

function BookingStatus({
  status,
}: {
  status: string;
}) {
  const variant =
    status === "COMPLETED"
      ? "default"
      : status === "CANCELLED"
        ? "destructive"
        : "secondary";

  return (
    <Badge variant={variant}>
      {status}
    </Badge>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
