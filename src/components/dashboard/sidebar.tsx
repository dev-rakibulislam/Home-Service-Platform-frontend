"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetMe } from "@/hooks";
import { navigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data } = useGetMe();

  const role = data?.data?.role;

  if (!role || !(role in navigation)) {
    return null;
  }

  const menus = navigation[role as keyof typeof navigation];

  return (
    <aside className="w-64 border-r bg-background p-4">
      <div className="mb-8 text-xl font-bold">FixItNow</div>

      <nav className="space-y-1">
        {menus.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
