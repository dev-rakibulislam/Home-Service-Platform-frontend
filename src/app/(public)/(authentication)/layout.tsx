"use client";

import { Loading } from "@/components/shared/loading";
import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading } = useGetMe();
  const router = useRouter();

  useEffect(() => {
    if (data?.data) {
      router.replace("/dashboard");
    }
  }, [data, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (data?.data) {
    return <Loading />;
  }

  return <>{children}</>;
}
