// biome-ignore assist/source/organizeImports: <explanation>
import {
  createService,
  HomePageServiceList,
  MyServiceList,
  ServiceDetails,
  ServiceList,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: HomePageServiceList,
  });
}

export function useGetServicesDetails(id: string) {
  return useQuery({
    queryKey: ["services-details", id],
    queryFn: () => ServiceDetails(id),
  });
}

export function useGetAllServices(filters: any) {
  const {
    page = 1,
    limit = 6,
    category,
    location,
    minRating,
    maxPrice,
  } = filters;

  return useQuery({
    queryKey: [
      "all-services",
      page,
      limit,
      category,
      location,
      minRating,
      maxPrice,
    ],
    queryFn: () =>
      ServiceList({
        page,
        limit,
        category,
        location,
        minRating,
        maxPrice,
      }),
  });
}

export function useGetMyServices(filters: { page?: number; limit?: number }) {
  const { page = 1, limit = 10 } = filters;

  return useQuery({
    queryKey: ["my-services", page, limit],
    queryFn: () => MyServiceList({ page, limit }),
  });
}

export function useCreateService() {
  return useMutation({
    mutationFn: createService,
  });
}
