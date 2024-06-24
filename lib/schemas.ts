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

export const editProductSchema = yup.object().shape({
  name: yup.string().required("El nombre del producto es obligatorio"),
  description: yup.string(),
  price: yup.number().required("El precio del producto es obligatorio").positive("El precio del producto debe ser mayor a cero"),
  barcode: yup.string().required("El código de barras del producto es obligatorio").min(1, "El código de barras del producto debe tener al menos un caracter"),
  stock: yup.number().required("El stock del producto es obligatorio").positive("El stock del producto debe ser mayor a cero"),
})

export const customerSchema = yup.object().shape({
  name: yup.string().required("El nombre del cliente es obligatorio"),
  lastName: yup.string().required("El apellido del cliente es obligatorio")
})

export const cashRegisterSchema = yup.object().shape({
  label: yup.string().required("El idenfiticador de la caja es obligatorio"),
  currentAmount: yup.number().required("El monto actual del caja es obligatorio").moreThan(-1, "El monto actual del caja debe ser cero o  mayor a cero").typeError("El monto actual del caja debe ser un número"),
  totalAmount: yup.number().required("El monto total del caja es obligatorio").moreThan(-1, "El monto total del caja debe ser cero o  mayor a cero").typeError("El monto total del caja debe ser un número"),
})

export const providerSchema = yup.object().shape({
  name: yup.string().required("El nombre del proveedor es obligatorio"),
  lastName: yup.string().required("El apellido del proveedor es obligatorio"),
  companyName: yup.string().required("El nombre de la compañía es obligatorio"),
  address: yup.string().required("La dirección es obligatoria"),
  phone: yup.string().required("El número de teléfono es obligatorio"),
  email: yup.string().required("El correo electrónico es obligatorio"),
  cuitCuil: yup.string().required("El CUIT/CUIL es obligatorio"),
})

export const customerDebtSchema = yup.object().shape({
  payAll: yup.boolean(),
  manualAmount: yup.number().when("payAll",([payAll],schema)=>{
    console.log(payAll)
    return payAll ? schema : yup.number().moreThan(0,"El monto debe ser mayor a cero").required("El monto manual es obligatorio")
  })
})