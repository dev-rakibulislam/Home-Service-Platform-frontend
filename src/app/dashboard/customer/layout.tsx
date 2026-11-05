"use client";

import { RoleGuard } from "@/components/auth/role-guard";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allowedRole={["CUSTOMER"]}>{children}</RoleGuard>;
}
