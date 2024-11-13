import { IconClockQuestion, IconSettingsQuestion, IconUserQuestion, IconShoppingCartQuestion, IconRestore, IconCurrencyDollarOff, IconPackages, IconTruck, IconAdjustmentsUp } from "@tabler/icons-react"
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
function PopUpListHeader() {

  const { headerCardsData } = useHelpContext()

  /*   const prevAccordionId = accordionData[0]?.id */ // Quizas dependa de esto cuando se traiga todos los acordeones.
  return (
    <>
      {headerCardsData.length > 0 &&
        <div className="flex flex-col gap-2 p-2">
          <div className="">
            <div className="flex flex-col gap-4 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-transparent to-black p-4 rounded-lg w-full">
              <h2 className="text-xl">
                {headerCardsData ? headerCardsData[0]?.title : ""}
              </h2>
              <div className="flex justify-center items-center bg-accent dark:bg-primary-foreground shadow-md rounded-full size-16">
                {headerCardsData ? config[headerCardsData[0]?.icon] : <IconClockQuestion />}
              </div>
              <p className="text-muted-foreground tracking-tight">
                {headerCardsData ? headerCardsData[0]?.description : ""}
              </p>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default PopUpListHeader




