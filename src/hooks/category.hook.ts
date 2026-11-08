import { getAllCategory } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetCategory() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
    retry: false,
  });
}
