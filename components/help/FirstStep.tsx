import Image from "next/image"
import firstStepsNewUser1 from "@/assets/images/firstStepsNewUser1.jpg"
import firstStepsNewUser2 from "@/assets/images/firstStepsNewUser2.jpg"
import firstStepsNewUser3 from "@/assets/images/firstStepsNewUser3.jpg"
import firstStepsNewUser4 from "@/assets/images/firstStepsNewUser4.png"
import { IconSettingsQuestion } from "@tabler/icons-react"

function FirstSteps() {

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-4 w-full bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-transparent to-black rounded-lg p-4">
          <h3 className="text-lg font-medium tracking-tight pb-2">Veamos cómo funciona.</h3>
          <div className="flex size-16 bg-accent dark:bg-primary-foreground rounded-full items-center justify-center shadow-md ">
            <IconSettingsQuestion />
          </div>
          <p className="text-muted-foreground pb-4 tracking-tight">
            En esta sección veremos cómo funcionan los aspectos básicos de la aplicación para poder comenzar a operar con ella de un modo más eficiente.
          </p>
          <h4>Crear una cuenta.</h4>
          <p className="text-muted-foreground pb-4 tracking-tight">
            En primer lugar, para comenzar a utilizar la aplicación correctamente. Es necesario que cada empleado, empleador o supervisor tenga su propia cuenta en la aplicación, esto permite tener un control total sobre sus datos y operaciones en todo momento y en todos los dispositivos.
          </p>

          <div className="flex flex-col gap-1 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-transparent to-black rounded-lg pl-6 pr-6 pt-6">
            <div className="flex size-16 bg-accent dark:bg-primary-foreground rounded-full items-center justify-center shadow-md  ">
              <h4 className="text-sm font-medium tracking-tight">1 - 1</h4>
            </div>
            <p className="  text-muted-foreground pb-4 tracking-tight">Primero presione la sección "Cuentas" en la barra lateral izquierda.</p>
            <div className="flex justify-center items-center ">
              <Image src={firstStepsNewUser1} alt="firstStepsNewUser1" width={750} height={750} className="rounded-lg" />
            </div>

            <div className="flex flex-col gap-4 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-transparent to-black rounded-lg pl-6 pr-6 pt-6">
              <div className="flex size-16 bg-accent dark:bg-primary-foreground rounded-full items-center justify-center shadow-md">
                <h4 className="text-sm font-medium tracking-tight">1 - 2</h4>
              </div>
              <div className="flex justify-center items-center">
                <Image src={firstStepsNewUser2} alt="firstStepsNewUser2" width={750} height={750} className="rounded-lg" />
              </div>
              <div className="flex flex-col gap-4 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-transparent to-black rounded-lg pl-6 pr-6 pt-6">
                <div className="flex size-16 bg-accent dark:bg-primary-foreground rounded-full items-center justify-center shadow-md">
                  <h4 className="text-sm font-medium tracking-tight">1 - 3</h4>
                </div>
                <div className="flex justify-center items-center">
                  <Image src={firstStepsNewUser3} alt="firstStepsNewUser3" width={750} height={750} className="rounded-lg" />
                </div>
                <div className="flex flex-col gap-4 bg-primary-foreground dark:bg-card dark:bg-gradient-to-b from-transparent to-black rounded-lg pl-6 pr-6 pt-6">
                  <div className="flex size-16 bg-accent dark:bg-primary-foreground rounded-full items-center justify-center shadow-md">
                    <h4 className="text-sm font-medium tracking-tight">1 - 4</h4>
                  </div>
                  <p className="  text-muted-foreground pb-4 tracking-tight">Una vez llenaste los campos con los datos del usuario, haga clic en el botón "Guardar Usuario".</p>
                  <div className="flex justify-center items-center">
                    <Image src={firstStepsNewUser4} alt="firstStepsNewUser4" width={500} height={500} className="rounded-lg" />
                  </div>
                  <div className="">
                    <p className="text-red-600 font-medium">A tener en cuenta:</p>
                    <p className="text-muted-foreground pb-4 tracking-tight">
                      Las cuentas creadas como administrador tendran el acceso a todas las funcionalidades de la aplicación. Por lo que es recomendable que se cree una cuenta como administrador solo para usuarios de confianza, en caso de necesitar un seguimiento seguro de un empleado, desmarque la casilla "Es administrador" y creará una cuenta con acceso restringido a la funcionalidad de seguimiento, cancelacion de compras, ingreso/retiro de dinero, etc.
                    </p>
                  </div>
                </div>
              </div>
            </div>



          </div>

        </div>
      </div>
    </div>
  )
}
export default FirstSteps