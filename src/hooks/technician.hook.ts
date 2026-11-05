import {
  createAvailability,
  CreateAvailabilityPayload,
  deleteAvailability,
  getAvailableTechnicians,
  getMyAvailability,
  TechnicianProfileUpdatePayload,
  updateTechnicianProfile,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAvailableTechnicians() {
  return useQuery({
    queryKey: ["availableTechnicians"],
    queryFn: getAvailableTechnicians,
    retry: false,
  });
}
export function useUpdateTechnicianProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TechnicianProfileUpdatePayload) =>
      updateTechnicianProfile(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["technicianProfile"],
      });
    },
  });
}

export function useGetMyAvailability() {
  return useQuery({
    queryKey: ["availability"],
    queryFn: getMyAvailability,
  });
}


export function useCreateAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAvailabilityPayload) => createAvailability(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["availability"],
      });
    },
  });
}

export function useDeleteAvailability() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAvailability(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["availability"],
      });
    },
  });
}
