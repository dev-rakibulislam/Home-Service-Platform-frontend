"use client";

import { Loading } from "@/components/shared/loading";
import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { data, isLoading } = useGetMe();

  const role = data?.data?.role;

  useEffect(() => {
    if (!isLoading && !role) {
      router.replace("/login");
      return;
    }

    if (role === "ADMIN") {
      router.replace("/dashboard/admin");
    }

    if (role === "TECHNICIAN") {
      router.replace("/dashboard/technician");
    }

    if (role === "CUSTOMER") {
      router.replace("/dashboard/customer");
    }
  }, [isLoading, role, router]);

  return <Loading />;
}
