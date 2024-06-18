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
import { z } from "zod";
import { redirect } from "next/navigation";

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
        title: "Off Season Blueprint",
        description: "Coming Soon!",
        href: "/offseason",
        pic: "/offSeasonlogo.png",
      },
      {
        title: "Workout History",
        description: "Coming Soon!",
        href: "/workouthistory",
        pic: "/workoutHistoryLogo.png",
      },
    ],
  },
  {
    title: "Tools",
    cards: [
      {
        title: "Calendar",
        description: "Coming soon!",
        href: "/calendar",
        pic: "/cal.webp",
      },
      {
        title: "Analytics",
        description: "Coming soon!",
        href: "/analytics",
        pic: "/velocityImg.webp",
      },
      {
        title: "Journal",
        description: "Coming Soon!",
        href: "/journal",
        pic: "/journal.webp",
      },
    ],
  },
];

export default async function Home() {
  const userProfile = await api.user.getUserProfile.query();

  if (userProfile.success == false) {
    redirect(userProfile.redirect);
  }

  const fname = userProfile.data?.firstname ?? "";


  return (
    <ContentLayout title="Dashboard">
      <div className="flex flex-col gap-8 p-4 md:p-8">
        <section id="header">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold md:text-4xl">
              Welcome back, {fname}!
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
                  <Card
                    key={i}
                    className="flex flex-col justify-center items-center min-h-60"
                  >
                    <CardHeader>
                      <CardTitle>{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                      <Image
                        src={card.pic}
                        alt={card.title}
                        width={200}
                        height={200}
                        className="object-cover rounded-full"
                      />
                    </CardContent>
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
