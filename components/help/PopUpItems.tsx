import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import Image from "next/image"


function PopUpItems(props: any) {
  const { dataAccordion, openedItem } = props


  return (
    <Accordion type="single" collapsible className="w-full" defaultValue={openedItem}>
      <AccordionItem value={"firstAccordion"} className="w-full px-2 py-1 rounded-sm" >
        <AccordionTrigger className={cn("w-full pl-2", openedItem === "firstAccordion" && "bg-primary-foreground dark:bg-card px-2")}>
          {dataAccordion.firstAccordion[0].titlePopUp}
        </AccordionTrigger>
        {dataAccordion.firstAccordion?.map((item: any) => {
          return (
            <AccordionContent className="w-full" key={item.uniqueId}>
              <div className="flex flex-col gap-4 pl-4">
                {item.icon && <div className="flex items-center gap-2 pt-5">
                  <span className="rounded-full bg-accent dark:bg-primary-foreground shadow-md w-16 h-16 flex justify-center items-center">
                    {item.icon}
                  </span>
                </div>}
                <div className="">
                  {item.title1}
                </div>
                {item.title2 && <div>
                  {item.title2}
                </div>}
                <div className="">
                  {item.text1}
                </div>
                {item.text2 && <div>
                  {item.text2}
                </div>}
                {item.src && <div className="flex flex-col justify-center items-center">
                  <Image className="border rounded-md " alt={cn(item.alt)} src={item.src} width={Number(cn(item.width))} height={Number(cn(item.height))} />
                </div>}
                {item.warning && <div className="flex flex-col border border-primary-foreground rounded-md p-4 mt-4">
                  <div>
                    <p className="text-sm text-red-600">{item.warning}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.warningText}
                  </div>
                </div>}
              </div>
            </AccordionContent>
          )
        })}
      </AccordionItem>

      <AccordionItem value={"secondAccordion"} className="w-full px-2 py-1 rounded-sm" >
        <AccordionTrigger className={cn("w-full pl-2", openedItem === "secondAccordion" && "bg-primary-foreground dark:bg-card px-2")}>
          {dataAccordion.secondAccordion[0].titlePopUp}
        </AccordionTrigger>
        {dataAccordion.secondAccordion?.map((item: any) => {
          return (
            <AccordionContent className="w-full" key={item.uniqueId}>
              <div >
                <div className="flex flex-col gap-4 pl-4">
                  {item.icon && <div className="flex items-center gap-2 pt-5">
                    <span className="rounded-full bg-accent dark:bg-primary-foreground shadow-md w-16 h-16 flex justify-center items-center">
                      {item.icon}
                    </span>
                  </div>}
                  <div className="">
                    {item.title1}
                  </div>
                  {item.title2 && <div>
                    {item.title2}
                  </div>}
                  <div className="">
                    {item.text1}
                  </div>
                  {item.text2 && <div>
                    {item.text2}
                  </div>}
                  {item.src && <div className="flex flex-col justify-center items-center">
                    <Image className="border rounded-md " alt={cn(item.alt)} src={item.src} width={Number(cn(item.width))} height={Number(cn(item.height))} />
                  </div>}
                  {item.warning && <div className="flex flex-col border border-primary-foreground rounded-md p-4 mt-4">
                    <div>
                      <p className="text-sm text-red-600">{item.warning}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.warningText}
                    </div>
                  </div>}
                </div>
              </div>
            </AccordionContent>
          )
        })}
      </AccordionItem>
    </Accordion>
  )
}
export default PopUpItems