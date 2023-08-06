import { describe, it, expect } from "vitest";
import { playerReducer, playerSlice } from "./player";

const exampleState = {
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        title: "Iniciando com React",
        lessons: [
          { id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
          {
            id: "w-DW4DhDfcw",
            title: "Estilização do Post",
            duration: "10:05",
          },
        ],
      },
      {
        id: 2,
        title: "Estrutura da aplicação",
        lessons: [
          {
            id: "gE48FQXRZ_o",
            title: "Componente: Comment",
            duration: "13:45",
          },
          { id: "Ng_Vk4tBl0g", title: "Responsividade", duration: "10:05" },
          {
            id: "h5JA3wfuW1k",
            title: "Interações no JSX",
            duration: "06:33",
          },
        ],
      },
    ],
  },
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: false,
};

describe("player slice", () => {
  it("should be able to play", () => {
    const state = playerReducer(exampleState, playerSlice.actions.play([1, 2]));

    expect(state.currentModuleIndex).toBe(1);
    expect(state.currentLessonIndex).toBe(2);
  });

  it("should be able to play next video automatically", () => {
    const state = playerReducer(exampleState, playerSlice.actions.next());

    expect(state.currentModuleIndex).toBe(0);
    expect(state.currentLessonIndex).toBe(1);
  });

  it("should be able to jump to the next module automatically", () => {
    const state = playerReducer({...exampleState, currentLessonIndex: 1}, playerSlice.actions.next());

    expect(state.currentModuleIndex).toBe(1);
    expect(state.currentLessonIndex).toBe(0);
  });

  it("should be able to stay in last lesson", () => {
    const state = playerReducer({...exampleState, currentLessonIndex: 2, currentModuleIndex: 1}, playerSlice.actions.next());

    expect(state.currentModuleIndex).toBe(1);
    expect(state.currentLessonIndex).toBe(2);
  });
});
