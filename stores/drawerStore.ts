import { create } from "zustand"

export const useDrawerStore = create((set) => ({
  isOpen: false,
  setOpen: (isOpen: boolean) => set({ isOpen }),
}))