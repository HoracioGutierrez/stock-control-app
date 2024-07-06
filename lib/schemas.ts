import * as yup from "yup"

export const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
})

export const productSchema = yup.object().shape({
  name: yup.string().required("El nombre del producto es obligatorio"),
  description: yup.string(),
  //price: yup.number().required("El precio del producto es obligatorio").positive("El precio del producto debe ser mayor a cero"),
  price: yup.number().moreThan(0, "El precio del producto debe ser mayor a cero").required("El precio del producto es obligatorio"),
  barcode: yup.string().min(3, "El código de barras del producto debe tener al menos un caracter").nullable().transform((curr, orig) => (orig === "" ? null : curr)).matches(/^\S+$/, "El código de barras del producto no puede tener espacios"),
  stock: yup.number().required("El stock del producto es obligatorio").positive("El stock del producto debe ser mayor a cero"),
  variants: yup.array().of(
    yup.object().shape({
      name: yup.string().required("El nombre de la variante es obligatorio"),
      //price: yup.number().required("El precio de la variante es obligatorio").positive("El precio de la variante debe ser mayor a cero"),
      price: yup.number().moreThan(0, "El precio de la variante debe ser mayor a cero"),
      stock: yup.number().required("El stock de la variante es obligatorio").positive("El stock de la variante debe ser mayor a cero"),
      barcode: yup.string().min(3, "El código de barras del producto debe tener al menos un caracter").nullable().transform((curr, orig) => (orig === "" ? null : curr)).matches(/^\S+$/, "El código de barras del producto no puede tener espacios")
    })
  )
})

export const editProductSchema = yup.object().shape({
  name: yup.string().required("El nombre del producto es obligatorio"),
  description: yup.string(),
  //price: yup.number().required("El precio del producto es obligatorio").positive("El precio del producto debe ser mayor a cero"),
  price: yup.number().moreThan(0, "El precio del producto debe ser mayor a cero"),
  barcode: yup.string().min(3, "El código de barras del producto debe tener al menos un caracter").nullable().transform((curr, orig) => (orig === "" ? null : curr)).matches(/^\S+$/, "El código de barras del producto no puede tener espacios"),
  stock: yup.number().required("El stock del producto es obligatorio").positive("El stock del producto debe ser mayor a cero"),
})

export const customerSchema = yup.object().shape({
  name: yup.string().required("El nombre del cliente es obligatorio"),
  lastName: yup.string().required("El apellido del cliente es obligatorio")
})

export const cashRegisterSchema = yup.object().shape({
  label: yup.string().required("El idenfiticador de la caja es obligatorio"),
  /* currentAmount: yup.number().required("El monto actual del caja es obligatorio").moreThan(-1, "El monto actual del caja debe ser cero o  mayor a cero").typeError("El monto actual del caja debe ser un número"), */
  /* totalAmount: yup.number().required("El monto total del caja es obligatorio").moreThan(-1, "El monto total del caja debe ser cero o  mayor a cero").typeError("El monto total del caja debe ser un número"), */
})

export const providerSchema = yup.object().shape({
  name: yup.string().required("El nombre del proveedor es obligatorio"),
  lastName: yup.string(),
  companyName: yup.string(),
  address: yup.string(),
  phone: yup.string(),
  email: yup.string(),
  cuitCuil: yup.string(),
})

export const customerDebtSchema = yup.object().shape({
  payAll: yup.boolean(),
  manualAmount: yup.number().when("payAll", ([payAll], schema) => {
    return payAll ? schema : yup.number().moreThan(0, "El monto debe ser mayor a cero").required("El monto manual es obligatorio")
  })
})

export const accountSchema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  email: yup.string().required("El email es obligatorio"),
  username: yup.string().required("El nombre de usuario es obligatorio"),
})

export const userSchema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  email: yup.string().required("El email es obligatorio"),
  username: yup.string().matches(/^[a-zA-Z0-9]+$/, "El nombre de usuario solo puede contener letras y números").required("El nombre de usuario es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
  isAdmin: yup.boolean().required("Debes seleccionar si eres administrador")
})