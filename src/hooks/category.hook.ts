import { getAllCategory } from "@/api";
import { getMyRecentBookings } from "@/api/booking.api";
import { useQuery } from "@tanstack/react-query";

export function useGetCategory() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
    retry: false,
  });
}

export function useGetMyRecentBookings() {
  return useQuery({
    queryKey: ["my-recent-bookings"],
    queryFn: getMyRecentBookings,
  });
}
