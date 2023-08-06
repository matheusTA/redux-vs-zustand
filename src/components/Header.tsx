import { useStore, useCurrentLesson } from "../zustand-store";

export function Header() {
  const isLoading = useStore(state => state.isLoading)
  const {currentModule, currentLesson} = useCurrentLesson();

  if(isLoading) {
    return <div className="h-6 bg-slate-700 animate-pulse w-48"></div>
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>

      <span className="text-sm text-zinc-400">{currentModule?.title}</span>
    </div>
  );
}
