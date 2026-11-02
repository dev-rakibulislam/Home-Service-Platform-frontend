import apiClient from "@/lib/apiClient";

export function HomePageServiceList() {
  return apiClient("/services/homepage/");
}

export function ServiceList(filters: any) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  });

  const query = params.toString();

  return apiClient(`/services/${query ? `?${query}` : ""}`);
}

export function ServiceDetails(id: string) {
  return apiClient(`/services/${id}`);
}
