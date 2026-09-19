"use client";

import Link from "next/link";
import { Loader2, LogOut, Menu, User } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import Logo from "./logo";
import { useGetMe, useLogout } from "@/hooks";
import siteDetails from "@/config/publicSiteData";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Technicians",
    href: "/technicians",
  },
  {
    title: "About Us",
    href: "/about-us",
  },
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
];

export function Navbar() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  // API response অনুযায়ী user বের করা
  const user = data?.data;

  const userName = user?.name ?? "User";
  const userEmail = user?.email ?? "";
  const userImage = user?.image || "/user.avif";

  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        queryClient.removeQueries({
          queryKey: ["user"],
        });

        toast.success("Logged out successfully");
      },

      onError: () => {
        toast.error("Logout failed", {
          description: "Please try again.",
        });
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="group inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            {isLoading && (
              <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
            )}

            {!isLoading && !user && (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}

            {!isLoading && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    disabled={isLoggingOut}
                    className="flex h-auto items-center gap-2 px-2 py-1.5"
                  >
                    <Avatar className="size-9">
                      <AvatarImage
                        src={userImage}
                        alt={`${userName} profile`}
                      />

                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>

                    <div className="hidden text-left lg:block">
                      <p className="max-w-32 truncate text-sm font-medium">
                        {userName}
                      </p>

                      <p className="max-w-40 truncate text-xs text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-60">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                      <span className="truncate font-medium">{userName}</span>

                      <span className="truncate text-xs font-normal text-muted-foreground">
                        {userEmail}
                      </span>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <User className="mr-2 size-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    disabled={isLoggingOut}
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive"
                  >
                    {isLoggingOut ? (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    ) : (
                      <LogOut className="mr-2 size-4" />
                    )}

                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-70 sm:w-[320px]">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <Logo />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              <div className="my-6 border-t" />

              {isLoading && (
                <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
              )}

              {!isLoading && !user && (
                <Button asChild className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
              )}

              {!isLoading && user && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <Avatar className="size-10">
                      <AvatarImage
                        src={userImage}
                        alt={`${userName} profile`}
                      />

                      <AvatarFallback>{userInitial}</AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{userName}</p>

                      <p className="truncate text-xs text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Link href="/dashboard/profile">
                      <User className="mr-2 size-4" />
                      Profile
                    </Link>
                  </Button>

                  <Button
                    variant="destructive"
                    className="w-full"
                    disabled={isLoggingOut}
                    onClick={handleLogout}
                  >
                    {isLoggingOut ? (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    ) : (
                      <LogOut className="mr-2 size-4" />
                    )}

                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </Button>
                </div>
              )}

              <p className="mt-auto pt-8 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} {siteDetails.name}
              </p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
