import { create } from "zustand"

export const useProductDialogStore = create((set) => ({
  isOpen: false,
  type: "",
  barcode: "",
  product: {},
  products: [],
  setType: (type: string) => set({ type }),
  open: (isOpen: boolean, type: string,barcode: string) => set({ isOpen, type, barcode }),
  setProduct: (product: any) => set({ product }),
  setProducts: (products: any[]) => set({ products }),
  close: () => set({ isOpen: false, type: "", product: {}, products: [] }),
}))