import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend,
} from 'chart.js';
import { CHART_COLORS } from '../../../config/appData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  dataByMonth: {
    labels: string[];
    datasets: any[];
  };
}

export default function DurationChart({ dataByMonth }: Props) {

  const dataInHours = {
    ...dataByMonth,
    datasets: dataByMonth.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.map((value: number) => value / 60)
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'bottom' as const, 
        labels: { boxWidth: 12, font: { size: 11 } } 
      },
      title: {
        display: true,
        text: 'Tiempo de re-evolución (horas)',
        color: CHART_COLORS.title,
        font: { size: 18, weight: 'bold' as const },
        padding: { bottom: 20 }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw.toFixed(2)} h`;
          }
        }
      }
    },
    scales: {
      y: { 
        stacked: true, 
        grid: { color: CHART_COLORS.grid },
        title: { 
          display: true, 
          text: 'Horas'
        } 
      },
      x: { 
        stacked: true, 
        grid: { display: false } 
      },
    },
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-pink-100 shadow-lg p-6 lg:col-span-2 h-[300px] md:h-[450px]">
      <Bar data={dataInHours} options={options} />
    </div>
  );
}