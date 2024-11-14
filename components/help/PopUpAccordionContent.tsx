import { useHelpContext } from "./HelpContext"
import Image, { StaticImageData } from "next/image"
import firstStepsNewUser1 from "@/assets/images/firstStepsNewUser1.jpg"
import firstStepsNewUser2 from "@/assets/images/firstStepsNewUser2.jpg"
import firstStepsNewUser3 from "@/assets/images/firstStepsNewUser3.jpg"
import firstStepsNewUser4 from "@/assets/images/firstStepsNewUser4.png"

const record: Record<string, StaticImageData> = {
  "firstStepsNewUser1": firstStepsNewUser1,
  "firstStepsNewUser2": firstStepsNewUser2,
  "firstStepsNewUser3": firstStepsNewUser3,
  "firstStepsNewUser4": firstStepsNewUser4
}

function PopUpAccordionContent() {
  const { contentData, isLoading } = useHelpContext()

  return (
    <>
      {!isLoading && contentData.length > 0 && contentData.map((item: any) => {
        return (
          <div key={item.id} className="flex flex-col gap-1 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-transparent to-black pt-6 pr-6 pl-6 rounded-lg">
            <div className="flex justify-center items-center bg-accent dark:bg-primary-foreground shadow-md rounded-full size-16">
              <h4 className="font-medium text-sm tracking-tight">{item.icon}</h4>
            </div>
            <p className="pb-4 text-muted-foreground tracking-tight">{item.description}</p>
            <div className="flex justify-center items-center">
              <Image src={record[item.image]} alt={item.image} width={500} height={500} className="rounded-lg" />
            </div>
            <div>
              <p className="font-medium text-red-600">{item.warning}</p>
              <p className="pb-4 text-muted-foreground tracking-tight">{item.warningDescription}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default PopUpAccordionContent