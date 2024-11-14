import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useHelpContext } from "./HelpContext"
import PopUpAccordionContent from "./PopUpAccordionContent"
import { IconPick } from "@tabler/icons-react"
import { Loader } from "lucide-react"


function PopUpAccordion() {
  const { accordionId, setAccordionId, accordionData, cardId, contentData, isLoading, headerCardsData } = useHelpContext()

  const handleAccordionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = accordionId === e.currentTarget.id ? null : e.currentTarget.id
    setAccordionId(id)
  }

  return (
    <>
      {accordionData.length > 0 && accordionData.map((item: any) => (
        <Accordion type="single" key={item.id} collapsible onClick={handleAccordionClick} id={item.id}>
          <AccordionItem className="flex flex-col gap-2 p-2" value={item.id}>
            <AccordionTrigger className="bg-accent dark:bg-primary-foreground shadow-md rounded-sm size-16">
              <h4 className="font-medium text-sm tracking-tight">{item.title}</h4>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 p-2">
              <PopUpAccordionContent />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))
      }
      {headerCardsData.length === 0 && !isLoading && <div className="flex gap-4 flex-col justify-center items-center min-h-[400px]">
        <div className="flex flex-col gap-4 text-center">
          <p className="text-center text-primary-500 font-bold text-2xl">
            Pagina en construcción.
          </p>
          <p className="text-center text-primary-500 font-bold text-2xl text-opacity-70">
            Estaremos actualizando la página en breve.
          </p>
        </div>
        <IconPick className="animate-bounce text-primary-500 w-12 h-12" />
      </div>
      }
      {headerCardsData.length === 0 && isLoading &&
        <div className="place-items-center grid grow h-[400px]">
          <Loader className="animate-spin" width={50} height={50} />
        </div>
      }
    </>
  )
}

export default PopUpAccordion


