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
import { faq, whatsIncluded } from "@/config/rocketfuel";

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

            {/* <Link
              href="/login"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  className:
                    "bg-gradient-to-br from-cyan-400 via-violet-400 to-fuchsia-500",
                })
              )}
            >
              Get Access
            </Link> */}
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
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  The Science
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  The Science Behind Speed Development
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Unlock your full athletic potential with our comprehensive
                  speed development program. Grounded in the latest sports
                  science, our methods are designed to improve strength,
                  velocity, power, and elasticity for explosive performance.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Strength</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Develop the foundation of muscular strength to support
                  explosive movements.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Velocity</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Improve your ability to generate high-velocity force
                  production.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Power</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Develop the capacity to express high levels of muscular power.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Elasticity</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enhance the elastic properties of your muscles and tendons.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Coordination</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Improve your ability to coordinate complex movements.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Agility</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Develop the capacity to change direction and move quickly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-50">
                  Optimize Your Development
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                  New Gen Performance harnesses unique insights, application
                  tools, and cutting-edge software to propel you toward your
                  full athletic potential.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                  Multimedia content
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Our platform offers a diverse range of formats to enrich your
                  learning experience. Explore through videos, audio clips,
                  image-rich blog posts, master-student dialogues, personal
                  stories, external sources and relatable quotes.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                  Performance Planner
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Our calendar software helps you apply and monitor the progress
                  of your development. It&apos;s designed to mix smoothly with
                  the knowledge and practical tools we offer, enabling you to
                  align your vision and desires effectively.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                  My Intimate Journey
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Gain access to my personal journaling journey that began at 13
                  years old diving into the questions, self-reflections, and
                  discoveries I&apos;ve documented about my life and growth.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                  Revolutionary Approach
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Our platform enhances every aspect of your performance,
                  including nutrition, physical capabilities (like speed and
                  strength), recovery techniques, mental strategies, and
                  advantageous perspectives, all designed to help you thrive.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                  Customized Learning Paths
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Our platform creates personalized learning paths that adapt to
                  your pace and preferences. With our content, you can choose
                  how and when you engage with the information, ensuring it fits
                  seamlessly into your lifestyle.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                  Off-season Development Blueprint
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Use our detailed template, refined from nearly a decade of
                  proven off-season strategies. This resource is designed to
                  maximize your growth by incorporating lessons from years of
                  development.
                </p>
              </div>
            </div>
          </div>
        </section> */}

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
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-gray-900 dark:text-gray-50">
                Join the New Gen Performance Community
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                Be the first to experience our game-changing platform and join a
                network of elite athletes and coaches.
              </p>
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
