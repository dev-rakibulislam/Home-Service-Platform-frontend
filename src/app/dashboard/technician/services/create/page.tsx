"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

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

import { useCreateService, useGetCategory } from "@/hooks";

export default function CreateServicePage() {
  const router = useRouter();

  const { data: categoryResponse, isPending: categoryLoading } =
    useGetCategory();

  const {
    mutate: createService,
    isPending: isCreating,
    isError,
    error,
  } = useCreateService();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const categories = categoryResponse?.data ?? [];

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

    if (!price || Number(price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (!duration || Number(duration) <= 0) {
      alert("Please enter a valid duration.");
      return;
    }

    if (!categoryId) {
      alert("Please select a category.");
      return;
    }

    createService(
      {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        duration: Number(duration),
        categoryId,
      },
      {
        onSuccess: () => {
          router.push("/dashboard/technician/services");
          router.refresh();
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="-ml-3">
          <Link href="/dashboard/technician/services">
            <ArrowLeft className="mr-2 size-4" />
            Back to Services
          </Link>
        </Button>

        <div className="mt-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create Service
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Add a service that customers can discover and book.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Information</CardTitle>

          <CardDescription>
            Provide the details of the service you offer.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Service Name</Label>

              <Input
                id="name"
                placeholder="e.g. AC Repair"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>

              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                disabled={categoryLoading || isCreating}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">
                  {categoryLoading
                    ? "Loading categories..."
                    : "Select a category"}
                </option>

                {categories.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price + Duration */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Price */}
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
                />
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>

                <Input
                  id="duration"
                  type="number"
                  min="1"
                  placeholder="60"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />

                <p className="text-xs text-muted-foreground">
                  Duration in minutes
                </p>
              </div>
            </div>

            {/* API Error */}
            {isError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                {error instanceof Error
                  ? error.message
                  : "Failed to create service. Please try again."}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t pt-6">
              <Button
                type="button"
                variant="outline"
                asChild
                disabled={isCreating}
              >
                <Link href="/dashboard/technician/service">Cancel</Link>
              </Button>

              <Button type="submit" disabled={isCreating || categoryLoading}>
                {isCreating && <Loader2 className="mr-2 size-4 animate-spin" />}

                {isCreating ? "Creating..." : "Create Service"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
