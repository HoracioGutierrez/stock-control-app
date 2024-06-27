import { CashRegisterType, HistoryType, ProductType, ProviderType } from "@/schema"
import { Session, User } from "next-auth"
import { CustomerType } from "@/schema"


export interface FormSchemaVariants {
  [key: string]: {
    name: string
    label: string
    inputType: string
  }
}

export type BarCodeScannerProps = {
  withTitle?: boolean,
  godMode?: boolean
}

export type CustomerTableProps = {
  data: CustomerType[]
  isAdmin?: boolean
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

export type DeleteButtonProps = {
  active: boolean
  id: string
}

export type DeleteProductConfirmationFormProps = {
  barcode: string
  type: string
  userId: string
}

export type DeleteByIdProps = {
  entityType: string | keyof Entity
  entityId: string
  userId?: string | undefined
}

export type DeleteCustomerProps = DeleteByIdProps & {
  type: string
  hasVariants?: boolean
}

export type DeleteProductButtonProps = {
  active: boolean
  barcode: string
}

export type EditCustomerInputValues = CustomerInputValues & {
  active?: boolean
  id?: string
  variants?: any[]
}

export type EditButtonProps = {
  barcode?: string
  id?: string
  entity: string
}

export type EditProductInputValues = {
  name: string
  description?: string
  price?: number
  barcode: string
  stock: number
}

export type EditProviderInputValues = {
  name: string
  lastName?: string
  companyName?: string
  address?: string
  phone?: string
  email?: string
  cuitCuil?: string
}

export type EditProductVariantsFormProps = {
  barcode: string
  userId: string
}

export type EditVariantButtonProps = {
  barcode: string
}

export type Entity = {
  product: ProductType,
  customer: CustomerType,
  provider: ProviderType,
  history: HistoryType,
  cashRegister: CashRegisterType
}

export type EntityName = {
  product: string,
  customer: string,
  provider: string,
  history: string,
  cashRegister: string
}


export type FormEditProps = {
  entityType: string
  loading: boolean
  register: any
  errors: any
  isVariant?: boolean
  data: string
  formForName: FormSchemaVariants
  formForDetails: FormSchemaVariants
  formForVariant: FormSchemaVariants
  entityConfig: any
  entityResolved?: string
  handleMainNameChange?: any
  handleAddVariant?: any
  fields: any
  hasVariants: boolean
  hasDetails: boolean
  userId: string
}

export type FormValues =
  EditCustomerInputValues |
  EditProductInputValues |
  EditProviderInputValues


export type GeneralResponse = {
  data: User | null | any
  error: string | null
  message: string
}

export type ProviderInputValues = {
  name: string
  lastName?: string
  companyName?: string
  address?: string
  phone?: string
  email?: string
  cuitCuil?: string
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
  onRemove?: any
  canRemove?: boolean
  handleUnlinkVariant?: any
  isUnlinking?: boolean
  id?: string
}

export type ProductVariantInputValues = {
  name: string
  price: number
  stock: number
  barcode: string
}

export type ReactivateByIdProps = {
  entityType: string
  barcode?: string
  entityId?: string
  userId: string
}

export type NewProductFormProps = {
  userId: string
}

export type ModeToggleProps = {
  theme?: string | undefined
  setTheme: (theme: string) => void
  themeName?: string,
  collapsed?: boolean
  cn?: any
}

export type CustomLoaderProps = {
  title: string,
}

export type SideBarProps = {
  session: Session | null
}

export type DeleteUserProps = {
  userId: string
  type: string
}

export type CustomDataTableProps = {
  data: ProductType[] | HistoryType[] | CustomerType[] | ProviderType[] | null,
  type: "products" | "history" | "customers" | "providers" | "cash-registers" | "orders" | "users"
  filterColumn?: string
  filterKey?: string
  actions?: (rowData: any) => JSX.Element
  manualFetch?: boolean
  manualCallback?: any
  dateFilter?: boolean
}

export type SchemaFormValues =
  CustomerInputValues |
  ProductInputValues |
  ProviderInputValues |
  EditCustomerInputValues |
  EditProductInputValues |
  EditProviderInputValues 