import { create } from "zustand";

interface ProjectStore {
  projectId: string | null;
  setProjectId: (id: string) => void;
}

export const useSelectedProjectStore = create<ProjectStore>((set) => ({
  projectId: null,
  setProjectId: (id) => set({ projectId: id }),
}));
