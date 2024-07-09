import { create } from "zustand"

export const useDialogStore = create((set) => ({
  isOpen: false,
  type: "",
  id: undefined,
  setOpen : (type: string, id?: string) => set({ isOpen: true, type, id }),
  setClose: () => set({ isOpen: false, type: "" }),
}))