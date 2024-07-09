import { IconClockQuestion, IconSettingsQuestion, IconUserQuestion, IconShoppingCartQuestion, IconRestore, IconCurrencyDollarOff, IconPackages, IconTruck, IconAdjustmentsUp, IconCircleNumber1, IconCircleNumber2, IconCircleNumber3, IconCircleNumber4 } from "@tabler/icons-react";
import firstStepsNewUser1 from "@/assets/images/firstStepsNewUser1.jpg"
import firstStepsNewUser2 from "@/assets/images/firstStepsNewUser2.jpg"
import firstStepsNewUser3 from "@/assets/images/firstStepsNewUser3.jpg"
import firstStepsNewUser4 from "@/assets/images/firstStepsNewUser4.png"
import cashAmount1 from "@/assets/images/cashAmount1.jpg"
import cashAmount2 from "@/assets/images/cashAmount2.jpg"
import cashAmount3 from "@/assets/images/cashAmount3.jpg"
import cashAmount4 from "@/assets/images/cashAmount4.png"
import { StaticImageData } from "next/image";


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

type PopUpData = {
  [key: string]: {
    content: {
      classNameVar?: string,
      icon?: JSX.Element | string,
      title1?: string,
      title2?: string | JSX.Element,
      text1?: string | null,
      text2?: string | null,
      src?: StaticImageData,
      alt?: string,
      width?: number,
      height?: number,
      warning?: string | null,
      warningText?: string | null
    }[],
  }
}

export const popUpData: PopUpData = {
  firstSteps: {
    content: [

      {
        classNameVar: "px-4 p-2 border-l border-t border-primary-foreground",
        icon: <IconSettingsQuestion className="size-10" />,
        title1: "Veamos cómo funciona.",
        text1: `En esta sección veremos cómo funcionan los aspectos básicos de la aplicación para poder comenzar a operar con ella de un modo más eficiente.`,
        title2: "Crear una cuenta.",
        text2: `En primer lugar, para comenzar a utilizar la aplicación correctamente. Es necesario que cada empleado, empleador o supervisor tenga su propia cuenta en la aplicación, esto permite tener un control total sobre sus datos y operaciones en todo momento y en todos los dispositivos.`
      },
      {
        classNameVar: "mx-4 border-r p-2 pl-8",
        icon: <IconCircleNumber1 className="size-10" />,
        text1: `Primero, presione la sección "Cuentas" en la barra lateral izquierda.`,
        src: firstStepsNewUser1,
        alt: "Paso 1",
        width: 750,
        height: 750
      },
      {
        classNameVar: "mx-4 border-l p-2 pl-8",
        icon: <IconCircleNumber2 className="size-10" />,
        text1: `Luego, haga clic en la sección "Usuarios" en la barra lateral izquierda.`,
        src: firstStepsNewUser2,
        alt: "Paso 2",
        width: 750,
        height: 750
      },
      {
        classNameVar: "mx-4 border-r p-2 pl-8",
        icon: <IconCircleNumber3 className="size-10" />,
        text1: `Una vez estes en la pagina "Usuarios", haga clic en el botón superior derecho "Nuevo Usuario" para crear un nuevo usuario.`,
        src: firstStepsNewUser3,
        alt: "Paso 3",
        width: 700,
        height: 700
      },
      {
        classNameVar: "mx-4 border-l border-b p-2 pl-8 text-start",
        icon: <IconCircleNumber4 className="size-10" />,
        text1: `Una vez llenaste los campos con los datos del usuario, haga clic en el botón "Guardar Usuario".`,
        src: firstStepsNewUser4,
        alt: "Paso 4",
        width: 500,
        height: 500,
        warning: "A tener en cuenta:",
        warningText: `Las cuentas creadas como administrador tendran el acceso a todas las funcionalidades de la aplicación. Por lo que es recomendable que se cree una cuenta como administrador solo para usuarios de confianza, en caso de necesitar un seguimiento seguro de un empleado, desmarque la casilla "Es administrador" y creará una cuenta con acceso restringido a la funcionalidad de seguimiento, cancelacion de compras, ingreso/retiro de dinero, etc.`
      },
      {
        classNameVar: "mx-4 border-l border-t p-2 pt-6 pl-8 text-start",
        title1: "Ingreso y retiro de dinero",
        text1: `Para ingresar y retirar dinero, se debe tener en cuenta que solo las cuentas a las que hemos concedido permisos de administrador podran hacerlo.`
      },
      {
        icon: <IconCircleNumber1 className="size-10" />,
        classNameVar: "mx-4 border-r p-2 pl-8",
        text1: `Primero, presione la sección "Tienda" en la barra lateral izquierda.`,
        src: cashAmount1,
        alt: "Paso 1",
        width: 750,
        height: 750
      },
      {
        classNameVar: "mx-4 border-l p-2 pl-8",
        icon: <IconCircleNumber2 className="size-10" />,
        text1: `Luego, haga clic en la sección "Balance" en la barra lateral izquierda.`,
        src: cashAmount2,
        alt: "Paso 2",
        width: 750,
        height: 750
      },
      {
        classNameVar: "mx-4 border-l p-2 pl-8",
        icon: <IconCircleNumber3 className="size-10" />,
        text1: `Una vez en la página "Balance", haga clic en el botón superior derecho "Ingreso/Retiro Manual".`,
        src: cashAmount3,
        alt: "Paso 3",
        width: 700,
        height: 700
      },
      {
        classNameVar: "mx-4 border-l p-2 pl-8",
        icon: <IconCircleNumber4 className="size-10" />,
        text1: `Ingresá el monto que desea ingresar o retirar. Si fuera necesario, en el segundo campo, puede ingresar el motivo del ingreso o retiro para mantener un registro mas claro.`,
        text2: `Una vez ingresado el monto y el motivo, escoja el tipo de operación que desea realizar (ingreso o retiro) y haga clic en el botón "Confirmar".`,
        src: cashAmount4,
        alt: "Paso 4",
        width: 500,
        height: 500,
        warning: "A tener en cuenta:",
        warningText: `Esta practica no es necesaria para el funcionamiento de la aplicación, pero si desea un registro mas claro de sus balances comerciales, es recomendable para un seguimiento mas riguroso de los ingresos y perdidas que pueda llegar a tener su empresa.`
      }
    ],
  },
}