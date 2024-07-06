"use client"
import { dataForHelp } from "./dataForHelp"
import { useDialogStore } from "@/stores/generalDialog"

function HelpList() {
  const handleClick = (type: string) => {
    useDialogStore.setState({ type })
    useDialogStore.setState({ isOpen: true })
  }


  return (
    <>
      <div className="gap-2 md:gap-4 grid grid-cols-1 md:grid-cols-3 col-span-2">
        {dataForHelp.map((item, index) => (
          <div key={index} className="col-span-1 bg-primary-foreground dark:bg-card dark:bg-gradient-to-br from-transparent to-black shadow-md hover:shadow-lg pr-6 pl-6 rounded-lg max-w-sm transition-transform hover:scale-[1.01] active:scale-[0.98] duration-10 cursor-pointer" >
            <div className="gap-2 pb-2 w-full" onClick={() => handleClick(item.type)}>
              <div className="flex flex-col grow">
                <div className="pt-6 pb-8">
                  <div className="flex justify-center items-center bg-accent dark:bg-primary-foreground rounded-full size-16">
                    {item.icon}
                  </div>
                </div>
                <h3 className="pb-2 font-medium text-lg tracking-tight">{item.title}</h3>
                <p className="pb-4 text-muted-foreground tracking-tight">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>)
}
export default HelpList
