"use client"
import { useState } from 'react'
import Tour from 'reactour'


const steps = [
  {
    selector: '#login-form',
    content: (
      <div className="flex flex-col gap-4 text-primary-foreground">
        <p>Bienvenido a la aplicación de control de stock, aquí podrás gestionar tus productos, clientes, proveedores, cajas y más.</p>
        <p>Para iniciar sesión, por favor ingresa tu nombre de usuario y contraseña.</p>
      </div>
    ),
    
  }
]

function CustomTour() {

  const [open, setOpen] = useState(true)

  return (
    <Tour steps={steps} isOpen={open} onRequestClose={() => setOpen(false)} />
  )
}
export default CustomTour