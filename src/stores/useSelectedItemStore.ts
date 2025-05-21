import { create } from "zustand";

interface ItemState {
  epcString: string | null;
  setEpcString: (id: string) => void;
}

export const useSelectedItemStore = create<ItemState>((set) => ({
  epcString: null,
  setEpcString: (id) => set({ epcString: id }),
}));
