"use client";

import { useAppShell } from "./app-shell";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { defaultLinks, additionalLinks } from "@/config/nav";
import { Logov6 } from "@/components/logo";
import { useTheme } from "next-themes";

export function AppSidebar() {
  const { isSidebarCollapsed } = useAppShell();
  const { theme } = useTheme();

  return (
    <>
      <motion.div
        className="hidden md:block bg-primary-foreground h-screen overflow-x-hidden"
        animate={{
          width: isSidebarCollapsed ? 0 : 250,
          translateX: isSidebarCollapsed ? "-100%" : "0%",
        }}
        transition={{
          type: "spring",
          duration: 0.3,
          bounce: isSidebarCollapsed ? 0 : 0.2,
        }}
      >
        <div className="border-border border-b w-full mb-3 h-16">
          <Link href="/dashboard">
            <Logov6 className="w-[125px] py-2 ml-2" theme={theme!} />
          </Link>
        </div>
        <SidebarItems />
      </motion.div>
      <div
        id="sidebar-handle"
        className="md:flex hidden w-[1px] bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90"
      />
    </>
  );
}

export function SidebarItems() {
  return (
    <div className="px-2">
      <SidebarSection links={defaultLinks} />
      {additionalLinks.length > 0
        ? additionalLinks.map((l) => (
            <SidebarSection
              links={l.links}
              title={l.title}
              border
              key={l.title}
            />
          ))
        : null}
    </div>
  );
}

function SidebarSection({
  links,
  title,
  border,
}: {
  links: SidebarLinkProps[];
  title?: string;
  border?: boolean;
}) {
  const fullPathname = usePathname();
  const pathname = "/" + fullPathname.split("/")[1];

  return (
    <div className={border ? "border-border border-t my-8 pt-4" : ""}>
      {title ? (
        <h4 className="px-2 mb-2 text-xs uppercase text-muted-foreground tracking-wider">
          {title}
        </h4>
      ) : null}
      <ul>
        {links.map((link) => (
          <li key={link.title}>
            <SidebarItem link={link} active={pathname === link.href} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface SidebarLinkProps {
  title: string;
  href: string;
  icon: LucideIcon;
}

function SidebarItem({
  link,
  active,
}: {
  link: SidebarLinkProps;
  active: boolean;
}) {
  return (
    <Link
      href={link.href}
      className={`group transition-colors p-2 inline-block hover:bg-popover hover:text-primary text-muted-foreground text-xs hover:shadow rounded-md w-full${
        active ? " text-primary font-semibold" : ""
      }`}
    >
      <div className="flex items-center">
        <div
          className={cn(
            "opacity-0 left-0 h-6 w-[4px] absolute rounded-r-lg bg-primary",
            active ? "opacity-100" : ""
          )}
        />
        <link.icon className="h-3.5 mr-1" />
        <span>{link.title}</span>
      </div>
    </Link>
  );
}
