import { getAvailableTechnicians, TechnicianProfileUpdatePayload, updateTechnicianProfile } from "@/api";
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
