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
      <div className="flex flex-col justify-center items-center gap-2 p-4 bg-grey-dark dark:bg-light-foreground">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 col-span-2">
          {dataForHelp.map((item, index) => (
            <div key={index} className="pl-6 pr-6 bg-primary-foreground dark:bg-card transition-transform hover:scale-[1.01] shadow-md rounded-lg max-w-sm col-span-1 active:scale-[0.98] duration-10 hover:shadow-xl cursor-pointer dark:bg-gradient-to-br from-transparent to-black" >
              <div className="gap-2 w-full pb-2" onClick={() => handleClick(item.type)}>
                <div className="grow flex flex-col">
                  <div className="pb-8 pt-6">
                    <div className="flex size-16 bg-accent dark:bg-primary-foreground rounded-full items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-medium tracking-tight pb-2">{item.title}</h3>
                  <p className="text-muted-foreground pb-4 tracking-tight">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>)
}
export default HelpList