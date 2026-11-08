import {
  LayoutDashboard,
  Users,
  UserCog,
  CalendarDays,
  Wrench,
  Clock,
  Settings,
  User,
} from "lucide-react";

export const navigation = {
  ADMIN: [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "Technicians",
      href: "/dashboard/admin/technicians",
      icon: UserCog,
    },
    {
      title: "Bookings",
      href: "/dashboard/admin/bookings",
      icon: CalendarDays,
    },
    {
      title: "Services",
      href: "/dashboard/admin/services",
      icon: Wrench,
    },
    {
      title: "Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
//* done
  TECHNICIAN: [
    {
      title: "Dashboard",
      href: "/dashboard/technician",
      icon: LayoutDashboard,
    },
    {
      title: "My Bookings",
      href: "/dashboard/technician/bookings",
      icon: CalendarDays,
    },
    {
      title: "Availability",
      href: "/dashboard/technician/availability",
      icon: Clock,
    },
    {
      title: "My Services",
      href: "/dashboard/technician/services",
      icon: Wrench,
    },
    {
      title: "My Profile",
      href: "/dashboard/technician/profile",
      icon: User,
    },
  ],

  CUSTOMER: [
    {
      title: "Dashboard",
      href: "/dashboard/customer",
      icon: LayoutDashboard,
    },
    {
      title: "My Bookings",
      href: "/dashboard/customer/bookings",
      icon: CalendarDays,
    },
    {
      title: "My Profile",
      href: "/dashboard/customer/profile",
      icon: User,
    },
  ],
} as const;
