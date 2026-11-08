// biome-ignore assist/source/organizeImports: <explanation>
import {
  createService,
  deleteService,
  HomePageServiceList,
  MyServiceList,
  ServiceDetails,
  ServiceList,
  updateService,
  UpdateServicePayload,
} from "@/api";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-services"],
      });
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateServicePayload;
    }) => updateService(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["my-services"],
      });

      queryClient.invalidateQueries({
        queryKey: ["services-details", variables.id],
      });
    },
  });
}
