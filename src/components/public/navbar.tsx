"use client";

import Link from "next/link";
import { LayoutDashboard,  Menu, User } from "lucide-react";


import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
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

import { useGetMe,  } from "@/hooks";
import siteDetails from "@/config/publicSiteData";
import Logo from "../shared/logo";
import { LogoutButton } from "../auth/log-out";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Technicians", href: "/technicians" },
  { title: "About Us", href: "/about-us" },
  { title: "Privacy Policy", href: "/privacy-policy" },
];

function UserAvatar({
  name,
  image,
  className,
}: {
  name: string;
  image: string;
  className: string;
}) {
  return (
    <Avatar className={className}>
      <AvatarImage src={image} alt={`${name} profile`} />
      <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}

export function Navbar() {
  const { data, isLoading } = useGetMe();

  const user = data?.data;
  const name = user?.name ?? "User";
  const email = user?.email ?? "";
  const image = user?.image || "/user.avif";


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo + desktop links */}
        <div className="flex items-center gap-8">
          <Logo />

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map(({ title, href }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={href}
                      className="inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop auth */}
          <div className="hidden md:block">
            {isLoading ? (
              <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
            ) : !user ? (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-auto gap-2 px-2 py-1.5">
                    <UserAvatar name={name} image={image} className="size-9" />

                    <div className="hidden text-left lg:block">
                      <p className="max-w-32 truncate text-sm font-medium">
                        {name}
                      </p>

                      <p className="max-w-40 truncate text-xs text-muted-foreground">
                        {email}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-60">
                  <DropdownMenuLabel className="flex flex-col gap-1">
                    <span className="truncate font-medium">{name}</span>
                    <span className="truncate text-xs font-normal text-muted-foreground">
                      {email}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard className="mr-2 size-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <User className="mr-2 size-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-70 sm:w-80">
              <SheetHeader>
                <SheetTitle asChild>
                  <div>
                    <Logo />
                  </div>
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-1 px-4">
                {navItems.map(({ title, href }) => (
                  <SheetClose asChild key={href}>
                    <Link
                      href={href}
                      className="rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {title}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mx-4 my-6 border-t" />

              <div className="px-4">
                {isLoading ? (
                  <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
                ) : !user ? (
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link href="/login">Login</Link>
                    </Button>
                  </SheetClose>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-lg border p-3">
                      <UserAvatar
                        name={name}
                        image={image}
                        className="size-10"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {email}
                        </p>
                      </div>
                    </div>

                    <SheetClose asChild>
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
                    </SheetClose>

                    <LogoutButton />
                  </div>
                )}
              </div>

              <p className="mt-auto pb-4 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} {siteDetails.name}
              </p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
