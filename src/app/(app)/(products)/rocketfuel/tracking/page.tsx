import BackButton from "@/components/back-button";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { trackingMethods, whenToTrack } from "@/config/rocketfuel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TrackingProgress() {
  return (
    <ContentLayout title="Tracking">
      <BackButton />
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col space-y-20">
          <section id="Intro" className="space-y-10">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Tracking Methods
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Choose from various tracking methods to monitor your fitness
              progress.
            </p>
          </section>

          <section id="tracking" className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          </section>

          <section id="whenTo" className="space-y10">
            <h2 className="text-3xl font-bold mb-4">When to track:</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Track your fitness progress at three different stages: baseline,
              after phase 1, and after phase 2.
            </p>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {whenToTrack.map(({ title, description }, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>{description}</CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="flex flex-col justify-start rounded-md border-2 border-yellow-500 bg-yellow-100 p-4">
            <h3 className="text-xl font-semibold text-yellow-600">
              Progress Reward 🎉
            </h3>

            <p className="text-lg text-gray-500 dark:text-black/60 my-4">
              If you show improvement in speed after three months, send us an
              email with your results to receive a 10% discount on your next
              purchase.
            </p>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
