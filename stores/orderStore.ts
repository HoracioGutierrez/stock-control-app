import { ProductType } from "@/schema"
import { create } from "zustand"

export const useOrderStore = create((set) => ({
  products: [],
  total: 0,
  hasProducts: false,
  scannedProduct: null,
  setProduct: (product: ProductType) => set({ scannedProduct: product }),
  setProducts: (products: any[]) => set({ products }),
  setTotal: (total: number) => set({ total }),
  setHasProducts: (hasProducts: boolean) => set({ hasProducts }),
  setScannedProduct: (scannedProduct: ProductType | null) => set((state: any) => {
    const productsCopy = [...state.products]
    const product = productsCopy.find((p: any) => p.barcode === scannedProduct?.barcode)
    if (product) {
      product.count = product.count + 1
    } else {
      scannedProduct.count = 1
      productsCopy.push(scannedProduct)
    }
    return { products: productsCopy, total: state.total + Number(scannedProduct?.price), hasProducts: true, scannedProduct }
  }),
  increment: (product: any, index: number) => set((state: any) => {
    const productsCopy = [...state.products]
    const productCopy = productsCopy[index]
    const newTotal = state.total + Number(productCopy.price)
    productsCopy[index] = productCopy
    productsCopy[index].count = productCopy.count + 1
    return { products: productsCopy, total: newTotal }
  }),
  decrement: (product: any, index: number) => set((state: any) => {
    const productsCopy = [...state.products]
    const productCopy = productsCopy[index]
    const newTotal = state.total - Number(productCopy.price)
    if (newTotal < 0) return { products: productsCopy, total: state.total }
    if (productCopy.count === 1) return { products: productsCopy, total: state.total }
    productsCopy[index] = productCopy
    productsCopy[index].count = productCopy.count - 1
    return { products: productsCopy, total: newTotal }
  }),
  remove: (product: any, index: number) => set((state: any) => {
    const productsCopy = [...state.products]
    const productCopy = productsCopy[index]
    const productTotal = productCopy.count * productCopy.price
    const newTotal = state.total - productTotal || 0
    productsCopy.splice(index, 1)
    return { products: productsCopy, total: newTotal }
  }),
  cancelOrder: () => set({ products: [], total: 0, hasProducts: false, scannedProduct: null })
}))