/**
 * v0 by Vercel.
 * @see https://v0.dev/t/deHWrTUhQkd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <main key="1" className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('/hero-image.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 z-[-1]" />
        <div className="absolute inset-0 bg-[url('/dna-strands.svg')] bg-repeat opacity-20 z-[-1]" />
        <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-black">
              Unlock Your Athletic Potential
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-400 md:text-xl">
              New Gen Performance is revolutionizing the way athletes train and
              compete. Our cutting-edge technology and personalized coaching
              help you reach new heights in your sport.
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
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-50">
                Elevate Your Game
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                New Gen Performance combines cutting-edge technology,
                personalized coaching, and a supportive community to help you
                reach your full athletic potential.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                Personalized Training
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Our AI-powered platform analyzes your unique strengths and
                weaknesses to create a customized training plan.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                Real-Time Feedback
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Receive instant feedback on your performance and progress,
                allowing you to optimize your training.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                Community Support
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Connect with a network of like-minded athletes and coaches to
                share insights, motivate each other, and celebrate your
                achievements.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                Cutting-Edge Technology
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Leverage the latest advancements in sports science and wearable
                technology to optimize your performance.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                Holistic Approach
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We address all aspects of your athletic development, including
                nutrition, recovery, and mental preparation.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                Proven Results
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Our clients have achieved remarkable improvements in their
                performance, setting new personal bests and winning
                championships.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
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
              We'll keep you updated on our launch and exclusive offers.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
