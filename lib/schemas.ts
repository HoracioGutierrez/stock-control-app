import * as yup from "yup"

export const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
})

export const productSchema = yup.object().shape({
  name: yup.string().required("El nombre del producto es obligatorio"),
  description: yup.string(),
  price: yup.number().required("El precio del producto es obligatorio").positive("El precio del producto debe ser mayor a cero"),
  barcode: yup.string().required("El código de barras del producto es obligatorio").min(1, "El código de barras del producto debe tener al menos un caracter"),
  stock: yup.number().required("El stock del producto es obligatorio").positive("El stock del producto debe ser mayor a cero"),
  variants: yup.array().of(
    yup.object().shape({
      name: yup.string().required("El nombre de la variante es obligatorio"),
      price: yup.number().required("El precio de la variante es obligatorio").positive("El precio de la variante debe ser mayor a cero"),
      stock: yup.number().required("El stock de la variante es obligatorio").positive("El stock de la variante debe ser mayor a cero"),
      barcode: yup.string().required("El código de barras de la variante es obligatorio").min(1, "El código de barras de la variante debe tener al menos un caracter")
    })
  )
})

export const clientSchema = yup.object().shape({
  name: yup.string().required("El nombre del cliente es obligatorio"),
  lastName: yup.string().required("El apellido del cliente es obligatorio")
})