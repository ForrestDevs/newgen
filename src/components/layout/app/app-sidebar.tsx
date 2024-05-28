"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { BellIcon, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { defaultLinks, additionalLinks } from "@/config/nav";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

export function AppSidebar() {
  return (
    <div className="hidden border-r bg-primary-foreground md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <p className="h-6 w-6">🧬</p>
            <span className="">New Gen</span>
          </Link>
          <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>

        <SidebarItems />

        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button className="w-full" size="sm">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function SidebarItems() {
  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
      </nav>
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
      className={`flex items-center gap-3 px-3 py-2 group transition-colors p-2 hover:bg-popover hover:text-primary text-muted-foreground text-xs hover:shadow rounded-md w-full${
        active ? " text-primary font-semibold" : ""
      }`}
    >
      <div
        className={cn(
          "opacity-0 left-0 h-6 w-[4px] absolute rounded-r-lg bg-primary",
          active ? "opacity-100" : ""
        )}
      />
      <link.icon className="h-3.5 mr-1" />
      <span>{link.title}</span>
    </Link>
  );
}
