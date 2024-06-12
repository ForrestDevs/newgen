"use client";

import SignOutBtn from "@/components/sign-out-btn";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SidebarNav } from "./app-sidebar";

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
          <SidebarNav />
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
          <DropdownMenuItem>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem>
            <ThemeToggle />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutBtn />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
