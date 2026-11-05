
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateBooking } from "@/hooks";


type BookingFormProps = {
  serviceId: string;
};

export default function BookingForm({ serviceId }: BookingFormProps) {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateBooking();

  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  // Use the local calendar date, not UTC's date.
  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  async function handleBooking() {
    if (!bookingDate || !bookingTime) {
      toast.error("Please select a date and time.");
      return;
    }

    if (bookingDate < minDate) {
      toast.error("Please select today or a future date.");
      return;
    }

    try {
      await mutateAsync({
        serviceId,
        bookingDate,
        bookingTime,
      });

      toast.success("Booking created successfully.");
      router.push("/bookings");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create booking.";

      toast.error(message);
    }
  }

  return (
    <section className="space-y-4 rounded-xl border p-5">
      <h2 className="text-lg font-semibold">Book this service</h2>

      <div className="space-y-2">
        <label htmlFor="booking-date" className="block text-sm font-medium">
          Booking date
        </label>
        <input
          id="booking-date"
          type="date"
          min={minDate}
          value={bookingDate}
          onChange={(event) => setBookingDate(event.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="booking-time" className="block text-sm font-medium">
          Booking time
        </label>
        <input
          id="booking-time"
          type="time"
          value={bookingTime}
          onChange={(event) => setBookingTime(event.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          required
        />
      </div>

      <button
        type="button"
        onClick={handleBooking}
        disabled={isPending || !bookingDate || !bookingTime}
        className="w-full rounded-lg bg-[#92003A] px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Creating booking..." : "Confirm booking"}
      </button>
    </section>
  );
}
