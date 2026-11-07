"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Plus,
  Wrench,
  Clock,
  Banknote,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyServices } from "@/hooks";

export default function TechnicianServicesPage() {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, refetch, isFetching } = useGetMyServices({
    page,
    limit: 10,
  });

  // Assuming apiClient returns the complete response envelope.
  const result = data?.data;

  const services = result?.services ?? [];
  const pagination = result?.pagination;

  const totalServices = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;

  if (isPending) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-10 w-36" />
        </div>

        <Skeleton className="h-28 w-full rounded-xl" />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-52 rounded-xl" />
          ))}
        </div>
      </div>
    );a
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12">
          <Wrench className="h-10 w-10 text-muted-foreground" />

          <h2 className="text-lg font-semibold">Failed to load services</h2>

          <p className="text-sm text-muted-foreground">
            Something went wrong while fetching your services.
          </p>

          <Button onClick={() => refetch()} variant="outline">
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Services</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and track the services you offer.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/technician/services/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Service
          </Link>
        </Button>
      </div>

      {/* Total Services */}
      <Card>
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Wrench className="h-6 w-6 text-primary" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Total Services</p>

            <h2 className="text-2xl font-bold">{totalServices}</h2>
          </div>
        </CardContent>
      </Card>

      {/* Service List Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">All Services</h2>

        <p className="text-sm text-muted-foreground">
          {totalServices} services found
        </p>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Wrench className="h-8 w-8 text-muted-foreground" />
            </div>

            <h3 className="text-lg font-semibold">No services yet</h3>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              You haven't created any services yet. Create your first service to
              start receiving bookings.
            </p>

            <Button asChild className="mt-5">
              <Link href="/dashboard/technician/services/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Service
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Services Grid */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service: any) => (
              <Card
                key={service.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">{service.name}</h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {service.category?.name ?? "Uncategorized"}
                      </p>
                    </div>

                    <Badge variant={service.isActive ? "default" : "secondary"}>
                      {service.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <p className="line-clamp-2 min-h-10 text-sm text-muted-foreground">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 border-t pt-4">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-4 w-4 text-muted-foreground" />

                      <div>
                        <p className="text-xs text-muted-foreground">Price</p>

                        <p className="font-semibold">
                          ৳{Number(service.price).toLocaleString("en-BD")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Duration
                        </p>

                        <p className="font-semibold">{service.duration} min</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-t pt-3 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    {service._count?.bookings ?? 0} bookings
                  </div>

                  <div className="flex gap-2 border-t pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <Link
                        href={`/dashboard/technician/services/${service.id}/edit`}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1 || isFetching}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages || isFetching}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
