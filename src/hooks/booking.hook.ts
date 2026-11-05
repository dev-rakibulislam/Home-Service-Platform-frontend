
"use client";

import apiClient from "@/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export type CreateBookingPayload = {
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
};

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookingPayload) =>
      apiClient("/bookings", {
        method: "POST",
        body: payload,
      }),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["user"] }),
        queryClient.invalidateQueries({ queryKey: ["bookings"] }),
      ]);
    },
  });
}
