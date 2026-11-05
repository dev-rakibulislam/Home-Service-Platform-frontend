import apiClient from "@/lib/apiClient";

const t = "/technician";
export function getAvailableTechnicians() {
  return apiClient(`${t}`);
}

export type TechnicianProfileUpdatePayload = {
  bio?: string;
  experienceYears?: number;
  hourlyRate?: string;
  skills?: string[];
};

export function updateTechnicianProfile(data: TechnicianProfileUpdatePayload) {
  return apiClient(`${t}/update-profile`, {
    method: "PUT",
    body: data,
  });
}

export type CreateAvailabilityPayload = {
  dayOfWeek:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
  startTime: string;
  endTime: string;
};

export function createAvailability(data: CreateAvailabilityPayload) {
  return apiClient(`${t}/`, {
    method: "POST",
    body: data,
  });
}

export type AvailabilitySlot = {
  id: string;
  technicianId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
};

export function getMyAvailability() {
  return apiClient(`${t}/availability`, {
    method: "GET",
  });
}

export function deleteAvailability(id: string) {
  return apiClient(`${t}/availability/${id}`, {
    method: "DELETE",
  });
}


  export type BookingStatus =
  | "PENDING"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type TechnicianBooking = {
  id: string;
  customerId: string;
  technicianId: string;
  serviceId: string;
  bookingDate: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;

  customer: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string | null;
    address: string | null;
    image: string | null;
  };

  service: {
    id: string;
    technicianId: string;
    categoryId: string;
    name: string;
    description: string;
    price: string;
    duration: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
};


export type UpdateBookingPayload = {
  status: BookingStatus;
};

export const getMyBookings = () => {
  return apiClient("/technician/bookings", {
    method: "GET",
  });
};

export const updateMyBooking = (id: string, payload: UpdateBookingPayload) => {
  return apiClient(`/technician/update-booking/${id}`, {
    method: "POST",
    body: payload,
  });
};
