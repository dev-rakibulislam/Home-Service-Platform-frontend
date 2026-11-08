"use client";

// biome-ignore assist/source/organizeImports: <explanation>
import { createBooking, getCustomerBookings, type GetMyBookingsParams, getMyCusBookings } from "@/api/booking.api";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type CreateBookingPayload = {
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
};

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookingPayload) =>
      createBooking(payload),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["my-bookings"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["my-recent-bookings"],
        }),
      ]);
    },
  });
}

export function useGetMyBookings(
  params: GetMyBookingsParams,
) {
  return useQuery({
    queryKey: ["my-bookings", params],
    queryFn: () => getMyCusBookings(params),
    placeholderData: (previousData) => previousData,
  });
}

export function useGetCustomerBookings(
  page: number,
  limit: number,
) {
  return useQuery({
    queryKey: ["my-bookings", page, limit],
    queryFn: () => getCustomerBookings(page, limit),
  });
}
