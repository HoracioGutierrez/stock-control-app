
import { create } from "zustand"

export const useOrderStore = create((set) => ({
  products: [],
  total: 0,
  setProducts: (products: any[]) => set({ products }),
  setTotal: (total: number) => set({ total }),
}))