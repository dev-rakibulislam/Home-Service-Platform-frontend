"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarDays, Clock, CheckCircle2 } from "lucide-react";

import { useCreateBooking } from "@/hooks";
import {
  generateAvailableTimes,
  getDayName,
  getUniqueAvailability,
  formatTime,
  type AvailabilitySlot,
} from "@/lib/availability";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type BookingFormProps = {
  serviceId: string;
  duration: number;
  availabilitySlots: AvailabilitySlot[];
};

const DAYS = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export default function BookingForm({
  serviceId,
  duration,
  availabilitySlots,
}: BookingFormProps) {
  const router = useRouter();

  const { mutateAsync, isPending } = useCreateBooking();

  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  const today = new Date();

  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const uniqueSlots = getUniqueAvailability(availabilitySlots);

  const availableDays = new Set(
    uniqueSlots.map((slot) => slot.dayOfWeek),
  );

  const selectedDay = getDayName(bookingDate);

  const availableTimes = generateAvailableTimes(
    bookingDate,
    duration,
    uniqueSlots,
  );

  function handleDateChange(value: string) {
    setBookingDate(value);
    setBookingTime("");
  }

  async function handleSubmit() {
    if (!bookingDate || !bookingTime) {
      toast.error("Please select a date and time.");
      return;
    }

    if (bookingDate < minDate) {
      toast.error("Please select today or a future date.");
      return;
    }

    if (!availableTimes.includes(bookingTime)) {
      toast.error("Please select an available time.");
      return;
    }

    try {
      await mutateAsync({
        serviceId,
        bookingDate,
        bookingTime,
      });

      toast.success("Booking created successfully.");

      router.push("/dashboard/customer/bookings");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create booking.",
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Weekly availability */}
      <section className="space-y-4 rounded-xl border p-5">
        <div>
          <h2 className="text-lg font-semibold">
            Technician Availability
          </h2>

          <p className="text-sm text-muted-foreground">
            Weekly working schedule
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {DAYS.map((day) => {
            const slots = uniqueSlots.filter(
              (slot) => slot.dayOfWeek === day,
            );

            const available = availableDays.has(day);

            return (
              <div
                key={day}
                className={`rounded-lg border p-3 ${
                  available
                    ? "border-primary/20 bg-primary/5"
                    : "bg-muted/30 opacity-60"
                }`}
              >
                <div className="flex items-center gap-2">
                  {available && (
                    <CheckCircle2 className="size-4 text-primary" />
                  )}

                  <p className="text-sm font-medium">
                    {day.charAt(0) + day.slice(1).toLowerCase()}
                  </p>
                </div>

                {available ? (
                  slots.map((slot) => (
                    <p
                      key={`${slot.dayOfWeek}-${slot.startTime}-${slot.endTime}`}
                      className="mt-2 text-xs text-muted-foreground"
                    >
                      {formatTime(slot.startTime)} –{" "}
                      {formatTime(slot.endTime)}
                    </p>
                  ))
                ) : (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Not available
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Booking date and time */}
      <section className="space-y-5 rounded-xl border p-5">
        <div>
          <h2 className="text-lg font-semibold">
            Select Date & Time
          </h2>

          <p className="text-sm text-muted-foreground">
            Choose your preferred booking schedule.
          </p>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label
            htmlFor="bookingDate"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <CalendarDays className="size-4" />
            Booking Date
          </label>

          <Input
            id="bookingDate"
            type="date"
            min={minDate}
            value={bookingDate}
            onChange={(event) =>
              handleDateChange(event.target.value)
            }
            disabled={isPending}
          />
        </div>

        {/* Time */}
        {bookingDate && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock className="size-4" />
              Available Time
            </div>

            {availableTimes.length > 0 ? (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    type="button"
                    disabled={isPending}
                    onClick={() => setBookingTime(time)}
                    className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                      bookingTime === time
                        ? "border-primary bg-primary text-primary-foreground"
                        : "hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    {formatTime(time)}
                  </button>
                ))}
              </div>
            ) : (
              <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                Technician is not available on this day.
              </p>
            )}
          </div>
        )}

        {/* Selected schedule */}
        {bookingDate && bookingTime && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-medium">
              Selected Schedule
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {bookingDate} at {formatTime(bookingTime)}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Duration: {duration} minutes
            </p>
          </div>
        )}

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={
            isPending ||
            !bookingDate ||
            !bookingTime ||
            !availableTimes.includes(bookingTime)
          }
          className="min-h-12 w-full"
        >
          {isPending ? "Creating Booking..." : "Confirm Booking"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Your booking will remain pending until the technician
          accepts it. You can pay after acceptance.
        </p>
      </section>
    </div>
  );
}
