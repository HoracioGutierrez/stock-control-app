import { create } from "zustand"

export const useNewProductStore = create((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}))