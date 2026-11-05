"use client";

import { Loading } from "@/components/shared/loading";
import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Role = ("ADMIN" | "TECHNICIAN" | "CUSTOMER")[];

interface RoleGuardProps {
  allowedRole: Role;
  children: React.ReactNode;
}

export function RoleGuard({ allowedRole, children }: RoleGuardProps) {
  const router = useRouter();
  const { data, isLoading } = useGetMe();

  const user = data?.data;

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
      return;
    }

    if (!isLoading && user && !allowedRole.includes(user.role)) {
      router.replace("/dashboard");
    }
  }, [isLoading, user, allowedRole, router]);

  if (isLoading || !user) {
    return <Loading />;
  }

  if (!allowedRole.includes(user.role)) {
    return <Loading />;
  }

  return <>{children}</>;
}
