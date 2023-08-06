import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

export interface Course {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

interface PlayerState {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean
}

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: true,
};

export const fetchCourse = createAsyncThunk("player/fetchCourse", async () => {
  const response = await api.get<Course>("/courses/1");

  return response.data;
})

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (state, action: PayloadAction<[number, number]>) => {
      const [moduleIndex, lessonIndex] = action.payload;

      state.currentModuleIndex = moduleIndex;
      state.currentLessonIndex = lessonIndex;
    },

    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1;
      const nextLesson = state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex;
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1;
        const nextModule = state.course?.modules[nextModuleIndex];

        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex;
          state.currentLessonIndex = 0;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourse.pending, (state) => {
      state.isLoading = true;
    }),
    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoading = false;
    })
  }
});

export const playerReducer = playerSlice.reducer;
export const { play, next } = playerSlice.actions;

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const currentModule = state.player.course?.modules[state.player.currentModuleIndex];
    const currentLesson = currentModule?.lessons[state.player.currentLessonIndex];

    return {currentModule, currentLesson};
  });
}
