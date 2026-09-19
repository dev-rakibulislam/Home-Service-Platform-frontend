import { getAvailableTechnicians } from "@/api";
import {  useQuery } from "@tanstack/react-query";

export function useGetAvailableTechnicians() {
  return useQuery({
    queryKey: ["availableTechnicians"],
    queryFn: getAvailableTechnicians,
    retry: false,
  });
}
