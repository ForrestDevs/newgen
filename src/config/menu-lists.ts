import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
} from "lucide-react";
import { GiRunningNinja } from "react-icons/gi";
import { PiBlueprintLight } from "react-icons/pi";
import { GoHistory } from "react-icons/go";
import { IoIosNutrition } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { IoAnalyticsOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { BsJournalBookmark } from "react-icons/bs";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Products",
      menus: [
        {
          href: "/rocketfuel",
          label: "Speed Kit",
          active: pathname.includes("/rocketfuel"),
          icon: GiRunningNinja,
          submenus: [],
        },
        {
          href: "/offseason",
          label: "Off Season",
          active: pathname.includes("/offseason"),
          icon: PiBlueprintLight,
          submenus: [],
        },
        {
          href: "/workouthistory",
          label: "Workout History",
          active: pathname.includes("/workouthistory"),
          icon: GoHistory,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Tools",
      menus: [
        {
          href: "/calendar",
          label: "Calendar",
          active: pathname.includes("/calendar"),
          icon: IoCalendarOutline,
          submenus: [],
        },
        {
          href: "/analytics",
          label: "Analytics",
          active: pathname.includes("/analytics"),
          icon: IoAnalyticsOutline,
          submenus: [],
        },
        {
          href: "/journal",
          label: "Journal",
          active: pathname.includes("/journal"),
          icon: BsJournalBookmark,
          submenus: [],
        },
      ],
    },
  ];
}
