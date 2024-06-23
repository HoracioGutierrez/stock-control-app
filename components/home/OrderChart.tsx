"use client"
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

const dataset = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'GeeksforGeeks Line Chart',
      data: [65, 59, 80, 81, 56],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

type Props = {
  data: any
}

function OrderChart({ data }: Props) {

  console.log(data)
  const today = new Date()
  const fourDaysAgo = new Date(today.getTime() - (1000 * 60 * 60 * 24 * 3))
  const daysInWords = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

  const getDays = (startDate: Date, endDate: Date) => {
    const days = []
    let currentDate = startDate
    while (currentDate <= endDate) {
      days.push(daysInWords[currentDate.getDay()])
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return days
  }

  /* const newDataSet = {
    labels : getDays(fourDaysAgo, today),
    datasets : data.map((item: any) => {})
  }
 */
  return (
    <div style={{ width: '700px', height: '700px' }}>
      <h1>Example 1: Line Chart</h1>
      <Line data={dataset} />
    </div>
  )
}
export default OrderChart