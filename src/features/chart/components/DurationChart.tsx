import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { CHART_COLORS } from '../../../config/appData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  dataByMonth: { labels: string[]; datasets: any[] };
}

export default function DurationChart({ dataByMonth }: Props) {
  const dataInHours = {
    ...dataByMonth,
    datasets: dataByMonth.datasets.map(ds => ({
      ...ds,
      data: ds.data.map((v: number) => v / 60)
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'bottom' as const, 
        labels: { boxWidth: 12, color: CHART_COLORS.title, font: { size: 11 } } 
      },
      title: {
        display: true,
        text: 'Tiempo de re-evolución',
        color: CHART_COLORS.title,
        font: { size: 18, weight: 'bold' },
        padding: { bottom: 20 }
      }
    },
    scales: {
      y: { 
        stacked: true, 
        grid: { color: CHART_COLORS.grid },
        ticks: { color: CHART_COLORS.title, font: { size: 11, weight: '600' } }
      },
      x: { 
        stacked: true, 
        grid: { display: false },
        ticks: { color: CHART_COLORS.title, font: { size: 11 } }
      }
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-pink-100 shadow-lg p-6 lg:col-span-2 h-[400px]">
      <Bar data={dataInHours} options={options} />
    </div>
  );
}