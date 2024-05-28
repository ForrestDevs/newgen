"use client";

// import { AppSidebarToggle } from "@/components/layout/app/app-sidebar-toggle";
import SignOutBtn from "@/components/sign-out-btn";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  CircleUserIcon,
  HomeIcon,
  LineChartIcon,
  MenuIcon,
  Package2Icon,
  PackageIcon,
  SearchIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";
import { logout } from "@/lib/auth/actions";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export async function PageNav() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-primary-foreground px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="shrink-0 md:hidden" size="icon" variant="outline">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col" side="left">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              className="flex items-center gap-2 text-lg font-semibold"
              href="#"
            >
              <Package2Icon className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              href="#"
            >
              <HomeIcon className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
              href="#"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              Orders
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              href="#"
            >
              <PackageIcon className="h-5 w-5" />
              Products
            </Link>
            <Link
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              href="#"
            >
              <UsersIcon className="h-5 w-5" />
              Customers
            </Link>
            <Link
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              href="#"
            >
              <LineChartIcon className="h-5 w-5" />
              Analytics
            </Link>
          </nav>
          <div className="mt-auto">
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="sm">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              placeholder="Search products..."
              type="search"
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full" size="icon" variant="secondary">
            <CircleUserIcon className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutBtn />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
