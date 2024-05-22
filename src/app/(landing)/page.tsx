import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faq } from "@/config/faq";

export default function LandingPage() {
  return (
    <main className="flex flex-col min-h-[100vh]">
      <Header />
      <Body />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="w-full py-4 bg-white shadow-sm dark:bg-black">
      <div className="container flex items-center justify-between px-4 md:px-6">
        <p className="text-4xl">🧬</p>
      </div>
    </header>
  );
}

function Body() {
  return (
    <div className="container flex flex-col gap-y-24 w-full">
      <section id="hero" className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="px-4 md:px-6 flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Pathway to Excellence
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-400 md:text-xl">
              New Gen Performance is revolutionizing the game with untapped truths that
              drive human performance. We deliver unique knowledge, tools, and
              perspectives to create an all in one platform transforming
              performance across all domains.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input
                className="max-w-lg flex-1 bg-gray-200 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus:ring-purple-500 dark:focus:ring-offset-gray-800"
                placeholder="Enter your email"
                type="email"
              />
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-500 dark:focus:ring-offset-gray-800"
                type="submit"
              >
                Join Waitlist
              </Button>
            </form>
            <p className="text-xs text-gray-200">
              Be the first to experience our game-changing platform.
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-50">
                Optimize Your Development
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                New Gen Performance harnesses unique insights, application
                tools, and cutting-edge software to propel you toward your full
                athletic potential.
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
                of your development. It&apos;s designed to mix smoothly with the
                knowledge and practical tools we offer, enabling you to align
                your vision and desires effectively.
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
                your pace and preferences. With our content, you can choose how
                and when you engage with the information, ensuring it fits
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
                  <AccordionTrigger key={i}>{item.question}</AccordionTrigger>
                  <AccordionContent key={i}>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
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
          <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input
                className="max-w-lg flex-1 bg-gray-200 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus:ring-purple-500 dark:focus:ring-offset-gray-800"
                placeholder="Enter your email"
                type="email"
              />
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-500 dark:focus:ring-offset-gray-800"
                type="submit"
              >
                Join Waitlist
              </Button>
            </form>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              We&apos;ll keep you updated on our launch and exclusive offers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full py-4">
      <div className="container flex items-center justify-center px-4 md:px-6">
        New Gen Performance &copy; {new Date().getFullYear().toString()}. All
        rights
      </div>
    </footer>
  );
}
