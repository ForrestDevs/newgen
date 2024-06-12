import { Button } from "@/components/ui/button";
import BackButton from "@/components/back-button";
import {
  BoltIcon,
  ClipboardIcon,
  RulerIcon,
  TimerIcon,
  VideoIcon,
} from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { trackingMethods, whenToTrack } from "@/config/rocketfuel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TrackingProgress() {
  return (
    <ContentLayout title="Tracking">
      <BackButton />
      {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container grid items-center justify-center gap-8 px-4 text-center md:px-6 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Track Your Fitness Progress
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Measure your improvements over the summer with these simple
              fitness tests. If you show progress, you'll earn a printable badge
              to celebrate your hard work!
            </p>
          </div>

          <div className="grid gap-6 w-full max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-950">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Video Technique</h3>
                  <VideoIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Capture a video of your exercise technique to review and
                  improve form.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-950">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Broad Jump</h3>
                  <RulerIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Measure the distance of your broad jump, averaging 5 attempts.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-950">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Vertical Jump</h3>
                  <RulerIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Mark your vertical jump height on a wall to track progress.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-950">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Sprint Time</h3>
                  <TimerIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  Record your 30-40m sprint time, averaging 3 attempts.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-950 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Improvement Reward</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                If you show improvement in any of these fitness tests at the end
                of the summer, you'll earn a printable badge to congratulate
                your progress!
              </p>
              <Button className="w-full">Get Your Printable Badge</Button>
            </div>
          </div>
        </div>
      </section> */}

      <div className="space-y-24 pt-10">
        <section id="tracking">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4">Tracking Methods</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Choose from various tracking methods to monitor your fitness
              progress.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {trackingMethods.map(({ title, description, icon: Icon }, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>
                      <div className="flex flex-row items-center gap-2">
                        <Icon />
                        <span>{title}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>{description}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="whenTo">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-4">When to track:</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Track your fitness progress at three different stages: baseline,
              after phase 1, and after phase 2.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {whenToTrack.map(({ title, description }, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>{description}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <div className="flex flex-col justify-start rounded-md border-2 border-yellow-500 bg-yellow-100 p-4">
          <h3 className="text-xl font-semibold text-yellow-600 dark:text-yellow-300">
            Progress Reward 🎉
          </h3>

          <p className="text-lg text-gray-500 dark:text-gray-400 my-4">
            If you show improvement in speed after three months, share your
            results with us to receive a 10% discount on your next purchase.
          </p>
        </div>
      </div>
    </ContentLayout>
  );
}
