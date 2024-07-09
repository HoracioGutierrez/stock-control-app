import { create } from "zustand"

export const useCustomerDialogStore = create((set) => ({
  isOpen: false,
  type: "",
  customer: {},
  customers: [],
  setType: (type: string) => set({ type }),
  setCustomer: (customer: any) => set({ customer }),
  setCustomers: (customers: any[]) => set({ customers }),
  handleOpen: (isOpen: boolean, type: string, customer: any) => set({ isOpen, type, customer }),
  handleClose: () => set({ isOpen: false, customer: {}, customers: [] }),
}))
