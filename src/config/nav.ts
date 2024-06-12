import { SidebarLinkProps } from "@/components/layout/app/app-sidebar";
import {
  Apple,
  Clock1,
  Cog,
  Globe,
  HomeIcon,
  PackagePlusIcon,
  Rabbit,
} from "lucide-react";
import { GiRunningNinja } from "react-icons/gi";
import { PiBlueprintLight } from "react-icons/pi";
import { GoHistory } from "react-icons/go";
import { IoIosNutrition } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { IoAnalyticsOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { BsJournalBookmark } from "react-icons/bs";
type AdditionalLinks = {
  title: string;
  links: SidebarLinkProps[];
};

export const defaultLinks: SidebarLinkProps[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/rocketfuel", title: "Speed Kit", icon: Rabbit },
  { href: "/offseason", title: "Off Season", icon: PackagePlusIcon },
  { href: "/nutrition", title: "Nutrition", icon: Apple },
  { href: "/workouthistory", title: "Workout History", icon: Clock1 },
];

export const links = [
  {
    section: "Main",
    links:  [
      {
        title: "Home",
        href: "/dashboard",
        icon: IoHomeOutline,
      },
    ],
  },
  {
    section: "Products",
    links: [
      {
        title: "Speed Kit",
        href: "/rocketfuel",
        icon: GiRunningNinja,
      },
      {
        title: "Off Season",
        href: "/offseason",
        icon: PiBlueprintLight,
      },
      {
        title: "Nutrition Guide",
        href: "/nutrition",
        icon: IoIosNutrition,
      },
      {
        title: "Workout History",
        href: "/workouthistory",
        icon: GoHistory,
      },
    ],
  },
  {
    section: "Tools",
    links: [
      {
        title: "Calendar",
        href: "/calendar",
        icon: IoCalendarOutline,
      },
      {
        title: "Analytics",
        href: "/analytics",
        icon: IoAnalyticsOutline,
      },
      {
        title: "Journal",
        href: "/journal",
        icon: BsJournalBookmark,
      },
    ],
  },
];

export const additionalLinks: AdditionalLinks[] = [];
