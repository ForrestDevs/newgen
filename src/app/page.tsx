/**
 * v0 by Vercel.
 * @see https://v0.dev/t/f8HOF8acrox
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <main className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[url('/hero-image.jpg')] bg-cover bg-center">
        <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Unlock Your Athletic Potential
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              New Gen Performance is revolutionizing the way athletes train and compete. Our cutting-edge technology and
              personalized coaching help you reach new heights in your sport.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
              <Button type="submit">Join Waitlist</Button>
            </form>
            <p className="text-xs text-gray-200">Be the first to experience our game-changing platform.</p>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-12">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Elevate Your Game</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                New Gen Performance combines cutting-edge technology, personalized coaching, and a supportive community
                to help you reach your full athletic potential.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Personalized Training</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our AI-powered platform analyzes your unique strengths and weaknesses to create a customized training
                plan.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Real-Time Feedback</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive instant feedback on your performance and progress, allowing you to optimize your training.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Community Support</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Connect with a network of like-minded athletes and coaches to share insights, motivate each other, and
                celebrate your achievements.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Cutting-Edge Technology</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Leverage the latest advancements in sports science and wearable technology to optimize your performance.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Holistic Approach</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We address all aspects of your athletic development, including nutrition, recovery, and mental
                preparation.
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-lg font-bold">Proven Results</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our clients have achieved remarkable improvements in their performance, setting new personal bests and
                winning championships.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Join the New Gen Performance Community
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Be the first to experience our game-changing platform and join a network of elite athletes and coaches.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
              <Button type="submit">Join Waitlist</Button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              We'll keep you updated on our launch and exclusive offers.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}