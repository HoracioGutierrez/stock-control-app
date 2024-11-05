"use client"
import { useDialogStore } from "@/stores/generalDialog";
import { IconClockQuestion, IconSettingsQuestion, IconUserQuestion, IconShoppingCartQuestion, IconRestore, IconCurrencyDollarOff, IconPackages, IconTruck, IconAdjustmentsUp } from "@tabler/icons-react";
import { useHelpContext } from "./HelpContext";

function CardList({ cardsData }: any) {

  const { setOpen } = useDialogStore((state: any) => state)
  const { setCardId, isLoading} = useHelpContext()

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

  const handleClick = (type: string) => {
    setOpen(type, type)
    setCardId(type)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {cardsData.map((item: any) => (
        <div key={item.id} className="col-span-1 bg-primary-foreground dark:bg-card dark:bg-gradient-to-br from-transparent to-black shadow-md hover:shadow-lg pr-6 pl-6 rounded-lg max-w-sm transition-transform hover:scale-[1.01] active:scale-[0.98] duration-10 cursor-pointer" onClick={() => handleClick(item.id)}>
          <div className="gap-2 pb-2 w-full" >
            <div className="flex flex-col grow">
              <div className="pt-6 pb-8">
                <div className="flex justify-center items-center bg-accent dark:bg-primary-foreground rounded-full size-16">
                  {config[item.icon]}
                </div>
              </div>
              <h3 className="pb-2 font-medium text-lg tracking-tight">{item.title}</h3>
              <p className="pb-4 text-muted-foreground tracking-tight">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardList