import { IconClockQuestion, IconSettingsQuestion, IconUserQuestion, IconShoppingCartQuestion, IconRestore, IconCurrencyDollarOff, IconPackages, IconTruck, IconAdjustmentsUp } from "@tabler/icons-react";


export const dataForHelp = [
  {
    id: 1,
    icon: <IconSettingsQuestion />,
    title: "¿Cómo empezar?",
    description: "Si no entiendes cómo empezar, ingrese a esta sección.",
    type: "first-steps"
  },
  {
    id: 2,
    icon: <IconUserQuestion />,
    title: "¿Cómo gestiono mis clientes?",
    description: "Si no entiendes como funciona el panel de clientes, ingrese a esta sección.",
    type: "customer-management"
  },
  {
    id: 3,
    icon: <IconPackages />,
    title: "¿Cómo gestiono productos?",
    description: "Si no entiendes cómo gestionar productos, ingrese a esta sección.",
    type: "product-management"
  },
  {
    id: 4,
    icon: <IconTruck />,
    title: "¿Cómo gestiono pedidos?",
    description: "Si no entiendes cómo gestionar una orden de compra a un proveedor, ingrese a esta sección.",
    type: "order-management"

  },
  {
    id: 5,
    icon: <IconRestore />,
    title: "¿Cómo cancelo una compra?",
    description: "Si no entiendes cómo cancelar una compra, ingrese a esta sección.",
    type: "cancel-order"
  },
  {
    id: 6,
    icon: <IconCurrencyDollarOff />,
    title: "¿Cómo gestiono pagos?",
    description: "Si no entiendes cómo procesar el pago de una deuda, ingrese a esta sección.",
    type: "payment-management"
  },
  {
    id: 7,
    icon: <IconClockQuestion />,
    title: "¿Cómo funciona el historial de operaciones?",
    description: "Si no entiendes cómo funciona el historial de operaciones, ingrese a esta sección.",
    type: "history-management"
  },
  {
    id: 8,
    icon: <IconShoppingCartQuestion />,
    title: "¿Cómo funciona el panel de compras?",
    description: "Si no entiendes cómo funciona el panel de compras, ingrese a esta sección.",
    type: "cash-management"
  },
  {
    id: 9,
    icon: <IconAdjustmentsUp />,
    title: "¿Cómo subir los precios de los productos?",
    description: "Si no entiendes cómo subir los precios de los productos, ingrese a esta sección.",
    type: "price-management"
  }

]