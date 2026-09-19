"use client";
import TechnicianCard from "@/components/technician/technicianCard";
import { useGetAvailableTechnicians } from "@/hooks";
export default function TechnicianPage() {
  const { data: technicians, isLoading } = useGetAvailableTechnicians();
  console.log(technicians);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {technicians?.data?.map((technician: any) => (
          <TechnicianCard key={technician.id} technician={technician} />
        ))}
      </div>
  );
}
