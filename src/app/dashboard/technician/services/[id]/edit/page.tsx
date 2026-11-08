"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  useGetCategory,
  useGetServicesDetails,
  useUpdateService,
} from "@/hooks";

type Category = {
  id: string;
  name: string;
};

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();

  const serviceId = params.id as string;

  const {
    data: serviceResponse,
    isPending: serviceLoading,
    isError: serviceError,
  } = useGetServicesDetails(serviceId);

  const { data: categoryResponse, isPending: categoryLoading } =
    useGetCategory();

  const {
    mutate: updateService,
    isPending: isUpdating,
    isError: updateError,
    error,
  } = useUpdateService();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const categories: Category[] = categoryResponse?.data ?? [];

  /**
   * ServiceDetails response:
   *
   * {
   *   success: true,
   *   data: {
   *     id: "...",
   *     name: "...",
   *     description: "...",
   *     price: "1200.45",
   *     duration: 60,
   *     categoryId: "...",
   *     ...
   *   }
   * }
   */
  const service = serviceResponse?.data;

  useEffect(() => {
    if (!service) return;

    setName(service.name ?? "");
    setDescription(service.description ?? "");
    setPrice(String(service.price ?? ""));
    setDuration(String(service.duration ?? ""));
    setCategoryId(service.categoryId ?? "");
  }, [service]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Service name is required.");
      return;
    }

    if (!description.trim()) {
      alert("Description is required.");
      return;
    }

    if (!categoryId) {
      alert("Please select a category.");
      return;
    }

    if (!price || Number(price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (!duration || Number(duration) <= 0) {
      alert("Please enter a valid duration.");
      return;
    }

    updateService(
      {
        id: serviceId,
        payload: {
          name: name.trim(),
          description: description.trim(),
          price: Number(price),
          duration: Number(duration),
          categoryId,
        },
      },
      {
        onSuccess: () => {
          router.push("/dashboard/technician/services");
        },
      },
    );
  };

  if (serviceLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Card>
          <CardContent className="space-y-5 p-6">
            <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded bg-muted" />
            <div className="h-24 w-full animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded bg-muted" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (serviceError || !service) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Card>
          <CardContent className="flex min-h-60 items-center justify-center p-6">
            <div className="text-center">
              <h2 className="font-semibold">Service not found</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                The service could not be loaded.
              </p>

              <Button asChild className="mt-5">
                <Link href="/dashboard/technician/services">
                  Back to Services
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="-ml-3">
          <Link href="/dashboard/technician/service">
            <ArrowLeft className="mr-2 size-4" />
            Back to Services
          </Link>
        </Button>

        <div className="mt-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Edit Service
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Update the details of your service.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Information</CardTitle>

          <CardDescription>
            Update the information customers will see.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>

              <Input
                id="name"
                placeholder="e.g. AC Repair"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isUpdating}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>

              <Textarea
                id="description"
                placeholder="Describe the service you provide..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                disabled={isUpdating}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>

              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                disabled={categoryLoading || isUpdating}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">
                  {categoryLoading
                    ? "Loading categories..."
                    : "Select a category"}
                </option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price + Duration */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>

                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="1200.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={isUpdating}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>

                <Input
                  id="duration"
                  type="number"
                  min="1"
                  placeholder="60"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  disabled={isUpdating}
                />

                <p className="text-xs text-muted-foreground">
                  Duration in minutes
                </p>
              </div>
            </div>

            {/* Error */}
            {updateError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                {error instanceof Error
                  ? error.message
                  : "Failed to update service. Please try again."}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t pt-6">
              <Button
                type="button"
                variant="outline"
                asChild
                disabled={isUpdating}
              >
                <Link href="/dashboard/technician/services">Cancel</Link>
              </Button>

              <Button type="submit" disabled={isUpdating || categoryLoading}>
                {isUpdating && <Loader2 className="mr-2 size-4 animate-spin" />}

                {isUpdating ? "Updating..." : "Update Service"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
