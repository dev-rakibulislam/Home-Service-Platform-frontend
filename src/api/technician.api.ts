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
