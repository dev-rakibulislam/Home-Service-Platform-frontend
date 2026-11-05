import apiClient from "@/lib/apiClient";

const t = "technician";
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
