"use client";

import { RoleGuard } from "@/components/auth/role-guard";

export default function TechnicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allowedRole={["TECHNICIAN"]}>{children}</RoleGuard>;
}
