import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import ShineBorder from "@/components/ui/shine-button";
import {
  ActivityIcon,
  BoltIcon,
  BookIcon,
  CalendarIcon,
  CameraOffIcon,
  CircleCheckIcon,
  ClipboardIcon,
  DumbbellIcon,
  LightbulbIcon,
  RulerIcon,
  SettingsIcon,
  VideoIcon,
  WorkflowIcon,
  ZoomInIcon,
} from "lucide-react";
import { faq, theSience, whatsIncluded } from "@/config/rocketfuel";

export default function SpeedKitLanding() {
  return (
    <main className="flex flex-col min-h-[100vh]">
      <div className="container flex flex-col gap-y-24 w-full">
        <Image
          src="/rocketfuellogo.png"
          alt="Rocket Fuel Speed Kit"
          width={400}
          height={400}
          className="align-middle mx-auto"
        />

        <section id="hero" className="w-full">
          <div className="px-4 md:px-6 flex flex-col items-center justify-center space-y-10 text-center">
            <div className="space-y-8">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-orange-500 to-red-700">
                Discover the secrets to lightning-fast speed and explosive power
              </h1>

              <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-400 md:text-xl">
                Rocket Fuel Speed Kit is grounded in scientific principals that
                Mateo Dixon personally uses to enhance speed and explosiveness.
              </p>
            </div>
            <Link href="/login">
              <ShineBorder
                className="text-center text-2xl font-bold capitalize bg-gradient-to-br from-amber-300/80 via-orange-500/80 to-red-700/80"
                color={["#b91c1c", "#b91c1c", "#b91c1c"]}
              >
                Get Access
              </ShineBorder>
            </Link>
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
                <div key={i} className="grid gap-1">
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

        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
          <div className="grid items-center justify-center gap-8 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-gray-900 dark:text-gray-50">
                Are you ready to turbocharge your speed?
              </h2>
            </div>
            <div className="flex items-center justify-center">
              <Link href="/login">
                <ShineBorder
                  className="text-center text-2xl font-bold capitalize bg-gradient-to-br from-amber-300/80 via-orange-500/80 to-red-700/80"
                  color={["#b91c1c", "#b91c1c", "#b91c1c"]}
                >
                  Get Access
                </ShineBorder>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
