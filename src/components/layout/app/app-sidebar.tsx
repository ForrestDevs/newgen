"use client";

import Link from "next/link";
import { links } from "@/config/nav";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  return (
    <div className="hidden border-r bg-primary-foreground md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <p className="h-6 w-6">🧬</p>
            <span className="">New Gen Performance</span>
          </Link>
        </div>

        <SidebarNav />
      </div>
    </div>
  );
}

export function SidebarNav() {
  const fullPathname = usePathname();
  const pathname = "/" + fullPathname.split("/")[1];
  return (
    <div className="flex flex-col justify-between flex-1 mt-2">
      <nav className="grid items-start px-2 py-2 text-sm font-medium lg:px-4">
        {links.map((section, i) => (
          <div key={i} className="my-4">
            <div className="flex items-center justify-between border-border border-b my-2 pt-1">
              <h4 className="px-2 mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                {section.section}
              </h4>
            </div>
            <ul>
              {section.links.map((link, i) => (
                <li key={i}>
                  <SidebarItem link={link} active={pathname === link.href} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}

export interface SidebarLinkProps {
  title: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
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
          "flex opacity-0 left-0 h-6 w-[4px] absolute rounded-r-lg bg-primary",
          active ? "opacity-100" : ""
        )}
      />
      <link.icon className="w-5 h-5" />
      <span className="mx-2 text-base font-semibold">{link.title}</span>
    </Link>
  );
}
