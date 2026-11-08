import apiClient from "@/lib/apiClient";

export function getAllCategory() {
  return apiClient("/category");
}
