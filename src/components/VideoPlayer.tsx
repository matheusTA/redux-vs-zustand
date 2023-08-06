import ReactPlayer from "react-player";
import { Loader } from "lucide-react";
import { useCurrentLesson, useStore } from "../zustand-store";

export function VideoPlayer() {
  const { currentLesson } = useCurrentLesson();
  const { isLoading, next } = useStore(state => ({ isLoading: state.isLoading, next: state.next }));

  function handlePlayNext() {
    next();
  }

  return (
    <div className="w-full bgzinc-950 aspect-video">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}}`}
          onEnded={handlePlayNext}
          controls
        />
      )}
    </div>
  );
}
