import { IconClockQuestion, IconSettingsQuestion, IconUserQuestion, IconShoppingCartQuestion, IconRestore, IconCurrencyDollarOff, IconPackages, IconTruck, IconAdjustmentsUp } from "@tabler/icons-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useHelpContext } from "./HelpContext"

const config: Record<string, JSX.Element> = {
  IconClockQuestion: <IconClockQuestion />,
  IconSettingsQuestion: <IconSettingsQuestion />,
  IconUserQuestion: <IconUserQuestion />,
  IconShoppingCartQuestion: <IconShoppingCartQuestion />,
  IconRestore: <IconRestore />,
  IconCurrencyDollarOff: <IconCurrencyDollarOff />,
  IconPackages: <IconPackages />,
  IconTruck: <IconTruck />,
  IconAdjustmentsUp: <IconAdjustmentsUp />,
}
function PopUpListHeader({ headerData, accordionData }: any) {

  const { accordionId, setAccordionId } = useHelpContext()

  console.log("accordionData", accordionData)

/*   const prevAccordionId = accordionData[0]?.id */ // Quizas dependa de esto cuando se traiga todos los acordeones.

  const handleAccordionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = accordionData[0]?.id
    if (id) setAccordionId(id)
      console.log(accordionId)
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="">
        <div className="flex flex-col gap-4 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-transparent to-black p-4 rounded-lg w-full">
          <h2 className="text-xl">
            {headerData[0]?.title}
          </h2>
          <div className="flex justify-center items-center bg-accent dark:bg-primary-foreground shadow-md rounded-full size-16">
            {config[headerData[0]?.icon]}
          </div>
          <p className="text-muted-foreground tracking-tight">
            {headerData[0]?.description}
          </p>

        </div>
        <Accordion className="w-full" type="single" collapsible /* defaultValue={accordionId} */ >
          <AccordionItem value={accordionId} >
            <AccordionTrigger>
              <div className="flex flex-col gap-4 bg-primary-foreground dark:bg-card dark:bg-gradient-to-t from-transparent to-black p-4 rounded-lg w-full" onClick={handleAccordionClick}>
                <h2 className="text-xl">
                  {accordionData[0]?.title}
                </h2>
              </div>
            </AccordionTrigger>
            <AccordionContent >
              <div className="flex flex-col gap-4 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-transparent to-black p-4 rounded-lg w-full">
                <p className="text-muted-foreground tracking-tight">
                  {accordionData[0]?.description}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default PopUpListHeader





/*    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-4 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-transparent to-black p-4 rounded-lg w-full">
          <h3 className="pb-2 font-medium text-lg tracking-tight">Veamos cómo funciona.</h3>
          <div className="flex justify-center items-center bg-accent dark:bg-primary-foreground shadow-md rounded-full size-16">
            <IconSettingsQuestion />
          </div>
          <p className="pb-4 text-muted-foreground tracking-tight">
            En esta sección veremos cómo funcionan los aspectos básicos de la aplicación para poder comenzar a operar con ella de un modo más eficiente.
          </p>
          <h4>Crear una cuenta.</h4>
          <p className="pb-4 text-muted-foreground tracking-tight">
            En primer lugar, para comenzar a utilizar la aplicación correctamente. Es necesario que cada empleado, empleador o supervisor tenga su propia cuenta en la aplicación, esto permite tener un control total sobre sus datos y operaciones en todo momento y en todos los dispositivos.
          </p>
  
          <div className="flex flex-col gap-1 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-transparent to-black pt-6 pr-6 pl-6 rounded-lg">
            <div className="flex justify-center items-center bg-accent dark:bg-primary-foreground shadow-md rounded-full size-16">
              <h4 className="font-medium text-sm tracking-tight">1 - 1</h4>
            </div>
            <p className="pb-4 text-muted-foreground tracking-tight">Primero presione la sección &quot;Cuentas&quot; en la barra lateral izquierda.</p> 
            <div className="flex justify-center items-center">
              <Image src={firstStepsNewUser1} alt="firstStepsNewUser1" width={750} height={750} className="rounded-lg" />
            </div>
  
            <div className="flex flex-col gap-4 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-transparent to-black pt-6 pr-6 pl-6 rounded-lg">
              <div className="flex justify-center items-center bg-accent dark:bg-primary-foreground shadow-md rounded-full size-16">
                <h4 className="font-medium text-sm tracking-tight">1 - 2</h4>
              </div>
              <div className="flex justify-center items-center">
                <Image src={firstStepsNewUser2} alt="firstStepsNewUser2" width={750} height={750} className="rounded-lg" />
              </div>
              <div className="flex flex-col gap-4 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-transparent to-black pt-6 pr-6 pl-6 rounded-lg">
                <div className="flex justify-center items-center bg-accent dark:bg-primary-foreground shadow-md rounded-full size-16">
                  <h4 className="font-medium text-sm tracking-tight">1 - 3</h4>
                </div>
                <div className="flex justify-center items-center">
                  <Image src={firstStepsNewUser3} alt="firstStepsNewUser3" width={750} height={750} className="rounded-lg" />
                </div>
                <div className="flex flex-col gap-4 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-transparent to-black pt-6 pr-6 pl-6 rounded-lg">
                  <div className="flex justify-center items-center bg-accent dark:bg-primary-foreground shadow-md rounded-full size-16">
                    <h4 className="font-medium text-sm tracking-tight">1 - 4</h4>
                  </div>
                  <p className="pb-4 text-muted-foreground tracking-tight">Una vez llenaste los campos con los datos del usuario, haga clic en el botón &quot;Guardar Usuario&quot;.</p>
                  <div className="flex justify-center items-center">
                    <Image src={firstStepsNewUser4} alt="firstStepsNewUser4" width={500} height={500} className="rounded-lg" />
                  </div>
                  <div className="">
                    <p className="font-medium text-red-600">A tener en cuenta:</p>
                    <p className="pb-4 text-muted-foreground tracking-tight">
                      Las cuentas creadas como administrador tendran el acceso a todas las funcionalidades de la aplicación. Por lo que es recomendable que se cree una cuenta como administrador solo para usuarios de confianza, en caso de necesitar un seguimiento seguro de un empleado, desmarque la casilla &quot;Es administrador&quot; y creará una cuenta con acceso restringido a la funcionalidad de seguimiento, cancelacion de compras, ingreso/retiro de dinero, etc.
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
  
  
          </div>
  
        </div>
      </div> 
     </div> */