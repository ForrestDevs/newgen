"use client";

import { useTheme } from "next-themes";
// import { AppSidebarToggle } from "./app-sidebar-toggle";
import SignOutBtn from "@/components/auth/SignOutBtn";

export function PageNav() {
  return (
    <div className="border-border border-b w-full mb-3 h-16 flex flex-row items-center justify-between space-x-6 px-2">
      {/* <AppSidebarToggle /> */}
      <div className="flex flex-row justify-end">
        <SignOutBtn />
      </div>
    </div>
  );
}
