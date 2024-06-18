import { ProductType } from "@/schema"
import { User } from "next-auth"
import { CustomerType } from "@/schema"

export type BarCodeScannerProps = {
  withTitle?: boolean,
  godMode?: boolean
}

export type CustomerTableProps = {
  data: CustomerType[]
}

export type CustomerInputValues = {
  name: string
  lastName: string
  phone?: string
  email?: string
  address?: string
  legalName?: string
  cuitCuil?: string
  active?: boolean
  id?: string
}

export type CashRegisterInputValues = {
  label: string
  currentAmount: number
  totalAmount: number
}

export type DeleteCustomerButtonProps = {
  active: boolean
  id: string
}

export type DeleteProductConfirmationFormProps = {
  barcode: string
  type: string
  userId: string
}
export type DeleteCustomerProps = {
  id: string
  type?: string
}

export type DeleteProductButtonProps = {
  active: boolean
  barcode: string
}

export type EditCustomerInputValues = CustomerInputValues & {
  active?: boolean
  id?: string
}

export type EditProductButtonProps = {
  barcode?: string
  id?: string
}

export type EditProductInputValues = {
  name: string
  description?: string
  price: number
  barcode: string
  stock: number
}

export type EditProductVariantsFormProps = {
  barcode: string
  userId: string
}

export type EditVariantButtonProps = {
  barcode: string
}

export type FormValues = EditCustomerInputValues | EditProductInputValues

export type GeneralResponse = {
  data: User | null | any
  error: string | null
  message: string
}

export type ProviderInputValues = {
  name: string
  lastName: string
  companyName: string
  address: string
  phone: string
  email: string
  cuitCuil: string
}

export type InputValues = CustomerInputValues | ProductInputValues | ProviderInputValues

export type LoginContentProps = {
  children: React.ReactNode,
  className?: string
}

export type LoginInputValues = {
  username: string
  password: string
}

export type ProductInputValues = EditProductInputValues & {
  variants?: any[]
}

export type ProductsTableProps = {
  data: ProductType[]
}

export type PageTitleProps = {
  title: string
  backButton?: boolean
}

export type ProductVariantFormProps = {
  index: number
  register: any
  error?: any
  isLoading?: boolean
}

export type ProductVariantInputValues = {
  name: string
  price: number
  stock: number
  barcode: string
}

export type NewProductFormProps = {
  userId: string
}

