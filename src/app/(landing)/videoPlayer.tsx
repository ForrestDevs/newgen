import { Suspense } from "react";
import MuxPlayer from "@mux/mux-player-react";

export default function VideoPlayer() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MuxPlayer
        streamType="on-demand"
        playbackId="o6lmUecceQkJiqacrR0202PC100CNasGvV1gZ2uMnOyyng"
        metadataVideoTitle="Placeholder (optional)"
        metadataViewerUserId="Placeholder (optional)"
        primaryColor="#FFFFFF"
        secondaryColor="#000000"
      />
    </Suspense>
  );
}
