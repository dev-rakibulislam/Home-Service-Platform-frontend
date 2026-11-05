"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { useCreateAvailability } from "@/hooks";

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

const DAYS = [
  { label: "Monday", value: "MONDAY" },
  { label: "Tuesday", value: "TUESDAY" },
  { label: "Wednesday", value: "WEDNESDAY" },
  { label: "Thursday", value: "THURSDAY" },
  { label: "Friday", value: "FRIDAY" },
  { label: "Saturday", value: "SATURDAY" },
  { label: "Sunday", value: "SUNDAY" },
] as const;

export default function AvailabilityPage() {
  const [dayOfWeek, setDayOfWeek] = useState("MONDAY");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const createAvailabilityMutation = useCreateAvailability();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dayOfWeek || !startTime || !endTime) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Time values use 24-hour HH:mm format.
    if (startTime >= endTime) {
      toast.error("End time must be greater than start time.");
      return;
    }

    createAvailabilityMutation.mutate(
      {
        dayOfWeek: dayOfWeek as
          | "MONDAY"
          | "TUESDAY"
          | "WEDNESDAY"
          | "THURSDAY"
          | "FRIDAY"
          | "SATURDAY"
          | "SUNDAY",
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
              ? error?.data.message
              : "Failed to create availability.",
          );
        },
      },
    );
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Availability</h1>
        <p className="text-sm text-muted-foreground">
          Set the days and time slots when customers can book your services.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Availability</CardTitle>
          <CardDescription>
            Choose a day and set your available working hours.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dayOfWeek">Day of Week</Label>

              <select
                id="dayOfWeek"
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                disabled={createAvailabilityMutation.isPending}
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
                  disabled={createAvailabilityMutation.isPending}
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
                  disabled={createAvailabilityMutation.isPending}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={createAvailabilityMutation.isPending}
              >
                {createAvailabilityMutation.isPending
                  ? "Creating..."
                  : "Add Availability"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
