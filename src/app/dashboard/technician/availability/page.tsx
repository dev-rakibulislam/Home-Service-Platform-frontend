"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Trash2, CalendarDays, Clock } from "lucide-react";

import {
  useCreateAvailability,
  useDeleteAvailability,
  useGetMyAvailability,
} from "@/hooks";

import { Loading } from "@/components/shared/loading";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const DAYS = [
  { label: "Monday", value: "MONDAY" },
  { label: "Tuesday", value: "TUESDAY" },
  { label: "Wednesday", value: "WEDNESDAY" },
  { label: "Thursday", value: "THURSDAY" },
  { label: "Friday", value: "FRIDAY" },
  { label: "Saturday", value: "SATURDAY" },
  { label: "Sunday", value: "SUNDAY" },
] as const;

type DayOfWeek = (typeof DAYS)[number]["value"];

const DAY_ORDER: Record<DayOfWeek, number> = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
};

export default function AvailabilityPage() {
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>("MONDAY");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const {
    data: availabilityResponse,
    isLoading,
    isError,
    refetch,
  } = useGetMyAvailability();

  const createMutation = useCreateAvailability();
  const deleteMutation = useDeleteAvailability();

  const slots = (availabilityResponse?.data ?? []) as {
    id: string;
    dayOfWeek: DayOfWeek;
    startTime: string;
    endTime: string;
  }[];

  const sortedSlots = [...slots].sort((a, b) => {
    const dayDifference = DAY_ORDER[a.dayOfWeek] - DAY_ORDER[b.dayOfWeek];

    if (dayDifference !== 0) return dayDifference;

    return a.startTime.localeCompare(b.startTime);
  });

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (startTime >= endTime) {
      toast.error("End time must be greater than start time.");
      return;
    }

    createMutation.mutate(
      {
        dayOfWeek,
        startTime,
        endTime,
      },
      {
        onSuccess: () => {
          toast.success("Availability created successfully.");
          setStartTime("09:00");
          setEndTime("17:00");
        },
        onError: (error) => {
          toast.error(
            error instanceof Error
              ? error?.data?.message
              : "Failed to create availability."
          );
        },
      },
    );
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this availability slot?",
    );

    if (!confirmed) return;

    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Availability deleted successfully.");
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to delete availability.",
        );
      },
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Availability</h1>
        <p className="text-sm text-muted-foreground">
          Manage your weekly working hours and availability slots.
        </p>
      </div>

      {/* Create Availability */}
      <Card>
        <CardHeader>
          <CardTitle>Add Availability</CardTitle>
          <CardDescription>
            Set the days and time slots when customers can book your services.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleCreate} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dayOfWeek">Day of Week</Label>

              <select
                id="dayOfWeek"
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value as DayOfWeek)}
                disabled={createMutation.isPending}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {DAYS.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  disabled={createMutation.isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  disabled={createMutation.isPending}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creating..." : "Add Availability"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Availability List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">My Availability Slots</h2>
            <p className="text-sm text-muted-foreground">
              Manage your existing weekly availability.
            </p>
          </div>

          <Badge variant="secondary">
            {slots.length} {slots.length === 1 ? "Slot" : "Slots"}
          </Badge>
        </div>

        {isError ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-10">
              <p className="text-sm text-destructive">
                Failed to load availability slots.
              </p>
              <Button variant="outline" onClick={() => refetch()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : slots.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarDays className="mb-3 size-10 text-muted-foreground" />

              <h3 className="font-semibold">No availability slots yet</h3>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                You haven't added any availability slots. Create your first slot
                using the form above.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {sortedSlots.map((slot) => {
              const dayLabel =
                DAYS.find((day) => day.value === slot.dayOfWeek)?.label ??
                slot.dayOfWeek;

              const isDeleting =
                deleteMutation.isPending &&
                deleteMutation.variables === slot.id;

              return (
                <Card key={slot.id}>
                  <CardContent className="flex items-center justify-between gap-4 p-5">
                    <div className="min-w-0 space-y-3">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="size-4 text-muted-foreground" />
                        <h3 className="font-semibold">{dayLabel}</h3>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-4" />
                        <span>
                          {slot.startTime} – {slot.endTime}
                        </span>
                      </div>

                      <Badge variant="outline">Available</Badge>
                    </div>

                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(slot.id)}
                      disabled={deleteMutation.isPending}
                      aria-label={`Delete ${dayLabel} availability`}
                    >
                      {isDeleting ? (
                        <span className="text-xs">...</span>
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
