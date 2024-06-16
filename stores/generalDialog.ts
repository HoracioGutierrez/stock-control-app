import { create } from "zustand"

export const useDialogStore = create((set) => ({
  isOpen: false,
  type: "",
  setOpen : (type: string) => set({ isOpen: true, type }),
  setClose: () => set({ isOpen: false, type: "" }),
}))