"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetMe } from "@/hooks";
import { navigation } from "@/config/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data } = useGetMe();

  const role = data?.data?.role;

  if (!role || !(role in navigation)) {
    return null;
  }

  const menus = navigation[role as keyof typeof navigation];

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <div className="p-4 text-xl font-bold">FixItNow</div>

        <SidebarMenu>
          {menus.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                >
                  <Link href={item.href}>
                    <Icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.data} />
      </SidebarFooter>
    </Sidebar>
  );
}
