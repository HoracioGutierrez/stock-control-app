
import UnderConstruction from "../UnderConstruction"
import { cn } from "@/lib/utils"
import Image, { StaticImageData } from "next/image"
import { useDialogStore } from "@/stores/generalDialog"
import PopUpItems from "./PopUpItems"



function PopUpList(props: any) {
  const { dataHeader } = props

  return (
    <>
      {dataHeader?.header?.length > 0 ?
        <div className={` flex flex-col gap-6 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-card to-black pb-6 to-80% rounded-lg pt-4 pl-6`}>
          <div className="flex flex-col">
            <span className="rounded-full bg-accent dark:bg-primary-foreground shadow-md w-16 h-16 flex justify-center items-center">
              {dataHeader.header[0].icon}
            </span>
          </div>
          <div className="flex flex-col gap-2 ">
            <h3 className="text-lg font-medium">
              {dataHeader.header[0].title1}
            </h3>
            <p className="text-muted-foreground">
              {dataHeader.header[0].text1}
            </p>
          </div>
          <PopUpItems {...props} />
        </div>
        :
        <UnderConstruction />
      }
    </>
  )

}
export default PopUpList

