import Link from "next/link";

import SidebarItems from "./SidebarItems";
import { Avatar, AvatarFallback } from "./ui/avatar";

import { validateRequest } from "@/lib/auth";
import { Session } from "@/lib/db/schema/auth";
const Sidebar = async () => {
  const { session, user } = await validateRequest();
  if (session === null) return null;

  return (
    <aside className="h-screen min-w-52 bg-muted hidden md:block p-4 pt-8 border-r border-border shadow-inner">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold ml-4">Logo</h3>
          <SidebarItems />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
