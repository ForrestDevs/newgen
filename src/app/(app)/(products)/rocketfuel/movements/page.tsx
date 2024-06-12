import Image from "next/image";
import { Suspense } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { speedCatalog } from "@/config/rocketfuel";
import BackButton from "@/components/back-button";
import { validateRequest } from "@/lib/auth/validate-request";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BoltIcon,
  ClipboardIcon,
  Loader,
  VideoIcon,
  XIcon,
} from "lucide-react";

export default async function Movements() {
  const { user } = await validateRequest();

  if (!user) {
    return null;
  }

  return (
    <ContentLayout title="Movement Catalog">
      <BackButton />
      <section id="Header">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Movement Catalog</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Welcome to the movement catalog! Here you can find a variety of
            exercises to help you get started with SpeedKit. Click on a video to
            watch it. If you have any questions, please reach out to us.
          </p>
        </div>
      </section>
      <section id="Catelog">
        {speedCatalog.map((category, i) => (
          <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </div>
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {category.videos.map((exercise, i) => (
                <Dialog key={i}>
                  <DialogTrigger asChild>
                    <div className="relative group hover:scale-110 transition-transform duration-300 cursor-pointer">
                      <Image
                        src={`https://image.mux.com/${exercise.playback_id}/thumbnail.png`}
                        alt="Video Thumbnail"
                        width={720}
                        height={480}
                        className="aspect-video object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md">
                        <h3 className="text-sm font-semibold line-clamp-1">
                          {exercise.title}
                        </h3>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{exercise.title}</DialogTitle>
                    </DialogHeader>
                    <MuxPlayer
                      streamType="on-demand"
                      playbackId={exercise.playback_id}
                      metadata={{
                        video_id: exercise.id,
                        video_title: exercise.title,
                        viewer_user_id: user.id,
                      }}
                      style={{ aspectRatio: 16 / 9 }}
                    />
                  </DialogContent>
                </Dialog>
                //  <Suspense fallback={<Loader />}>
                //* <Image
                // src={`https://image.mux.com/${exercise.playback_id}/thumbnail.png`}
                ///alt={exercise.title}
                //className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                //width={500}
                //height={500}

                ///* </Suspense>
                // <Card
                //   key={i}
                //   className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 "
                // >
                //   <CardContent>

                //   </CardContent>
                //   <CardFooter className="px-4 text-md font-semibold">
                //     {exercise.title}
                //   </CardFooter>
                // </Card>
              ))}
            </div>
          </div>
        ))}
      </section>
    </ContentLayout>
  );
}
