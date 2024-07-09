import { IconPick } from "@tabler/icons-react"
import Image from "next/image"
import UnderConstruction from "../UnderConstruction"


function PopUpList({ data, typeProp }: { data: any, typeProp: any }) {


  return (<>
    {data ? <div className={` flex flex-col gap-6 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-card to-black pb-6 to-80% rounded-lg`}>
      {data?.content?.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className={`flex flex-col ${item.classNameVar} gap-4 h-full border-primary-foreground`}>

            {item.icon ? <div className="rounded-full bg-accent dark:bg-primary-foreground shadow-md w-16 h-16 flex justify-center items-center">
              {item.icon ? <div className="flex justify-center items-center">{item.icon}</div> : null}
            </div> : null}
            {item.title1 || item.text1 || item.title2 || item.text2 ?
              <div className="flex flex-col">
                {item.title1 ? <h3 className="pb-2 text-xl tracking-tight font-medium">{item.title1}</h3> : null}
                {item.text1 ? <p className="pb-2 text-muted-foreground tracking-tight font-medium">{item.text1}</p> : null}
                {item.title2 ? <h4 className="pb-2 text-xl tracking-tight font-medium">{item.title2}</h4> : null}
                {item.text2 ? <p className="pb-2 text-muted-foreground tracking-tight font-medium">{item.text2}</p> : null}
              </div> : null
            }
            <div className="flex flex-col gap-2 items-center justify-center">
              {item.src && item.alt && item.width && item.height ?
                <div className="flex justify-center items-center pb-4">
                  <Image src={item.src} alt={item.alt} width={item.width} height={item.height} className="rounded-lg border-2" />
                </div> : null}
              {item.warning ? <div className="flex flex-col">
                <p className="font-medium text-red-600">{item.warning}</p>
                <p className="pb-4 text-muted-foreground tracking-tight">{item.warningText}</p>
              </div> : null}
            </div>
          </div>
        )
      }
      )
      }
    </div> : 
    <UnderConstruction />
    }
  </>
  )
}
export default PopUpList