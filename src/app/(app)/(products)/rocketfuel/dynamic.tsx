"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/trpc/react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BoltIcon,
  CircleCheckIcon,
  ClipboardIcon,
  VideoIcon,
} from "lucide-react";
import ProButton from "@/app/(app)/(products)/rocketfuel/purchase-button";
import { dashboardLinks, whatsIncluded } from "@/config/rocketfuel";
import { cn } from "@/lib/utils";

export function Dynamic() {
  const { data, isLoading } = api.user.userHasCourse.useQuery({
    courseId: "kdisyxqg19iam3rd25s6m",
  });

  if (isLoading) {
    console.log("Loading...");
    return <Skeleton />;
  }

  //   return <Purchase />;

  if (!data?.hasCourse) {
    console.log("User does not have course access");
    return <Purchase />;
  }

  if (data.hasCourse) {
    console.log("User has course access");
    return <Dashboard />;
  }
}

function Purchase() {
  return (
    <div className="space-y-8">
      <section id="hero" className="flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center text-center gap-8">
          <Image
            src={"/rocketfuellogo.png"}
            width={350}
            height={350}
            alt="Rocket Fuel Speed Kit"
            className="rounded-full"
          />

          <h2 className="text-lg text-gray-500 dark:text-gray-400 italic">
            ~ Rooted in science, strategic to maximize speed.
          </h2>
          <ProButton />
        </div>
      </section>

      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-24">
        <div className="flex justify-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What&apos;s Included
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-xl">
                Unlock your full speed potential with our expert-designed
                program.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4">
              {whatsIncluded.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CircleCheckIcon className="min-w-10 min-h-10 text-amber-500 mr-2" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.point}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex flex-col space-y-8">
      <section id="hero" className="flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center text-center">
          <Image
            src={"/rocketfuellogo.png"}
            width={350}
            height={350}
            alt="Rocket Fuel Speed Kit"
            className="rounded-full"
          />
          {/* <h2 className="mt-4 text-lg text-gray-500 dark:text-gray-400 italic">
            ~ Rooted in science, strategic to maximize speed.
          </h2> */}
        </div>
      </section>

      <section id="Welcome">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
            Welcome Aboard!
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Choose from a range of specialized folders to supercharge your speed
            journey. Each folder has a unique purpose, guiding you on how to get
            lightning fast.
          </p>
        </div>
      </section>

      <section id="Links" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {dashboardLinks.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className="group relative block overflow-hidden rounded-lg bg-gradient-to-br  p-6 hover:scale-[1.03] transition-all"
          >
            <div
              className={cn(
                link.color,
                "absolute inset-0 bg-gradient-to-br opacity-80 transition-opacity group-hover:opacity-100"
              )}
            />
            <div className="relative space-y-2">
              <h3 className="text-2xl font-bold text-white">{link.title}</h3>
              <p className="text-white/80">{link.description}</p>
            </div>
          </Link>
        ))}
      </section>

      <section id="Request">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
            Request a 1-on-1 Custom Plan
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Work directly with me over Zoom to design a custom speed program
            tailored to your needs. Get a detailed, personalized 3-month plan
            that addresses your goals and unique requirements.
          </p>
          <div className="flex justify-start">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* <section
          id="links"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {links.map((link, i) => (
            <Link href={link.href}>
              <Card
                key={i}
                className="shadow-sm h-full rounded-lg transition-transform hover:scale-105 hover:underline"
              >
                <CardHeader className="flex justify-center">
                  <CardTitle className="">{link.title}</CardTitle>
                </CardHeader>
                <CardContent>{link.description}</CardContent>
              </Card>
            </Link>
          ))}
        </section> */}

      {/* <section id="pillars" className="space-y-4">
          <h2 className="text-2xl font-bold leading-tight text-gray-900">
            The 3 Pillars of Speed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {pillars.map((pillar, i) => (
              <div>
                <h3 className="text-lg font-semibold">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section> */}

      {/* <section id="key-points" className="space-y-4">
          <h2 className="text-2xl font-bold leading-tight text-gray-900">
            Key Points
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {keyPoints.map((point, i) => (
              <li>
                <h3 className="text-lg font-semibold">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </li>
            ))}
          </ul>
        </section> */}
    </div>
  );
}
