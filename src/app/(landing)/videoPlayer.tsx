import Video from "next-video";
import { Suspense } from "react";
import videoSrc from 'https://fkz1n5phgelgasgu.public.blob.vercel-storage.com/Sequence%2001_1-BQx4a6b8Q9y8GlAG7RNnafpIr8PHz5.mp4'

export default function VideoPlayer() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Video
        controls
        autoPlay
        loop
        muted
        theme="purple"
        src={videoSrc}
      />
    </Suspense>
  );
}
