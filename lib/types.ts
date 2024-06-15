import { ProductType } from "@/schema"
import { User } from "next-auth"
import { CustomerType } from "@/schema"

export type LoginInputValues = {
  username: string
  password: string
}

export type LoginContentProps = {
  children: React.ReactNode,
  className?: string
}

export type ProductInputValues = {
  name: string
  description?: string
  price: number
  barcode: string
  stock: number
  variants?: any[]
}

export type EditProductInputValues = {
  name: string
  description?: string
  price: number
  barcode: string
  stock: number
}

export type ProductVariantInputValues = {
  name: string
  price: number
  stock: number
  barcode: string
}

export type PageTitleProps = {
  title: string
  backButton?: boolean
}

export type NewProductFormProps = {
  userId: string
}

export type GeneralResponse = {
  data: User | null | any
  error: string | null
  message: string
}

export type ProductsTableProps = {
  data: ProductType[]
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
}

export type CustomerTableProps = {
  data: CustomerType[]
}

export type CashRegisterInputValues = {
  label: string
  currentAmount: number
  totalAmount: number
}