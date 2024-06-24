"use client"
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});


type Props = {
  data: any
}

function OrderChart({ data }: Props) {

  console.log(data)

  const daysInWords = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

  const getDays = (data: any) => {
    const days: string[] = []
    data.forEach((item: any) => {
      const day = new Date(item.date)
      days.push(daysInWords[day.getDay()])
    })
    return days
  }

  const newDataSet = {
    labels: getDays(data),
    datasets: [
      {
        label: "Total",
        data: data.map((item: any) => item.total),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      }
    ]
  }

  return (
    <div>
      <h1>Ventas : últimos 7 días</h1>
      <Line data={newDataSet} />
    </div>
  )
}
export default OrderChart