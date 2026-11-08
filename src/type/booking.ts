export type BookingStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type MyBooking = {
  id: string;
  bookingDate: string;
  status: BookingStatus;
  totalPrice: string | number;

  service: {
    id: string;
    name: string;
  };

  technician: {
    id: string;
    user: {
      name: string;
      image?: string | null;
    };
  };
};

export type MyBookingsResponse = {
  success: boolean;
  message: string;
  data: MyBooking[];
  metaData: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
