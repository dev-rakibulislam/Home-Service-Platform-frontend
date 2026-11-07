"use client";

import Link from "next/link";
import { Clock, Edit, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetMyServices } from "@/hooks";

type Service = {
  id: string;
  name: string;
  description: string;
  price: number | string;
  duration: number;
  isActive: boolean;
};

export default function ServicesPage() {
  const {
    data,
    isPending: isLoading,
    isError,
    refetch,
  } = useGetMyServices({
    page: 1,
    limit: 10,
  });

  // API response: { data: { services: [], pagination: {} } }
  const services: Service[] = data?.data?.services ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My Services</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage the services you offer to customers.
          </p>
        </div>

        <Button asChild>
          <Link href="/dashboard/technician/services/create">
            <Plus className="mr-2 size-4" />
            Create Service
          </Link>
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
                  <div className="h-10 w-full animate-pulse rounded bg-muted" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error */}
      {!isLoading && isError && (
        <Card>
          <CardContent className="flex min-h-40 items-center justify-center p-6">
            <div className="text-center">
              <p className="font-medium">Failed to load services</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Please try again later.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => refetch()}
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty */}
      {!isLoading && !isError && services.length === 0 && (
        <Card>
          <CardContent className="flex min-h-80 items-center justify-center p-6">
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
                <Plus className="size-5" />
              </div>

              <h2 className="text-lg font-semibold">No services yet</h2>

              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Create your first service so customers can discover and book it.
              </p>

              <Button asChild className="mt-5">
                <Link href="/dashboard/technician/services/create">
                  Create Your First Service
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services */}
      {!isLoading && !isError && services.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="flex h-full flex-col">
              <CardContent className="flex flex-1 flex-col p-6">
                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">{service.name}</h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  <Badge variant={service.isActive ? "default" : "secondary"}>
                    {service.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                {/* Info */}
                <div className="mt-6 flex items-center justify-between border-y py-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="mt-1 text-lg font-semibold">
                      ৳{Number(service.price).toFixed(2)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Duration</p>

                    <p className="mt-1 flex items-center gap-1 text-sm font-medium">
                      <Clock className="size-4" />
                      {service.duration} min
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-2 pt-5">
                  <Button asChild variant="outline" className="flex-1">
                    <Link
                      href={`/dashboard/technician/services/${service.id}/edit`}
                    >
                      <Edit className="mr-2 size-4" />
                      Edit
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    disabled
                    title="Delete functionality not implemented"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
