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
  description: string
  price: number
  stock: number
}

export type PageTitleProps = {
  title: string
}