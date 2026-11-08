import apiClient from "@/lib/apiClient";
import { MyBookingsResponse } from "@/type/booking";

export  function getMyRecentBookings() {
  return apiClient("/booking/my-bookings/recent");
}
export type CreateBookingPayload = {
  serviceId: string;
  bookingDate: string;
  bookingTime: string;
};

export const createBooking = async (
  payload: CreateBookingPayload,
) => {
  return apiClient("/booking", {
    method: "POST",
    body: payload,
  });
};


export type GetMyBookingsParams = {
  page: number;
  limit: number;
  status?: string;
  sortOrder?: "asc" | "desc";
};

export function getMyCusBookings (
  params: GetMyBookingsParams,
) {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(params.page));
  searchParams.set("limit", String(params.limit));

  if (params.status) {
    searchParams.set("status", params.status);
  }

  if (params.sortOrder) {
    searchParams.set("sortOrder", params.sortOrder);
  }

  return apiClient(
    `/bookings?${searchParams.toString()}`,
  );
};


export type BookingStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type CustomerBooking = {
  id: string;
  bookingDate: string;
  bookingTime?: string;
  status: BookingStatus;
  totalPrice?: string | number;
  service: {
    id: string;
    name: string;
    price: string | number;
    duration: number;
    category?: {
      name: string;
    };
  };
  technician?: {
    id: string;
    userName?: string;
    user?: {
      name?: string;
      image?: string | null;
      address?: string;
    };
  } | null;
  createdAt?: string;
};

export type CustomerBookingsResponse = {
  success: boolean;
  message: string;
  data: CustomerBooking[];
  metaData?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const getCustomerBookings = async (
  page: number,
  limit: number,
): Promise<CustomerBookingsResponse> => {
  return apiClient(
    `/booking/my-bookings?page=${page}&limit=${limit}`,
  ) as Promise<CustomerBookingsResponse>;
};
