import { beforeEach, describe, expect, it } from "vitest";
import { useStore } from ".";

const course = {
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
};

const initialState = useStore.getState();

describe("zustand store", () => {
  beforeEach(() => {
    useStore.setState(initialState);
  });

  it("should be able to play", () => {
    const { play } = useStore.getState();

    play([1, 2]);

    const { currentModuleIndex, currentLessonIndex } = useStore.getState();

    expect(currentModuleIndex).toBe(1);
    expect(currentLessonIndex).toBe(2);
  });

  it("should be able to play next video automatically", () => {
    useStore.setState({ course });

    const { next } = useStore.getState();

    next();

    const { currentModuleIndex, currentLessonIndex } = useStore.getState();

    expect(currentModuleIndex).toBe(0);
    expect(currentLessonIndex).toBe(1);
  });

  it("should be able to jump to the next module automatically", () => {
    useStore.setState({ course });

    const { next } = useStore.getState();

    useStore.setState({ currentLessonIndex: 1 });

    next();

    const { currentModuleIndex, currentLessonIndex } = useStore.getState();

    expect(currentModuleIndex).toBe(1);
    expect(currentLessonIndex).toBe(0);
  });

  it("should be able to stay in last lesson", () => {
    useStore.setState({ course });

    const { next } = useStore.getState();

    useStore.setState({ currentLessonIndex: 2, currentModuleIndex: 1 });

    next();

    const { currentModuleIndex, currentLessonIndex } = useStore.getState();
    expect(currentModuleIndex).toBe(1);
    expect(currentLessonIndex).toBe(2);
  });
});
