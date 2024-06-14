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
import {
  dashboardLinks,
  faq,
  theSience,
  whatsIncluded,
} from "@/config/rocketfuel";
import { RequestForm } from "./request-form";
import { env } from "@/lib/env.mjs";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Dynamic() {
  const { data, isLoading } = api.user.userHasCourse.useQuery({
    courseId: env.NEXT_PUBLIC_ROCKET_FUEL_COURSE_ID,
  });

  if (isLoading) {
    console.log("Loading...");
    return <Skeleton />;
  }

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
    <div className="container flex flex-col gap-y-16 w-full">
      <section id="hero" className="w-full">
        <div className="px-4 md:px-6 flex flex-col items-center justify-center space-y-10 text-center">
          <div className="space-y-8">
            <Image
              src="/rocketfuellogo.png"
              alt="Rocket Fuel Speed Kit"
              width={350}
              height={350}
              className="align-middle mx-auto"
            />
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-orange-500 to-red-700">
              Discover the secrets to lightning-fast speed and explosive power
            </h1>

            <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-400 md:text-xl">
              Rocket Fuel Speed Kit is grounded in scientific principals that
              Mateo Dixon personally uses to enhance speed and explosiveness.
            </p>
          </div>
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
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section id="science" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-8">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                The Science
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Tapping Into Your Speed Potential
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Maximize your speed potential by tapping into essential
                performance elements, from boosting top velocity and quick
                acceleration to optimizing muscle power and tendon efficiency,
                all designed to elevate your athletic performance.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            {theSience.map((item, i) => (
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="mx-auto max-w-4xl md:px-16 lg:px-20 ">
          <div className="flex flex-col items-center gap-5">
            <h2 className="font-bold text-[32px] leading-[40px] md:text-[40px] max-w-4xl md:leading-[48px] text-gray-900 dark:text-white text-center tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-muted-foreground text-base md:text-lg tracking-normal max-w-lg font-medium">
              Here are some of our most commonly asked questions. If you have
              any other queries, feel free to reach out to us directly.
            </p>
          </div>
          <div className="mt-10">
            <Accordion type="multiple">
              {faq.map((item, i) => (
                <AccordionItem value={`item-${i}`} key={i}>
                  <AccordionTrigger key={i} className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent key={i}>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
    // <div className="space-y-8">
    //   <section id="hero" className="flex flex-col items-center space-y-4">
    //     <div className="flex flex-col items-center text-center gap-8">
    //       <Image
    //         src={"/rocketfuellogo.png"}
    //         width={350}
    //         height={350}
    //         alt="Rocket Fuel Speed Kit"
    //         className="rounded-full"
    //       />

    //       <h2 className="text-lg text-gray-500 dark:text-gray-400 italic">
    //         ~ Rooted in science, strategic to maximize speed.
    //       </h2>
    //       <ProButton />
    //     </div>
    //   </section>

    //   <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-24">
    //     <div className="flex justify-center">
    //       <div className="flex flex-col items-center space-y-6">
    //         <div className="text-center mb-4">
    //           <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
    //             What&apos;s Included
    //           </h1>
    //           <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-xl">
    //             Unlock your full speed potential with our expert-designed
    //             program.
    //           </p>
    //         </div>
    //         <div className="flex flex-col justify-center gap-4">
    //           {whatsIncluded.map((item, i) => (
    //             <div key={i} className="flex items-center gap-2">
    //               <CircleCheckIcon className="min-w-10 min-h-10 text-amber-500 mr-2" />
    //               <div>
    //                 <h3 className="text-lg font-semibold">{item.title}</h3>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
            className="group relative block overflow-hidden rounded-lg bg-gradient-to-br p-6 hover:scale-[1.03] transition-all"
          >
            <div
              className={
                "absolute inset-0 bg-gradient-to-br from-red-600 to-orange-500 opacity-80 transition-opacity group-hover:opacity-100"
              }
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
          <RequestForm />
        </div>
      </section>
    </div>
  );
}
