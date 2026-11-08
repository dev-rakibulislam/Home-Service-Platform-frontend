import apiClient from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";

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

export type CreateServicePayload = {
  name: string;
  description: string;
  price: number;
  duration: number;
  categoryId: string;
};

export async function createService(payload: CreateServicePayload) {
  return apiClient("/services", {
    method: "POST",
    body: payload,
  });
}

export function MyServiceList(filters: { page?: number; limit?: number }) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  });

  const query = params.toString();

  return apiClient(`/services/my-services${query ? `?${query}` : ""}`);
}

export function deleteService(id: string) {
  return apiClient(`/services/${id}`, {
    method: "DELETE",
  });
}

export type UpdateServicePayload = {
  name: string;
  description: string;
  price: number;
  duration: number;
  categoryId: string;
};

export async function updateService(id: string, payload: UpdateServicePayload) {
  return apiClient(`/services/${id}`, {
    method: "PATCH",
    body: payload,
  });
}
