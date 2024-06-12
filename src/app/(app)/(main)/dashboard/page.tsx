import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
              Let&apos;s dive into your dashboard and see what&apos;s new.
            </p>
          </div>
        </section>

        {sections.map((section, i) => (
          <section key={i} id={section.title.toLowerCase()}>
            <h2 className="mb-4 text-xl font-bold md:text-2xl">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {section.cards.map((card, i) => (
                <Link
                  key={i}
                  href={card.href}
                  className="hover:scale-[1.03] transition-all"
                >
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
      </div>
    </ContentLayout>
  );
}
