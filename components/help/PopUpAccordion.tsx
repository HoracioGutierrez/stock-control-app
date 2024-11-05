import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useHelpContext } from "./HelpContext"
import PopUpAccordionContent from "./PopUpAccordionContent"


function PopUpAccordion() {
  const { accordionId, setAccordionId, accordionData, contentData, isLoading } = useHelpContext()

  const handleAccordionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = accordionData[0]?.id
    if (id) { setAccordionId(id) } else { setAccordionId(null) }
  }

  return (
    <>
      {!isLoading && accordionData.length > 0 && <div className="w-full">
        <Accordion className="w-full" type="single" collapsible onClick={handleAccordionClick} /* defaultValue={accordionId} */ >
          <AccordionItem value={accordionId} >
            <AccordionTrigger>
              <div className="">
                <h2 className="text-xl">
                  {accordionData[0]?.title}
                </h2>
              </div>
            </AccordionTrigger>
            <AccordionContent >
              <div className="flex flex-col gap-4 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-transparent to-black p-4 rounded-lg w-full">
                <p className="text-muted-foreground tracking-tight">
                  {accordionData[0]?.description} {/* Cambiar de tabla en la base de datos */}
                </p>
                <PopUpAccordionContent />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </div>}
    </>
  )
}

export default PopUpAccordion


