"use client"
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});


type Props = {
  data: any
}

function OrderChart({ data }: Props) {

  const daysInWords = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

  const getDays = (data: any) => {
    const days: string[] = []
    if(!data) return days
    data.forEach((item: any) => {
      const day = new Date(item.date.split("-").join("/"))
      days.push(daysInWords[day.getDay()])
    })
    return days
  }

  const newDataSet = {
    labels: getDays(data),
    datasets: [
      {
        label: "Total",
        data: data?.map((item: any) => item.total) ?? [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      }
    ]
  }

  return (
    <div className="w-full">
      <h1>Ventas : últimos 7 días</h1>
      <Line data={newDataSet} />
    </div>
  )
}
export default OrderChart