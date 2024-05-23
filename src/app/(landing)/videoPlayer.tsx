import { Suspense } from "react";
import MuxPlayer from "@mux/mux-player-react";

export default function VideoPlayer() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MuxPlayer
        streamType="on-demand"
        playbackId="vkU01NGPZ022HUBHokXDhXzQaErsQksLuC00ZEN003E9sYk"
        metadataVideoTitle="Placeholder (optional)"
        metadataViewerUserId="Placeholder (optional)"
        primaryColor="#FFFFFF"
        secondaryColor="#000000"
      />
    </Suspense>
  );
}
