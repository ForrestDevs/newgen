import { validateRequest } from "@/lib/auth/validate-request";
import { PageShell } from "@/components/layout/app/app-page-shell";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ActivityIcon,
  BarChart,
  ClockIcon,
  CreditCardIcon,
  EyeIcon,
  LineChart,
  LockIcon,
  MoveHorizontalIcon,
  PlusIcon,
  UsersIcon,
} from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { api } from "@/lib/trpc/server";

const sections = [
  {
    title: "Products",
    cards: [
      {
        title: "Rocket Fuel",
        description: "Unlock to access",
        href: "/rocketfuel",
        pic: "/rocketfuellogo.png",
      },
      {
        title: "Product 2",
        description: "Unlock to access",
        href: "#",
        pic: "/placeholder.svg",
      },
      {
        title: "Product 3",
        description: "Unlock to access",
        href: "#",
        pic: "/placeholder.svg",
      },
    ],
  },
  {
    title: "Tools",
    cards: [
      {
        title: "Tool 1",
        description: "Coming soon",
        href: "#",
        pic: "",
      },
      {
        title: "Tool 2",
        description: "Coming soon",
        href: "#",
        pic: "",
      },
      {
        title: "Tool 3",
        description: "Unlock to access",
        href: "#",
        pic: "",
      },
    ],
  },
];

export default async function Home() {
  const userProfile = api.user.getUserProfile.query();

  if (!userProfile) {
    return null;
  }

  return (
    <ContentLayout title="Dashboard">
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <section id="header">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold md:text-4xl">
              Welcome back, {(await userProfile).firstName}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 md:text-lg">
              Let's dive into your dashboard and see what's new.
            </p>
          </div>
        </section>

        {sections.map((section, i) => (
          <section key={i} id={section.title.toLowerCase()}>
            <h2 className="mb-4 text-xl font-bold md:text-2xl">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {section.cards.map((card) => (
                <Link href={card.href} className="hover:scale-[1.03] transition-all">
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle>{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={card.pic}
                        alt={card.title}
                        width={200}
                        height={200}
                        className="object-cover"
                      />
                    </CardContent>
                    <CardFooter>
                      <p>{card.description}</p>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* <section id="products">
          <h2 className="mb-4 text-xl font-bold md:text-2xl">Products</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="relative group rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Product</span>
              </Link>
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src="/placeholder.svg"
                  alt="Product 1"
                  width={500}
                  height={300}
                  className="h-40 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm">
                  <LockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">Product 1</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Unlock to access
                </p>
              </div>
            </div>
            <div className="relative group rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Product</span>
              </Link>
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src="/placeholder.svg"
                  alt="Product 2"
                  width={500}
                  height={300}
                  className="h-40 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">Product 2</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Unlock to access
                </p>
              </div>
            </div>
            <div className="relative group rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Product</span>
              </Link>
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src="/placeholder.svg"
                  alt="Product 3"
                  width={500}
                  height={300}
                  className="h-40 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">Product 3</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Unlock to access
                </p>
              </div>
            </div>
            <div className="relative group rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Product</span>
              </Link>
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src="/placeholder.svg"
                  alt="Product 4"
                  width={500}
                  height={300}
                  className="h-40 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">Product 4</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Unlock to access
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="tools">
          <h2 className="mb-4 text-xl font-bold md:text-2xl">Tools</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="relative group rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Tool</span>
              </Link>
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src="/placeholder.svg"
                  alt="Tool 1"
                  width={500}
                  height={300}
                  className="h-40 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 z-20 bg-gray-900/50 backdrop-blur-sm" />
                <div className="absolute top-2 right-2 z-30 rounded-full bg-white/80 p-2 backdrop-blur-sm">
                  <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">Tool 1</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Coming soon
                </p>
              </div>
            </div>
            <div className="relative group rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Tool</span>
              </Link>
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src="/placeholder.svg"
                  alt="Tool 2"
                  width={500}
                  height={300}
                  className="h-40 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 z-20 bg-gray-900/50 backdrop-blur-sm" />
                <div className="absolute top-2 right-2 z-30 rounded-full bg-white/80 p-2 backdrop-blur-sm">
                  <ClockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">Tool 2</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Coming soon
                </p>
              </div>
            </div>
            <div className="relative group rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Tool</span>
              </Link>
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src="/placeholder.svg"
                  alt="Tool 3"
                  width={500}
                  height={300}
                  className="h-40 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">Tool 3</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Unlock to access
                </p>
              </div>
            </div>
            <div className="relative group rounded-lg bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-950">
              <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View Tool</span>
              </Link>
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src="/placeholder.svg"
                  alt="Tool 4"
                  width={500}
                  height={300}
                  className="h-40 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">Tool 4</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Unlock to access
                </p>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </ContentLayout>
  );
}
