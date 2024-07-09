import { create } from "zustand"

export const useDrawerStore = create((set) => ({
  isOpen: false,
  collapsed: false,
  setOpen: (isOpen: boolean) => set({ isOpen }),
  setCollapsed: (collapsed: boolean) => set({ collapsed }),
}))