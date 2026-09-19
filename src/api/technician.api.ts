import apiClient from "@/lib/apiClient";

export function getAvailableTechnicians() {
  return apiClient("/technician");
}
